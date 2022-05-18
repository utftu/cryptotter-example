import fetch from 'node-fetch';

async function createTransaction(req, res) {
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
          id: req.body.currency,
          amount: req.body.amount,
        },
        order: {
          name: req.body.name,
          icon: 'https://berezovski.by/wp-content/uploads/2018/07/Test-Logo-Circle-black-transparent.png',
        },
      }),
    }
  );
  res.status(200).json(response.json());
}

export default createTransaction;
