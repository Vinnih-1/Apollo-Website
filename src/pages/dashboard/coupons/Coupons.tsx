import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Modal } from '@/components/Modal'
import { ModalClose } from '@/components/Modal/ModalClose'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverRounded'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CouponProps, DashboardLayout } from '../DashboardLayout'

interface ModalProps {
  createModal: boolean
  detailsModal: boolean
}

export const Coupons = () => {
  const validation = useAuth()
  const [coupons, setCoupons] = useState<Array<CouponProps>>([])
  const [viewCoupon, setViewCoupon] = useState<CouponProps>()
  const [newCoupon, setNewCoupon] = useState<CouponProps>({
    name: '',
    discount: 0,
    expirateDays: 0,
  })
  const [modal, setModal] = useState<ModalProps>({
    createModal: false,
    detailsModal: false,
  })

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
          <Table.Root>
            <Table.Top>
              <Table.Text
                text="Cupons criados por você"
                className="font-bold text-xl text-blue-600"
              />
              <Table.Button
                onClick={() => {
                  setModal({
                    createModal: true,
                    detailsModal: false,
                  })
                }}
              >
                Criar cupom
              </Table.Button>
              <Modal.Root open={modal.createModal}>
                <ModalClose
                  onClick={() => {
                    setModal({
                      createModal: false,
                      detailsModal: false,
                    })
                  }}
                />
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
                          .finally(() => {
                            setModal({
                              createModal: false,
                              detailsModal: false,
                            })
                          })
                      }
                    }}
                  >
                    Salvar
                  </Modal.Button>
                </Modal.Footer>
              </Modal.Root>
            </Table.Top>
            <Table.Content>
              <Table.Header>
                <Table.Column persist text="Nome do Cupom" />
                <Table.Column text="ID do Cupom" />
                <Table.Column text="Desconto" />
                <Table.Column text="Informações" />
                <Table.Column text="" />
              </Table.Header>
              {coupons.length > 0 &&
                coupons.map((coupon, index) => (
                  <Table.Data key={index}>
                    <Table.Row className="ml-4" persist text={coupon.name} />
                    <Table.Row text={coupon.id?.toString()} />
                    <Table.Row text={coupon.discount.toString()} />
                    <Table.Button
                      onClick={() => {
                        setViewCoupon(coupon)
                        setModal({
                          createModal: false,
                          detailsModal: true,
                        })
                      }}
                      className="!text-start"
                    >
                      Detalhes
                    </Table.Button>
                    <Table.Button
                      className="!bg-transparent !text-center !max-w-[24px] !p-0"
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
                    >
                      <DeleteForeverIcon className="!fill-red-600 hover:!fill-sky-600 duration-300" />
                    </Table.Button>
                    <Modal.Root open={modal.detailsModal}>
                      <Modal.Close
                        onClick={() => {
                          setModal({
                            createModal: false,
                            detailsModal: false,
                          })
                        }}
                      />
                      <Modal.Header title="Informações do Cupom" />
                      <Modal.Body>
                        <Modal.Body className="!gap-0">
                          <Modal.Text
                            text="Nome do Cupom"
                            className="text-center text-zinc-400 text-xs"
                          />
                          <Modal.Text
                            text={viewCoupon?.name}
                            className="text-center !font-light !text-sm !text-zinc-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Body className="!gap-0">
                          <Modal.Text
                            text="Data de Expiração"
                            className="text-center text-zinc-400 text-xs"
                          />
                          <Modal.Text
                            text={viewCoupon?.expirateAt}
                            className="text-center !font-light !text-sm !text-red-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Text
                          text={viewCoupon?.discount + '%'}
                          className="!font-bold !text-4xl !text-blue-600 text-center"
                        />
                        <Modal.Footer className="!mt-0">
                          <Modal.Body className="!flex-row justify-center !mt-0">
                            <Modal.Button className="!bg-red-600">
                              Deletar
                            </Modal.Button>
                          </Modal.Body>
                          <Modal.Text
                            text={viewCoupon?.serviceId}
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

export default Coupons
