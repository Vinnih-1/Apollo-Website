import axios, { AxiosResponse } from 'axios'

export interface PurchaseProps {
  id: string
  serviceType: string
  paymentStatus: string
  paymentIntent: string
  price: number
  payer: string
  externalReference: string
  createAt: Date
  expirateAt: Date
  qrcode: string
  qrcodeBase64: string
}

export const Purchase = async (token: string): Promise<AxiosResponse> => {
  const purchaseUrl = process.env.NEXT_PUBLIC_PURCHASE_PROFESSIONAL as string
  return axios.get(purchaseUrl, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}
