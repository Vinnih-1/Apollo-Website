import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Modal } from '@/components/Modal'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import { PurchaseProps } from '@/hooks/usePurchase'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../DashboardLayout'

export const Orders = () => {
  const validation = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Array<PurchaseProps>>([])
  const [viewOrder, setViewOrder] = useState<PurchaseProps>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(
          (process.env.NEXT_PUBLIC_DASHBOARD_ORDERS as string) + 'payments',
          {
            headers: {
              Authorization: 'Bearer ' + validation.token,
            },
            params: {
              page: 0,
            },
          },
        )
        .then((response) => {
          const { content } = response.data
          setOrders(content as Array<PurchaseProps>)
        })
    }
  }, [validation])

  if (validation.loading) {
    return <Loading />
  }

  const acceptOrder = async (order: PurchaseProps) => {
    return axios.get(
      (process.env.NEXT_PUBLIC_DASHBOARD_ORDERS as string) + 'authorize',
      {
        headers: {
          Authorization: 'Bearer ' + validation.token,
        },
        params: {
          externalReference: order.externalReference,
        },
      },
    )
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
          <Table.Root>
            <Table.Top>
              <Table.Text
                text="Lista de pedidos pendentes"
                className="font-bold text-xl text-blue-600"
              />
            </Table.Top>
            <Table.Content>
              <Table.Header>
                <Table.Column persist text="Email" />
                <Table.Column text="Referência externa" />
                <Table.Column text="Expira em:" />
                <Table.Column text="Informações" className="!text-end mr-2" />
              </Table.Header>
              {orders.length > 0 &&
                orders.map((order, index) => (
                  <Table.Data key={index}>
                    <Table.Row persist text={order.payer} />
                    <Table.Row text={order.externalReference} />
                    <Table.Row
                      text={Math.ceil(
                        (new Date(order.expirateAt).getTime() -
                          new Date().getTime()) /
                          (1000 * 60),
                      )
                        .toString()
                        .concat(' minuto(s)')}
                    />
                    <Table.Button
                      onClick={() => {
                        setViewOrder(order)
                        setOpen(!open)
                      }}
                    >
                      Detalhes
                    </Table.Button>
                    <Modal.Root open={open}>
                      <Modal.Close onClick={() => setOpen(!open)} />
                      <Modal.Header title="Informações do Pagamento" />
                      <Modal.Body>
                        <Modal.Body className="!gap-0">
                          <Modal.Text
                            text="Comprador"
                            className="text-center text-zinc-400 text-xs"
                          />
                          <Modal.Text
                            text={order?.payer}
                            className="text-center !font-light !text-sm !text-zinc-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Body className="!gap-0">
                          <Modal.Text
                            text="Intenção do Pagamento"
                            className="text-center text-zinc-400 text-xs"
                          />
                          <Modal.Text
                            text={order?.paymentIntent}
                            className="text-center !font-light !text-sm !text-zinc-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Text
                          text={order?.paymentStatus}
                          className="text-center !font-bold !text-lg !text-blue-600"
                        />
                        <Modal.Text
                          text={'R$ ' + order?.price.toFixed(2)}
                          className="!font-bold !text-4xl !text-blue-600 text-center"
                        />
                        <Modal.Footer>
                          <Modal.Body className="!flex-row justify-center">
                            <Modal.Button className="!bg-green-600">
                              Aprovar
                            </Modal.Button>
                            <Modal.Button className="!bg-red-600">
                              Cancelar
                            </Modal.Button>
                          </Modal.Body>
                          <Modal.Text
                            text={order?.id}
                            className="text-sm !text-zinc-400 text-light"
                          />
                        </Modal.Footer>
                      </Modal.Body>
                    </Modal.Root>
                  </Table.Data>
                ))}
            </Table.Content>
          </Table.Root>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Orders
