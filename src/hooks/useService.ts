'use client'

import { ServiceProps } from '@/pages/dashboard/DashboardLayout'
import axios from 'axios'
import { useState } from 'react'

interface ServiceParamProps {
  page?: number
  status?: string
}

export const useService = (props: ServiceParamProps) => {
  const [service, setService] = useState<ServiceProps>()
  const defaultParams = props || {
    page: 0,
  }

  const updateServiceData = (token: string) => {
    axios
      .get(process.env.NEXT_PUBLIC_DASHBOARD_SERVICE as string, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page: defaultParams.page,
          status: defaultParams.status,
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
