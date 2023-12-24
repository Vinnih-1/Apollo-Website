import axios from 'axios'
import { useEffect, useState } from 'react'

interface ServiceProps {
  owner: string
  serviceId: string
  serviceKey: string
  discordId: string
  categoryId: string
  createAt: string
  expirateAt: string
  products: Array<object>
  sales: Array<object>
  activity: Array<object>
}

export const useService = () => {
  const [service, setService] = useState<ServiceProps | undefined>(undefined)
  const serviceUrl = process.env.NEXT_PUBLIC_SERVICE_INFO as string

  useEffect(() => {
    axios.get(serviceUrl + '')
  }, [])
}
