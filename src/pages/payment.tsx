// pages/payment.js
import { useState } from 'react';

export default function PaymentPage() {
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState(null);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const buyOrder = `order_${Date.now()}`;
    const sessionId = `session_${Date.now()}`;
    const returnUrl = `${window.location.origin}/payment/confirm`;

    const res = await fetch('/api/createTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ buyOrder, sessionId, amount, returnUrl })
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = `${data.url}?token_ws=${data.token}`;
    } else {
      setResponse(data);
    }
  };

  return (
    <div>
      <h1>Pago con Webpay Plus</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          required
        />
        <button type="submit">Pagar</button>
      </form>

      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
