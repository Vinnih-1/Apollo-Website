import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Modal } from '@/components/Modal'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, PaymentProps, ServiceProps } from './DashboardLayout'

const Dashboard = () => {
  const validation = useAuth()
  const [service, setService] = useState<ServiceProps | undefined>()
  const [payments, setPayments] = useState<Array<PaymentProps>>([])
  const [viewPayment, setViewPayment] = useState<PaymentProps>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(process.env.NEXT_PUBLIC_DASHBOARD_SERVICE as string, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
        })
        .then((response) => {
          const service = response.data as ServiceProps
          setService(service)
        })
        .catch((error) => console.log(error))
      axios
        .get(process.env.NEXT_PUBLIC_DASHBOARD_PENDING_PAYMENTS as string, {
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

  if (validation.loading) {
    return <Loading />
  }

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
                {0}
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
                {0}
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
          <Table.Root>
            <Table.Top>
              <Table.Text
                text="Pagamentos Gerados Recentemente"
                className="font-bold text-xl text-blue-600"
              />
            </Table.Top>
            <Table.Content>
              <Table.Header>
                <Table.Column text="Comprador" />
                <Table.Column text="ID do Produto" />
                <Table.Column text="Preço" />
                <Table.Column text="Informações" />
              </Table.Header>
              {payments.length > 0 &&
                payments.map((payment, index) => (
                  <Table.Data key={index}>
                    <Table.Row persist text={payment.payer} />
                    <Table.Row text={payment.id} />
                    <Table.Row text={payment.price.toFixed(2)} />
                    <Table.Button
                      onClick={() => {
                        setViewPayment(payment)
                        setOpen(!open)
                      }}
                      className="text-start"
                    >
                      Detalhes
                    </Table.Button>
                    <Modal.Root open={open}>
                      <Modal.Close onClick={() => setOpen(!open)} />
                      <Modal.Header title="Informações do Pagamento" />
                      <Modal.Body>
                        <Modal.Input
                          title="Comprador"
                          label=""
                          value={viewPayment?.payer}
                          disabled
                          variant="outlined"
                        />
                        <Modal.Input
                          title="Chat ID"
                          label=""
                          value={viewPayment?.chatId}
                          disabled
                          variant="outlined"
                        />
                        <Modal.Text
                          text={viewPayment?.paymentStatus}
                          className="text-center !font-bold !text-2xl !text-yellow-400"
                        />
                        <Modal.Text
                          text={'R$ ' + viewPayment?.price.toFixed(2)}
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
                            text={viewPayment?.id}
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

export default Dashboard
