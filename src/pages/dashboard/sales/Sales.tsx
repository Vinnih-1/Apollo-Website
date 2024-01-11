import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Modal } from '@/components/Modal'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import { useService } from '@/hooks/useService'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, PaymentProps } from '../DashboardLayout'

export const Sales = () => {
  const validation = useAuth()
  const service = useService({ status: 'PAYED' })
  const [viewPayment, setViewPayment] = useState<PaymentProps>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (validation.token !== '') {
      service.updateServiceData(validation.token)
    }
  }, [validation])

  if (validation.loading) {
    return <Loading />
  }

  return (
    <DashboardLayout>
      <div className="fixed top-0 z-20 flex justify-between bg-sky-700 w-full py-2 px-5 md:px-20">
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
                Dinheiro movimentado
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold overflow-hidden">
                R${' '}
                {service.getServiceData?.payments
                  .reduce(
                    (accumulator, payment) =>
                      accumulator + payment.product.price,
                    0,
                  )
                  .toFixed(2)}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <Table.Root>
            <Table.Top>
              <Table.Text
                text="Vendas efetuadas com êxito"
                className="font-bold text-xl text-blue-600"
              />
            </Table.Top>
            <Table.Content>
              <Table.Header>
                <Table.Column persist text="Comprador" />
                <Table.Column text="ID do Produto" />
                <Table.Column text="Preço" />
                <Table.Column text="Status" />
                <Table.Column text="Informações" />
              </Table.Header>
              {service.getServiceData?.payments &&
                service.getServiceData.payments.map((payment, index) => (
                  <Table.Data key={index}>
                    <Table.Row persist text={payment.payer} />
                    <Table.Row text={payment.product.id.toString()} />
                    <Table.Row text={payment.product.price.toFixed(2)} />
                    <Table.Row text={payment.paymentStatus} />
                    <Table.Button
                      onClick={() => {
                        setOpen(!open)
                        setViewPayment(payment)
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
                            text={viewPayment?.payer}
                            className="text-center !font-light !text-sm !text-zinc-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Body className="!gap-0">
                          <Modal.Text
                            text="ID do Chat"
                            className="text-center text-zinc-400 text-xs"
                          />
                          <Modal.Text
                            text={viewPayment?.chatId}
                            className="text-center !font-light !text-sm !text-zinc-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Text
                          text={viewPayment?.paymentStatus}
                          className="text-center !font-bold !text-lg !text-blue-600"
                        />
                        <Modal.Text
                          text={'R$ ' + viewPayment?.product.price.toFixed(2)}
                          className="!font-bold !text-4xl !text-blue-600 text-center"
                        />
                        <Modal.Footer>
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

export default Sales
