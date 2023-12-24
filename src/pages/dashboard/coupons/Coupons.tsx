import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverRounded'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CouponProps, DashboardLayout } from '../DashboardLayout'

export const Coupons = () => {
  const validation = useAuth()
  const paymentUrl = process.env.NEXT_PUBLIC_DASHBOARD_COUPONS as string
  const [coupons, setCoupons] = useState<Array<CouponProps>>([])
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
          const payments = response.data as Array<CouponProps>
          setCoupons(payments)
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
                Total cupons
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                {coupons.length}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <div className="flex items-center justify-between p-8">
              <h1 className="font-bold text-xl text-blue-600">
                Cupons criados por você
              </h1>
              <button className="text-white text-sm text-light rounded-xl py-3 px-6 bg-green-600 hover:bg-green-500 duration-300">
                Criar cupom
              </button>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center bg-zinc-200 py-2 px-4">
                <span className="grow max-w-[40%] md:max-w-[26%]">
                  Nome do Cupom
                </span>
                <span className="grow hidden md:block max-w-[26%]">
                  ID do Cupom
                </span>
                <span className="grow max-w-[40%] md:max-w-[10%]">
                  Desconto
                </span>
                <span className="grow hidden md:block max-w-[26%]">
                  Data de Expiração
                </span>
                <span className="grow hidden md:block max-w-[10%] text-center">
                  Deletar
                </span>
              </div>
              {coupons.length > 0 ? (
                coupons.map((coupon, index) => (
                  <div
                    className="flex items-center bg-zinc-100 p-4"
                    key={index}
                  >
                    <span className="grow max-w-[40%] md:max-w-[26%] text-green-600 font-bold">
                      {coupon.name}
                    </span>
                    <span className="grow hidden md:block max-w-[26%] text-zinc-400 font-light text-sm overflow-hidden truncate">
                      {coupon.id}
                    </span>
                    <span className="grow max-w-[40%] md:max-w-[10%] text-blue-600 font-bold">
                      {coupon.discount}
                    </span>
                    <span className="grow hidden md:block max-w-[26%] text-red-600 overflow-hidden truncate">
                      {coupon.expirateAt}
                    </span>
                    <button className="hidden md:block mx-auto">
                      <DeleteForeverIcon className="fill-red-600 hover:fill-sky-600 duration-300" />
                    </button>
                    <button className="p-2 px-4 bg-blue-600 rounded-lg text-zinc-200 text-sm md:hidden mx-auto">
                      Informações
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center bg-zinc-100 p-4">
                  <span className="grow max-w-[40%] md:max-w-[26%] text-green-600 font-bold">
                    -
                  </span>
                  <span className="grow hidden md:block max-w-[26%] text-zinc-400 font-light text-sm overflow-hidden truncate">
                    -
                  </span>
                  <span className="grow max-w-[40%] md:max-w-[10%] text-blue-600 font-bold">
                    -
                  </span>
                  <span className="grow hidden md:block max-w-[26%] text-red-600 overflow-hidden truncate">
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

export default Coupons
