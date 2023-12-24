import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, PaymentProps } from '../DashboardLayout'

export const Sales = () => {
  const validation = useAuth()
  const paymentUrl = process.env
    .NEXT_PUBLIC_DASHBOARD_APPROVED_PAYMENTS as string
  const [payments, setPayments] = useState<Array<PaymentProps>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(paymentUrl, {
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
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <div className="flex items-center justify-between p-8">
              <h1 className="font-bold text-xl text-blue-600">
                Vendas efetuadas com êxito
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center bg-zinc-200 py-2 px-4">
                <span className="grow md:max-w-[26%]">Comprador</span>
                <span className="grow hidden md:block max-w-[26%]">
                  ID do Produto
                </span>
                <span className="grow hidden md:block max-w-[26%]">
                  Chat do Pagamento
                </span>
                <span className="grow hidden md:block max-w-[10%]">Preço</span>
                <span className="grow hidden md:block max-w-[10%] text-center">
                  Status
                </span>
              </div>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <div
                    className="flex items-center bg-zinc-100 p-4"
                    key={index}
                  >
                    <span className="grow md:max-w-[26%] text-zinc-500">
                      {payment.payer}
                    </span>
                    <span className="grow hidden md:block max-w-[26%] overflow-hidden truncate text-zinc-400">
                      {payment.id}
                    </span>
                    <span className="grow hidden md:block max-w-[26%] text-zinc-400">
                      {payment.chatId}
                    </span>
                    <span className="grow hidden md:block max-w-[10%] text-blue-600 font-bold">
                      R$ {payment.price}
                    </span>
                    <CheckCircleIcon className="grow hidden md:block max-w-[10%] !fill-green-400 text-2xl mx-auto" />
                    <button className="p-2 px-4 bg-blue-600 rounded-lg text-zinc-200 text-sm md:hidden mx-auto">
                      Informações
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center bg-zinc-100 p-4">
                  <span className="grow md:max-w-[26%] text-zinc-500">-</span>
                  <span className="grow hidden md:block max-w-[26%] overflow-hidden truncate text-zinc-400">
                    -
                  </span>
                  <span className="grow hidden md:block max-w-[26%] text-zinc-400">
                    -
                  </span>
                  <span className="grow hidden md:block max-w-[10%] text-blue-600 font-bold">
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

export default Sales
