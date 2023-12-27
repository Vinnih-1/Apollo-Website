import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { PurchaseProps } from '@/hooks/usePurchase'
import axios, { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../DashboardLayout'

export const Orders = () => {
  const validation = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Array<PurchaseProps>>([])
  const ordersUrl = process.env.NEXT_PUBLIC_DASHBOARD_ORDERS as string

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(ordersUrl + 'payments', {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
          params: {
            page: 0,
          },
        })
        .then((response) => {
          const { content } = response.data
          setOrders(content as Array<PurchaseProps>)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [validation])

  const acceptOrder = async (order: PurchaseProps) => {
    return axios.get(ordersUrl + 'authorize', {
      headers: {
        Authorization: 'Bearer ' + validation.token,
      },
      params: {
        externalReference: order.externalReference,
      },
    })
  }

  if (loading) {
    return <Loading />
  }

  if (!validation.authorities.some((path) => path.authority === 'ROLE_ADMIN')) {
    router.replace('/dashboard')
    return null
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
        <div className="w-full">
          <div className="flex justify-between max-w-5xl mx-auto mt-12">
            <div className="bg-zinc-100 w-72 h-28 shadow-xl rounded-xl border border-zinc-200 mx-auto">
              <h1 className="ml-8 mt-4 text-zinc-400 text-sm font-light">
                Pedidos em andamento
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                {orders.length}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <div className="flex items-center justify-between p-8">
              <h1 className="font-bold text-xl text-blue-600">
                Lista de pedidos pendentes
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="flex bg-zinc-200 py-2 px-4">
                <span className="grow max-w-[25%]">Email</span>
                <span className="grow hidden md:block max-w-[30%]">
                  Referência externa
                </span>
                <span className="grow hidden md:block max-w-[29%]">
                  Expira em:
                </span>
              </div>
              <div>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center bg-zinc-100 p-4"
                    >
                      <span className="grow text-zinc-700 text-sm max-w-[70%] md:max-w-[25%] overflow-hidden truncate">
                        {order.payer}
                      </span>
                      <span className="grow text-zinc-700 md:block hidden text-sm max-w-[30%] overflow-hidden truncate">
                        {order.externalReference}
                      </span>
                      <span className="grow text-zinc-700 md:block hidden text-sm max-w-[29%] overflow-hidden truncate">
                        {Math.ceil(
                          (new Date(order.expirateAt).getTime() -
                            new Date().getTime()) /
                            (1000 * 60),
                        )}{' '}
                        minuto(s)
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="p-2 px-4 md:block hidden bg-green-600 rounded-lg text-zinc-200 text-sm mx-auto"
                          onClick={() => {
                            acceptOrder(order).then(
                              (response: AxiosResponse) => {
                                if (response.status === 200)
                                  console.log(response.data as PurchaseProps)
                              },
                            )
                          }}
                        >
                          Aprovar pedido
                        </button>
                        <button className="p-2 px-4 bg-blue-600 rounded-lg text-zinc-200 text-sm mx-auto">
                          Detalhes
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center bg-zinc-100 p-4">
                    <span className="grow text-zinc-700 text-sm max-w-[70%] md:max-w-[33%] overflow-hidden truncate">
                      -
                    </span>
                    <span className="grow text-zinc-700 md:block hidden text-sm max-w-[23%] overflow-hidden truncate">
                      -
                    </span>
                    <span className="grow text-zinc-700 md:block hidden text-sm max-w-[23%] overflow-hidden truncate">
                      -
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Orders
