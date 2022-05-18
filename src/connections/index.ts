import fetch from 'cross-fetch';

export async function createTransaction({amount, currency, name}) {
  const response = await fetch(
    `
    ${process.env['NEXT_PUBLIC_API']}//api/v1/transaction
  `,
    {
      method: 'POST',
      body: JSON.stringify({
        amount,
        currency,
        name,
      }),
    }
  );
  return response.json();
}
