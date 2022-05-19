import type {NextPage} from 'next';
import {useFfw, useInitFfw} from 'ffw';
import {Input} from 'baseui/input';
import {CryptotterButton} from 'cryptotter-react/dist/esm/dev.js';
import {createTransaction} from '../connections';
import {Select} from 'baseui/select';

const typeOptions = [
  {label: 'Popup', value: 'popup'},
  {label: 'Tab', value: 'tab'},
];

const Home: NextPage = () => {
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
        <div className={'mt-8 self-center'}>Virtual product for test</div>
        <div className={'mt-8 grid grid-cols-2 gap-8'}>
          <div>Price:</div>
          <div>0.001$</div>
          <div>Count:</div>
          <Input {...ffw.f.count.getInput()} type={'number'} />
          <div>Total price:</div>
          <div>{ffw.f.count.value * 0.001}$</div>
          <div>Type of payment page</div>
          <Select
            options={typeOptions}
            valueKey={'value'}
            value={[typeOptions.find(({value}) => value === ffw.f.type.value)]}
            clearable={false}
            onChange={(params) => {
              ffw.f.type.set(params.option.value);
            }}
          />
        </div>
        <CryptotterButton
          className={'mt-8'}
          onSuccess={() => {}}
          type={ffw.f.type.value}
          payOrigin={process.env['NEXT_PUBLIC_PAY']}
          onClick={async () => {
            const transaction = await createTransaction({
              amount: 0.01 * ffw.f.count.value,
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
    </div>
  );
};

export default Home;
