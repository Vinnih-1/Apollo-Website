import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, PaymentProps, ServiceProps } from './DashboardLayout'

const Dashboard = () => {
  const validation = useAuth()
  const serviceUrl = process.env.NEXT_PUBLIC_DASHBOARD_SERVICE as string
  const paymentUrl = process.env
    .NEXT_PUBLIC_DASHBOARD_PENDING_PAYMENTS as string
  const [service, setService] = useState<ServiceProps | undefined>()
  const [payments, setPayments] = useState<Array<PaymentProps>>([])
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
      axios
        .get(paymentUrl, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
        })
        .then((response) => {
          const payments = response.data as Array<PaymentProps>
          setPayments(payments)
        })
        .catch((error) => console.log(error))
    }
  }, [validation])

  return (
    <DashboardLayout>
      <div className="fixed top-0 z-10 lg:static flex justify-between bg-sky-700 w-full py-2 px-5 md:px-20">
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
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto mt-12 lg:h-auto lg:flex-row">
            <div className="bg-zinc-100 w-72 h-28 shadow-xl rounded-xl border border-zinc-200">
              <h1 className="ml-8 mt-4 text-zinc-400 text-sm font-light">
                Total produtos
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                {service?.products.length}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
            <div className="bg-zinc-100 w-72 h-28 shadow-xl rounded-xl border border-zinc-200">
              <h1 className="ml-8 mt-4 text-zinc-400 text-sm font-light">
                Compradores
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                {service?.buyers}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
            <div className="bg-zinc-100 w-72 h-28 shadow-xl rounded-xl border border-zinc-200">
              <h1 className="ml-8 mt-4 text-zinc-400 text-sm font-light">
                Dinheiro movimentado
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold overflow-hidden">
                R$ {service?.moneyMoved.toFixed(2)}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <h1 className="font-bold text-xl text-blue-600 p-8">
              Pagamentos Gerados Recentemente
            </h1>
            <div className="flex flex-col">
              <div className="flex bg-zinc-200 p-4">
                <span className="grow max-w-[70%] md:max-w-[26%]">
                  Comprador
                </span>
                <span className="grow hidden md:max-w-[26%] md:block">
                  ID do Produto
                </span>
                <span className="grow hidden md:max-w-[26%] md:block">
                  Chat do Pagamento
                </span>
                <span className="grow hidden md:max-w-[10%] md:block">
                  Preço
                </span>
                <span className="grow text-center hidden md:max-w-[10%] md:block">
                  Status
                </span>
              </div>
              {payments?.length > 0 ? (
                payments?.map((payment, index) => (
                  <div
                    className="flex items-center bg-zinc-100 p-4"
                    key={index}
                  >
                    <span className="text-zinc-700 grow max-w-[70%] md:max-w-[26%] overflow-hidden">
                      {payment.payer}
                    </span>
                    <span className="text-zinc-700 grow hidden md:max-w-[26%] md:block overflow-hidden truncate">
                      {payment.productId}
                    </span>
                    <span className="text-zinc-700 grow hidden md:max-w-[26%] md:block">
                      {payment.chatId}
                    </span>
                    <span className="text-zinc-700 grow hidden md:max-w-[10%] md:block">
                      R$ {payment.price}
                    </span>
                    <PendingActionsIcon className="grow text-center hidden md:max-w-[10%] md:block !fill-amber-400 text-2xl mx-auto" />
                    <button className="bg-blue-600 text-zinc-200 rounded-lg text-sm p-2 md:hidden">
                      Informações
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center bg-zinc-100 p-4">
                  <span className="text-zinc-700 grow max-w-[70%] md:max-w-[26%] overflow-hidden">
                    -
                  </span>
                  <span className="text-zinc-700 grow hidden md:max-w-[26%] md:block overflow-hidden truncate">
                    -
                  </span>
                  <span className="text-zinc-700 grow hidden md:max-w-[26%] md:block">
                    -
                  </span>
                  <span className="text-zinc-700 grow hidden md:max-w-[10%] md:block">
                    -
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
