import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, PaymentProps } from '../DashboardLayout'

export const Sales = () => {
  const validation = useAuth()
  const [payments, setPayments] = useState<Array<PaymentProps>>([])

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(process.env.NEXT_PUBLIC_DASHBOARD_APPROVED_PAYMENTS as string, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
          params: {
            status: 'PAYED',
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
                Dinheiro movimentado
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold overflow-hidden">
                R${' '}
                {payments
                  .reduce(
                    (accumulator, payment) => accumulator + payment.price,
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
                <Table.Column text="Informações" className="!text-end mr-2" />
              </Table.Header>
              {payments.length > 0 &&
                payments.map((payment, index) => (
                  <Table.Data key={index}>
                    <Table.Row persist text={payment.payer} />
                    <Table.Row text={payment.productId.toString()} />
                    <Table.Row text={payment.price.toFixed(2)} />
                    <Table.Row text={payment.paymentStatus} />
                    <Table.Button>Detalhes</Table.Button>
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
