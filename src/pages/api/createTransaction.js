// pages/api/createTransaction.js
import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    try {
      const tx = new WebpayPlus.Transaction(new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration
      ));
      const response = await tx.create(buyOrder, sessionId, amount, returnUrl);

      res.status(200).json({
        token: response.token,
        url: response.url
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating transaction' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
