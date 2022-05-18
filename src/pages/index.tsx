import type {NextPage} from 'next';
import {useFfw, useInitFfw} from 'ffw';
import {Input} from 'baseui/input';
import {CryptotterButton} from 'cryptotter-react';
import {createTransaction} from '../connections';

const Home: NextPage = () => {
  const ffw = useInitFfw({
    initValues: {
      count: '1',
    },
  });
  useFfw({
    form: ffw,
  });

  return (
    <div className={'grow flex justify-center items-center'}>
      <div className={'grow mt-4 flex flex-col max-w-xs'}>
        <img
          src={
            'https://upload.wikimedia.org/wikipedia/ru/e/e5/Magritte_TheSonOfMan.jpg'
          }
        />
        <div className={'mt-4 self-center'}>Virtual apple for test</div>
        <div className={'mt-4 grid grid-cols-2 gap-3'}>
          <div>Price:</div>
          <div>0.001$</div>
          <div>Count:</div>
          <Input {...ffw.f.count.getInput()} type={'number'} />
          <div>Total price:</div>
          <div>{ffw.f.count.value * 0.001}$</div>
        </div>
        <CryptotterButton
          className={'mt-8'}
          onSuccess={() => {}}
          onClick={async () => {
            const transaction = createTransaction({
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
