// pages/payment/confirm.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentConfirm() {
  const router = useRouter();

  useEffect(() => {
    const confirmPayment = async () => {
      const { token_ws } = router.query;
      if (token_ws) {
        try {
          const response = await fetch('/api/commitTransaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token_ws })
          });

          const result = await response.json();

          console.log('Commit Result:', result); // Log the result for debugging

          if (response.ok && result.details) {
            router.push({
              pathname: '/payment/success',
              query: { details: JSON.stringify(result.details) }
            });
          } else {
            console.error(result.message);
            // Manejo de errores, si la transacción falló
            // Mostrar mensaje de error al usuario
          }
        } catch (error) {
          console.error('Error al confirmar el pago', error);
          // Mostrar mensaje de error al usuario
        }
      }
    };

    confirmPayment();
  }, [router.query.token_ws, router]);

  return <div>Confirmando tu pago...</div>;
}
