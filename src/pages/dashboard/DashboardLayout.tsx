import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { ReactNode, useEffect, useState } from 'react'

export interface ServiceProps {
  owner: string
  id: string
  serviceKey: string
  discordId: string
  categoryId: string
  createAt: string
  expirateAt: string
}

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const validation = useAuth()
  const serviceUrl = process.env.NEXT_PUBLIC_DASHBOARD_SERVICE as string
  const [service, setService] = useState<ServiceProps | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(serviceUrl, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
        })
        .then((response) => {
          const service = response.data as ServiceProps
          if (service.id === null) setService(undefined)
          else setService(service)
          setLoading(false)
        })
        .catch((error) => console.log(error))
    }
  }, [validation])

  if (loading) {
    return null
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
