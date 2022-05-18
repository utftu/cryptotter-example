import fetch from 'cross-fetch';

export async function createTransaction({amount, currency, name}) {
  const response = await fetch('/api/transaction', {
    method: 'POST',
    body: JSON.stringify({
      amount,
      currency,
      name,
    }),
  });
  return response.json();
}
