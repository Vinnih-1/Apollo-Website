import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Modal } from '@/components/Modal'
import { ModalClose } from '@/components/Modal/ModalClose'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverRounded'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CouponProps, DashboardLayout } from '../DashboardLayout'

export const Coupons = () => {
  const validation = useAuth()
  const [coupons, setCoupons] = useState<Array<CouponProps>>([])
  const [loading, setLoading] = useState(true)
  const [newCoupon, setNewCoupon] = useState<CouponProps>({
    name: '',
    discount: 0,
    expirateDays: 0,
  })
  const [open, setOpen] = useState(false)

  const createCouponPolicy = (): boolean => {
    if (newCoupon.name === '') return false
    if (newCoupon.discount > 99 || newCoupon.discount < 1) return false
    if (newCoupon.expirateDays < 1 || newCoupon.expirateDays > 365) return false

    return true
  }

  const createNewCoupon = () => {
    return axios.post(
      (process.env.NEXT_PUBLIC_DASHBOARD_COUPONS as string) + 'create',
      {
        name: newCoupon.name,
        discount: newCoupon.discount,
        expirateDays: newCoupon.expirateDays,
      },
      {
        headers: {
          Authorization: 'Bearer ' + validation.token,
        },
      },
    )
  }

  const handleDeleteCoupon = (coupon: CouponProps) => {
    return axios.delete(
      (process.env.NEXT_PUBLIC_DASHBOARD_COUPONS as string) + 'delete',
      {
        headers: {
          Authorization: 'Bearer ' + validation.token,
        },
        params: {
          id: coupon.id,
        },
      },
    )
  }

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(process.env.NEXT_PUBLIC_DASHBOARD_COUPONS as string, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
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
              <button
                onClick={() => setOpen(!open)}
                className="text-white text-sm text-light rounded-xl py-3 px-6 bg-green-600 hover:bg-green-500 duration-300"
              >
                Criar cupom
              </button>
              <Modal.Root open={open}>
                <ModalClose onClick={() => setOpen(!open)} />
                <Modal.Header title="Criar produto" />
                <Modal.Body>
                  <Modal.Input
                    variant="outlined"
                    title="Nome do seu Cupom"
                    label="Nome"
                    value={newCoupon?.name}
                    onChange={(e) => {
                      if (e.target.value.length > 10) return
                      setNewCoupon((prevState) => ({
                        ...prevState,
                        name: e.target.value.toUpperCase(),
                      }))
                    }}
                  />
                  <Modal.Numeric
                    title="Defina o desconto do seu Cupom"
                    value={newCoupon?.discount}
                    onChange={(e) => {
                      const number = parseFloat(
                        e.target.value.replace(',', '.').replace('R$', ''),
                      )
                      setNewCoupon((prevState) => ({
                        ...prevState,
                        discount: number > 99 ? 1 : number,
                      }))
                    }}
                  />
                  <Modal.Numeric
                    title="Defina em quantos dias seu Cupom expira"
                    value={newCoupon?.expirateDays}
                    onChange={(e) => {
                      const number = parseFloat(
                        e.target.value.replace(',', '.').replace('R$', ''),
                      )
                      setNewCoupon((prevState) => ({
                        ...prevState,
                        expirateDays: number > 365 ? 1 : number,
                      }))
                    }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Modal.Button
                    onClick={() => {
                      if (createCouponPolicy()) {
                        createNewCoupon()
                          .then((response) => {
                            if (response) {
                              const coupon: CouponProps = response.data
                              coupons.push(coupon)
                              setCoupons(coupons)
                            }
                          })
                          .catch((error) => console.log(error))
                          .finally(() => setOpen(false))
                      }
                    }}
                  >
                    Salvar
                  </Modal.Button>
                </Modal.Footer>
              </Modal.Root>
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
                    <button
                      onClick={() => {
                        handleDeleteCoupon(coupon)
                          .then((response) => {
                            if (response.status === 200) {
                              const newCoupons = coupons.filter(
                                (item) => item.id !== coupon.id,
                              )
                              setCoupons(newCoupons)
                            }
                          })
                          .catch((error) => console.log(error))
                      }}
                      className="hidden md:block mx-auto"
                    >
                      <DeleteForeverIcon className="!fill-red-600 hover:!fill-sky-600 duration-300" />
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
