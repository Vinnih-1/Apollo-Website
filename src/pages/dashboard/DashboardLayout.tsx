import { useAuth } from '@/hooks/useAuth'
import { useService } from '@/hooks/useService'
import { ReactNode, useEffect, useState } from 'react'

export interface CouponProps {
  id?: number
  name: string
  discount: number
  usage?: number
  maxUsage?: number
  createAt?: string
  expirateAt?: string
  enabled?: boolean
  expirateDays: number
}

export interface ProductProps {
  id: number
  name: string
  description: string
  price: number
}

export interface PaymentProps {
  id: string
  payer: string
  chatId: string
  paymentStatus: string
  externalReference: string
  createAt: string
  expirateAt: string
  product: ProductProps
}

export interface ServiceProps {
  owner: string
  id: string
  serviceKey: string
  authorizationData: {
    discordId: string
    categoryId: string
  }
  buyers: number
  moneyMoved: number
  products: Array<ProductProps>
  coupons: Array<CouponProps>
  payments: Array<PaymentProps>
}

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const validation = useAuth()
  const service = useService({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!validation.loading) {
      setLoading(false)
    }

    if (validation.token !== '') {
      if (service.getServiceData === undefined) {
        service.updateServiceData(validation.token)
      }
    }
  }, [validation])

  if (loading) {
    return null
  }

  if (!validation.success) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <span className="text-sm text-zinc-400 font-light">
          Algo de errado não está certo...
        </span>
      </div>
    )
  }

  if (
    !service &&
    !validation.authorities.some((auth) => auth.authority === 'ROLE_ADMIN')
  ) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <span className="text-sm text-zinc-400 font-light">
          Você não tem nenhum serviço ativo
        </span>
      </div>
    )
  }

  return <div>{children}</div>
}
