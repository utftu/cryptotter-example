import fetch from 'node-fetch';

async function createTransaction(req, res) {
  const reqData = JSON.parse(req.body);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/transaction`,
    {
      method: 'POST',
      headers: {
        Cookie: `id=${process.env['SESSION']}`,
      },
      body: JSON.stringify({
        shop_id: process.env['SHOP'],
        traditional_currency: {
          id: reqData.currency,
          amount: reqData.amount,
        },
        order: {
          name: reqData.name,
          icon: 'https://berezovski.by/wp-content/uploads/2018/07/Test-Logo-Circle-black-transparent.png',
        },
      }),
    }
  );
  const data = await response.json();
  // console.log(
  //   '-----',
  //   data.detail.map((value) => value)
  // );
  // console.log('-----', 'data', data);
  res.status(200).json(data.id);
}

export default createTransaction;
