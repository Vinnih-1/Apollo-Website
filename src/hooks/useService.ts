'use client'

import { ServiceProps } from '@/pages/dashboard/DashboardLayout'
import axios from 'axios'
import { useState } from 'react'

export const useService = () => {
  const [service, setService] = useState<ServiceProps>()

  const updateServiceData = (token: string) => {
    axios
      .get(process.env.NEXT_PUBLIC_DASHBOARD_SERVICE as string, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: 0,
        },
      })
      .then((response) => {
        const service = response.data as ServiceProps
        setService(service)
      })
      .catch((error) => console.log(error))
  }

  return { getServiceData: service, updateServiceData }
}
