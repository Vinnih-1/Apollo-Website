import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Plans = () => {
  const validation = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (validation.token !== '') {
      setLoading(false)
    }
  }, [validation])

  if (loading) {
    return <Loading />
  }

  if (!validation.authorities.some((path) => path.authority === 'ROLE_ADMIN')) {
    router.replace('/dashboard')
    return null
  }

  return (
    <div>
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
        <div className="w-full">
          <div className="flex justify-between max-w-5xl mx-auto mt-12">
            <div className="bg-zinc-100 w-72 h-28 shadow-xl rounded-xl border border-zinc-200 mx-auto">
              <h1 className="ml-8 mt-4 text-zinc-400 text-sm font-light">
                Planos registrados
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                113
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <div className="flex items-center justify-between p-8">
              <h1 className="font-bold text-xl text-blue-600">
                Lista de planos
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="flex bg-zinc-200 py-2 px-4">
                <span className="grow max-w-[33%]">ID do Plano</span>
                <span className="grow hidden md:block max-w-[13%]">
                  Service Key
                </span>
                <span className="grow hidden md:block max-w-[33%]">
                  Expira em:
                </span>
              </div>
              <div className="flex items-center bg-zinc-100 p-4">
                <span className="grow text-zinc-700 text-sm max-w-[33%] overflow-hidden truncate">
                  6997bdb0-7661-4478-9a33-aad616285ed1
                </span>
                <span className="grow text-zinc-700 text-sm max-w-[13%] overflow-hidden truncate">
                  30122003
                </span>
                <span className="grow text-zinc-700 text-sm max-w-[33%] overflow-hidden truncate">
                  30/12/2023 às 23:59
                </span>
                <button className="p-2 px-4 bg-blue-600 rounded-lg text-zinc-200 text-sm mx-auto">
                  Informações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plans
