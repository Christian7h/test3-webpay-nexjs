// pages/payment/success.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PaymentSuccess() {
  const router = useRouter();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (router.query.details) {
      try {
        // Parsear los detalles de la transacción desde la cadena JSON
        setDetails(JSON.parse(router.query.details));
      } catch (error) {
        console.error('Error al parsear los detalles', error);
        setDetails(null);
      }
    }
  }, [router.query.details]);

  return (
    <div>
      <h1>¡Pago Exitoso!</h1>
      {details ? (
        <div>
          <p>Gracias por tu compra. Aquí están los detalles de tu transacción:</p>
          <pre>{JSON.stringify(details, null, 2)}</pre>
          {/* Mostrar el número de orden */}
          <p>Tu número de orden es: {details.buy_order}</p>
        </div>
      ) : (
        <p>Cargando detalles...</p>
      )}
                <div>
          <a href="/">
        VOLVER
          <p>
            rtkmbgror,pe
          </p>
          </a>
        </div>
    </div>

    
  );
}
