import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, ServiceProps } from '../DashboardLayout'

const Service = () => {
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
          setService(service)
          setLoading(false)
        })
        .catch((error) => console.log(error))
    }
  }, [validation])

  if (loading) {
    return <Loading />
  }

  return (
    <DashboardLayout>
      <div className="fixed top-0 z-10 flex justify-between bg-sky-700 w-full py-2 px-5 md:px-20">
        <a href="#" className="flex gap-4">
          <Image
            src={discordSmallIcon}
            width={17}
            height={17}
            alt="Icone do Discord"
          />
          <span className="text-xs text-white">Atendimento via Discord</span>
        </a>
        <a href="#" className="flex gap-4">
          <Image
            src={termsSmallIcon}
            width={17}
            height={17}
            alt="Icone dos termos"
          />
          <span className="text-xs text-white">Termos e Políticas</span>
        </a>
      </div>
      <div className="flex">
        <Sidebar />
        <div className="w-full bg-zinc-100">
          <div className="flex">
            <div className="flex flex-col items-center mx-auto">
              <AdminPanelSettingsIcon className="text-8xl fill-blue-600 mt-16" />
              <h1 className="text-lg font-bold text-blue-600">
                Informações de Segurança
              </h1>
              <span className="text-red-300 font-light text-center text-sm mt-4">
                (NÃO COMPARTILHE ESTAS INFORMAÇÕES COM NINGUÉM)
              </span>
              <span className="inline text-zinc-400 font-light text-sm mt-4">
                Autorizado:{' '}
                <span className="inline text-yellow-600 font-bold text-lg">
                  {service?.discordId !== null ? 'SIM' : 'NÃO'}
                </span>
              </span>
              <span className="text-zinc-400 text-sm font-light mt-4">
                Expira em:{' '}
                <span className="text-red-600 font-light text-sm">
                  {service?.expirateAt}
                </span>
              </span>
              <button className="py-3 bg-green-600 rounded w-40 text-white text-sm mt-4 hover:bg-green-400 duration-300">
                Renovar serviço
              </button>
              <div className="flex items-center justify-center flex-wrap bg-zinc-100 gap-12 mt-8 rounded-lg">
                <div className="flex flex-col items-center justify-between mx-8">
                  <div>
                    <span className="text-zinc-400 font-light text-xs">
                      ID do seu Serviço
                    </span>
                    <div className="w-48 p-3 border border-green-600 rounded-lg overflow-hidden truncate cursor-pointer">
                      <span className="text-sm text-green-200 font-light">
                        {service?.id}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-light text-xs">
                      Senha do seu Serviço
                    </span>
                    <div className="w-48 p-3 border text-center border-green-600 rounded-lg overflow-hidden truncate cursor-pointer">
                      <span className="text-sm text-green-200 font-light">
                        {service?.serviceKey}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between mx-8">
                  <div>
                    <span className="text-zinc-400 font-light text-xs">
                      Email do Serviço
                    </span>
                    <div className="w-48 p-3 border border-green-600 text-center rounded-lg overflow-hidden truncate cursor-pointer">
                      <span className="text-sm text-green-200 font-light">
                        {service?.owner}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-light text-xs">
                      Discord Cadastrado
                    </span>
                    <div className="w-48 p-3 border text-center border-green-600 rounded-lg overflow-hidden truncate cursor-pointer">
                      <span className="text-sm text-green-200 font-light">
                        {service?.discordId}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mx-8">
                  <div>
                    <span className="text-zinc-400 font-light text-xs">
                      Categoria Cadastrada
                    </span>
                    <div className="w-48 p-3 border border-green-600 text-center rounded-lg overflow-hidden truncate cursor-pointer">
                      <span className="text-sm text-green-200 font-light">
                        {service?.categoryId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Service
