import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Modal } from '@/components/Modal'
import { ModalClose } from '@/components/Modal/ModalClose'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DashboardLayout, ProductProps } from '../DashboardLayout'

export const Products = () => {
  const validation = useAuth()
  const [products, setProducts] = useState<Array<ProductProps>>([])
  const [newProduct, setNewProduct] = useState<ProductProps>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    serviceId: '',
  })
  const [open, setOpen] = useState(false)

  const createProductPolicy = (product: ProductProps): boolean => {
    if (product.name === '') return false
    if (product.price > 999.99) return false
    if (product.price < 0.1) return false

    return true
  }

  const createNewProduct = async () => {
    const productDTO: ProductProps = {
      id: 0,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      serviceId: '',
    }

    if (!createProductPolicy(productDTO)) {
      console.log('error')
      return
    }

    return axios.post(
      (process.env.NEXT_PUBLIC_DASHBOARD_PRODUCTS as string) + 'create',
      {
        id: productDTO.id,
        name: productDTO.name,
        description: productDTO.description,
        price: productDTO.price,
        serviceId: productDTO.serviceId,
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

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(process.env.NEXT_PUBLIC_DASHBOARD_PRODUCTS as string, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
        })
        .then((response) => {
          const service = response.data as Array<ProductProps>
          setProducts(service)
        })
        .catch((error) => console.log(error))
    }
  }, [validation])

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
                {products.length}
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
              <Table.Button onClick={() => setOpen(!open)}>
                Criar produto
              </Table.Button>
              <Modal.Root open={open}>
                <ModalClose onClick={() => setOpen(!open)} />
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
                            const product: ProductProps = response.data
                            products.push(product)
                            setProducts(products)
                          }
                        })
                        .catch((error) => console.log(error))
                        .finally(() => setOpen(false))
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
                <Table.Column text="Informações" className="!text-end pr-8" />
              </Table.Header>
              {products.length > 0 &&
                products.map((product, index) => (
                  <Table.Data key={index}>
                    <Table.Row persist text={product.name} className="ml-8" />
                    <Table.Row text={product.id.toString()} />
                    <Table.Row text={product.price.toFixed(2)} />
                    <Table.Button className="mr-8">Detalhes</Table.Button>
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
