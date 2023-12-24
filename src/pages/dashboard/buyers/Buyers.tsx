import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { DashboardLayout } from '../DashboardLayout'

export const Buyers = () => {
  const validation = useAuth()

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
        <div className="w-full">
          <div className="flex justify-between max-w-5xl mx-auto mt-12">
            <div className="bg-zinc-100 w-72 h-28 shadow-xl rounded-xl border border-zinc-200 mx-auto">
              <h1 className="ml-8 mt-4 text-zinc-400 text-sm font-light">
                Compradores
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                18
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <div className="flex items-center justify-between p-8">
              <h1 className="font-bold text-xl text-blue-600">
                Top compradores na sua loja
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center bg-zinc-200 py-2 px-4">
                <span className="grow md:max-w-[26%]">Email do Comprador</span>
                <span className="grow hidden md:block max-w-[26%]">
                  Total de Adquirido
                </span>
                <span className="grow hidden md:block max-w-[20%]">
                  Total Arrecadado
                </span>
                <span className="grow hidden md:block max-w-[26%]">
                  Última Compra Em
                </span>
              </div>
              <div className="flex items-center bg-zinc-100 p-4">
                <span className="grow md:max-w-[26%] text-zinc-400">
                  viniciusalb10@gmail.com
                </span>
                <span className="grow hidden md:block max-w-[26%] overflow-hidden truncate text-blue-600 font-bold">
                  4 PRODUTOS
                </span>
                <span className="grow hidden md:block max-w-[20%] text-blue-600 font-bold">
                  R$ 394,23
                </span>
                <span className="grow hidden md:block max-w-[26%] overflow-hidden truncate text-green-600">
                  12/18/2023 às 04:18
                </span>
                <button className="p-2 px-4 bg-blue-600 rounded-lg text-zinc-200 text-sm md:hidden mx-auto">
                  Informações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Buyers
