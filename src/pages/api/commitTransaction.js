// pages/api/commitTransaction.js
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token_ws } = req.body;

    try {
      const tx = new WebpayPlus.Transaction(new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration
      ));
      const response = await tx.commit(token_ws);

      if (response.response_code === 0) {
        // Transacción exitosa
        res.status(200).json({
          message: 'Transacción exitosa',
          details: response
        });
      } else {
        // Transacción fallida
        res.status(400).json({
          message: 'Transacción fallida',
          details: response,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al confirmar la transacción',
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
