import type {NextPage} from 'next';
import {useFfw, useInitFfw} from 'ffw';
import {Input} from 'baseui/input';
import {CryptotterButton} from 'cryptotter-react/dist/esm/dev.js';
import {createTransaction} from '../connections';
import {Select} from 'baseui/select';
import Float from '../utils/float';
import {useState} from 'react';
import Show from '../components/show';

const typeOptions = [
  {label: 'Popup', value: 'popup'},
  {label: 'Tab', value: 'tab'},
];

const Home: NextPage = () => {
  const [transaction, setTransaction] = useState(null);
  const ffw = useInitFfw({
    initValues: {
      count: '1',
      type: 'popup',
    },
  });
  useFfw({
    form: ffw,
  });
  globalThis.form = ffw;

  return (
    <div className={'grow flex justify-center items-center'}>
      <div className={'grow flex flex-col max-w-xs'}>
        <img
          className={'self-center'}
          width={100}
          src={
            'https://berezovski.by/wp-content/uploads/2018/07/Test-Logo-Circle-black-transparent.png'
          }
        />
        <Show show={transaction}>
          <div className={'mt-4 flex flex-col items-center'}>
            <div>Transaction is successful</div>
            <div className={'mt-8 grid grid-cols-2 gap-4'}>
              <div>Transaction id:</div>
              <div>{transaction?.id}</div>
              <div>Status:</div>
              <div>{transaction?.status}</div>
              <div>Crypto:</div>
              <div>{transaction?.crypto_currency.id}</div>
              <div>Amount:</div>
              <div>{transaction?.crypto_currency.amount}</div>
              <div>Sender:</div>
              <div>{transaction?.crypto_currency.wallets.sender}</div>
              <div>Fiat currency:</div>
              <div>{transaction?.traditional_currency.id}</div>
              <div>Fiat amount:</div>
              <div>{transaction?.traditional_currency.amount}</div>
            </div>
          </div>
        </Show>
        <Show show={!transaction}>
          <div className={'flex flex-col mt-4'}>
            <div className={'mt-8 self-center'}>Virtual product for test</div>
            <div className={'mt-8 grid grid-cols-2 gap-8'}>
              <div>Price:</div>
              <div>0.1$</div>
              <div>Count:</div>
              <Input {...ffw.f.count.getInput()} type={'number'} />
              <div>Total price:</div>
              <div>{Float.mul(ffw.f.count.value, 0.1)}$</div>
              <div>Type of payment page</div>
              <Select
                options={typeOptions}
                valueKey={'value'}
                value={[
                  typeOptions.find(({value}) => value === ffw.f.type.value),
                ]}
                clearable={false}
                onChange={(params) => {
                  ffw.f.type.set(params.option.value);
                }}
              />
            </div>
            <CryptotterButton
              className={'mt-8'}
              onSuccess={(data) => {
                setTransaction(data);
              }}
              type={ffw.f.type.value}
              payOrigin={process.env['NEXT_PUBLIC_PAY']}
              onClick={async () => {
                const transaction = await createTransaction({
                  amount: Float.mul(ffw.f.count.value, 0.1),
                  currency: 'USD',
                  name: 'test cryptotter',
                });
                return {
                  transaction,
                };
              }}
            >
              Buy with cryptotter
            </CryptotterButton>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Home;
