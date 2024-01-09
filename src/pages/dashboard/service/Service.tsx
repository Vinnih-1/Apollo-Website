import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { useService } from '@/hooks/useService'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import copy from 'clipboard-copy'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../DashboardLayout'

const Service = () => {
  const validation = useAuth()
  const service = useService({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (validation.token !== '') {
      service.updateServiceData(validation.token)
    }
  }, [validation])

  if (validation.loading) {
    return <Loading />
  }

  const containerClass = `flex flex-col items-center absolute w-full h-96 bg-blue-600 gap-6 duration-500 ease-out ${
    open
      ? 'transform -translate-y-0 rounded-t-large'
      : 'transform translate-y-80 rounded-t-xll'
  }`

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
            <div className="flex flex-col h-screen justify-center items-center mx-auto">
              <div className="relative flex flex-col items-center overflow-hidden w-96 h-96 mt-12 rounded-lg bg-zinc-200">
                <AdminPanelSettingsIcon className="!text-8xl !fill-blue-600" />
                <div className="flex flex-col items-center gap-6 mt-4">
                  <span className="text-md font-normal text-zinc-700">
                    Convide nosso bot para efetuar suas vendas
                  </span>
                  <Link
                    target="_blank"
                    href={process.env.NEXT_PUBLIC_DISCORD_INVITE as string}
                    className="bg-blue-600 text-white text-center text-sm font-light w-36 py-2 rounded-large"
                  >
                    Convidar
                  </Link>
                  <span className="text-zinc-400 text-xs mt-12">
                    Lembre-se de nunca compartilhar estas informações com
                    ninguém
                  </span>
                </div>
                <div className={containerClass}>
                  <div>
                    <button
                      type="button"
                      className="p-2"
                      onClick={() => setOpen(!open)}
                    >
                      <ArrowCircleUpRoundedIcon className="!text-4xl !fill-white animate-bounce" />
                    </button>
                  </div>
                  <span className="text-2xl text-white font-bold">
                    Chave do Serviço
                  </span>
                  <button
                    type="button"
                    className="border border-white text-xs text-white p-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
                    onClick={async (event) => {
                      await copy(service.getServiceData?.serviceKey as string)
                      const target = event.target as HTMLButtonElement
                      target.classList.add('bg-green-400')
                      setTimeout(() => {
                        target.classList.remove('bg-green-400')
                      }, 500)
                    }}
                  >
                    {service.getServiceData?.serviceKey}
                    <ContentCopyRoundedIcon />
                  </button>
                  <span className="text-2xl text-white font-bold">
                    ID do Serviço
                  </span>
                  <button
                    type="button"
                    className="border border-white text-xs text-white p-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
                    onClick={async (event) => {
                      await copy(service.getServiceData?.id as string)
                      const target = event.target as HTMLButtonElement
                      target.classList.add('bg-green-400')
                      setTimeout(() => {
                        target.classList.remove('bg-green-400')
                      }, 500)
                    }}
                  >
                    {service.getServiceData?.id}
                    <ContentCopyRoundedIcon />
                  </button>
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
