'use client'

import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Modal } from '@/components/Modal'
import { ModalClose } from '@/components/Modal/ModalClose'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import { useService } from '@/hooks/useService'
import DeleteForeverIcon from '@mui/icons-material/DeleteForeverRounded'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, ProductProps } from '../DashboardLayout'

interface ModalProps {
  createModal: boolean
  detailsModal: boolean
}

export const Products = () => {
  const validation = useAuth()
  const service = useService()
  const [viewProduct, setViewProduct] = useState<ProductProps>()
  const [modal, setModal] = useState<ModalProps>({
    createModal: false,
    detailsModal: false,
  })
  const [newProduct, setNewProduct] = useState<ProductProps>({
    id: 0,
    name: '',
    description: '',
    price: 0,
  })

  useEffect(() => {
    if (validation.token !== '') {
      service.updateServiceData(validation.token)
    }
  }, [validation])

  const createProductPolicy = (product: ProductProps): boolean => {
    if (product.name === '') return false
    if (product.price > 999.99) return false
    if (product.price < 0.1) return false

    return true
  }

  const createNewProduct = async () => {
    if (!newProduct) {
      return
    }

    if (!createProductPolicy(newProduct)) {
      console.log('error')
      return
    }

    return axios.post(
      (process.env.NEXT_PUBLIC_DASHBOARD_PRODUCTS as string) + 'create',
      {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
      },
      {
        headers: {
          Authorization: 'Bearer ' + validation.token,
        },
      },
    )
  }

  const deleteExistentProduct = async (product: ProductProps) => {
    return axios.delete(
      (process.env.NEXT_PUBLIC_DASHBOARD_PRODUCTS as string) + 'delete',
      {
        headers: {
          Authorization: 'Bearer ' + validation.token,
        },
        params: {
          id: product.id,
        },
      },
    )
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
                Total produtos
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                {service.getServiceData?.products.length}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <Table.Root>
            <Table.Top>
              <Table.Text
                text="Produtos criados por você"
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
                Criar produto
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
                    title="Nome do seu Produto"
                    label="Nome"
                    value={newProduct?.name}
                    onChange={(e) =>
                      setNewProduct((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Modal.Input
                    variant="outlined"
                    title="Descrição do seu Produto"
                    label="Descrição"
                    value={newProduct?.description}
                    onChange={(e) =>
                      setNewProduct((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                      }))
                    }
                  />
                  <Modal.Numeric
                    prefix="R$"
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    title="Defina um preço para o seu produto"
                    value={newProduct?.price}
                    onChange={(e) => {
                      const number = parseFloat(
                        e.target.value.replace(',', '.').replace('R$', ''),
                      )
                      setNewProduct((prevState) => ({
                        ...prevState,
                        price: number,
                      }))
                    }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Modal.Button
                    onClick={() => {
                      createNewProduct()
                        .then((response) => {
                          if (response) {
                            if (response.status === 200) {
                              service.updateServiceData(validation.token)
                            }
                          }
                        })
                        .catch((error) => console.log(error))
                        .finally(() => {
                          setModal({
                            createModal: false,
                            detailsModal: false,
                          })
                        })
                    }}
                  >
                    Salvar
                  </Modal.Button>
                </Modal.Footer>
              </Modal.Root>
            </Table.Top>
            <Table.Content>
              <Table.Header>
                <Table.Column persist text="Nome do Produto" />
                <Table.Column text="ID do Produto" />
                <Table.Column text="Preço do Produto" />
                <Table.Column text="Informações" />
                <Table.Column text="" />
              </Table.Header>
              {service.getServiceData &&
                service.getServiceData?.products.map((product, index) => (
                  <Table.Data key={index}>
                    <Table.Row persist text={product.name} />
                    <Table.Row text={product.id.toString()} />
                    <Table.Row text={product.price.toFixed(2)} />
                    <Table.Button
                      onClick={() => {
                        setViewProduct(product)
                        setModal({
                          createModal: false,
                          detailsModal: true,
                        })
                      }}
                    >
                      Detalhes
                    </Table.Button>
                    <Table.Button
                      className="!bg-transparent !text-end !max-w-[24px] !p-0"
                      onClick={() => {
                        deleteExistentProduct(product)
                          .then((response) => {
                            if (response.status === 200) {
                              service.updateServiceData(validation.token)
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
                      <Modal.Header title="Informações do Produto" />
                      <Modal.Body>
                        <Modal.Body className="!gap-0">
                          <Modal.Text
                            text="Nome do Produto"
                            className="text-center text-zinc-400 text-xs"
                          />
                          <Modal.Text
                            text={viewProduct?.name}
                            className="text-center !font-light !text-sm !text-zinc-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Body className="!gap-0">
                          <Modal.Text
                            text="Identificador"
                            className="text-center !font-light !text-xs !text-zinc-400"
                          />
                          <Modal.Text
                            text={viewProduct?.id.toString()}
                            className="text-center !font-light !text-sm !text-zinc-400 p-4 rounded-lg border border-zinc-200"
                          />
                        </Modal.Body>
                        <Modal.Text
                          text={viewProduct?.description}
                          className="text-center text-zinc-400 text-xs"
                        />
                        <Modal.Text
                          text={'R$ ' + viewProduct?.price.toFixed(2)}
                          className="!font-bold !text-4xl !text-blue-600 text-center"
                        />
                        <Modal.Footer className="!mt-0">
                          <Modal.Body className="!flex-row justify-center !mt-0">
                            <Modal.Button className="!bg-red-600">
                              Deletar
                            </Modal.Button>
                          </Modal.Body>
                          <Modal.Text
                            text={service.getServiceData?.id}
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

export default Products
