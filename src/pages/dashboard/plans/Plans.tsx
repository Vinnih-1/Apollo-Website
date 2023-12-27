import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Modal } from '@/components/Modal'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Table } from '@/components/Table'
import { useAuth } from '@/hooks/useAuth'
import axios, { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DashboardLayout, ServiceProps } from '../DashboardLayout'

export const Plans = () => {
  const validation = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<Array<ServiceProps>>([])
  const [selectService, setSelectService] = useState<ServiceProps>()
  const [open, setOpen] = useState(false)
  const servicesUrl = process.env.NEXT_PUBLIC_DASHBOARD_ALL_SERVICE as string

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(servicesUrl, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
          params: {
            page: 0,
          },
        })
        .then((response: AxiosResponse) => {
          const { content } = response.data
          setServices(content as Array<ServiceProps>)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [validation])

  if (loading) {
    return <Loading />
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
                Planos registrados
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                {services.length}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <Table.Root>
            <Table.Top>
              <Table.Text
                text="Lista de planos"
                className="font-bold text-xl text-blue-600"
              />
            </Table.Top>
            <Table.Content>
              <Table.Header>
                <Table.Column persist text="ID do Plano" />
                <Table.Column text="Service Key" />
                <Table.Column text="Expira em:" />
                <Table.Column text="Informações" className="!text-end mr-2" />
              </Table.Header>
              {services.length > 0 &&
                services.map((service, index) => (
                  <Table.Data key={index}>
                    <Table.Row persist text={service.id} />
                    <Table.Row text={service.serviceKey} />
                    <Table.Row text={service.expirateAt} />
                    <Table.Button
                      onClick={() => {
                        setSelectService(service)
                        setOpen(true)
                      }}
                      text="Detalhes"
                    />
                    <Modal.Root open={open}>
                      <Modal.Close onClick={() => setOpen(!open)} />
                      <Modal.Header title="Informações do Plano" />
                      <Modal.Body>
                        <Modal.Input
                          label="Dono"
                          title=""
                          variant="outlined"
                          disabled
                          value={selectService?.owner}
                        />
                        <Modal.Input
                          label="ID"
                          title=""
                          variant="outlined"
                          disabled
                          value={selectService?.id}
                        />
                        <Modal.Input
                          label="Key"
                          title=""
                          variant="outlined"
                          disabled
                          value={selectService?.serviceKey}
                        />
                        <Modal.Footer>
                          <span className="text-center text-sm text-red-600 text-light">
                            {selectService?.expirateAt}
                          </span>
                          <div className="self-center">
                            <Modal.Button>Suspender</Modal.Button>
                          </div>
                        </Modal.Footer>
                      </Modal.Body>
                    </Modal.Root>
                  </Table.Data>
                ))}
            </Table.Content>
          </Table.Root>
          {/* 
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <div className="flex items-center justify-between p-8">
              <h1 className="font-bold text-xl text-blue-600">
                Lista de planos
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="flex bg-zinc-200 py-2 px-4">
                <span className="grow max-w-[33%]">ID do Plano</span>
                <span className="grow hidden md:block max-w-[13%]">
                  Service Key
                </span>
                <span className="grow hidden md:block max-w-[33%]">
                  Expira em:
                </span>
              </div>
              {services.length > 0 ? (
                services.map((service, index) => (
                  <div
                    className="flex items-center bg-zinc-100 p-4"
                    key={index}
                  >
                    <span className="grow text-zinc-700 text-sm max-w-[33%] overflow-hidden truncate">
                      {service.id}
                    </span>
                    <span className="grow text-zinc-700 text-sm max-w-[13%] overflow-hidden truncate">
                      {service.serviceKey}
                    </span>
                    <span className="grow text-zinc-700 text-sm max-w-[33%] overflow-hidden truncate">
                      {service.expirateAt}
                    </span>
                    <button
                      onClick={() => {
                        setSelectService(service)
                        setOpen(true)
                      }}
                      className="p-2 px-4 bg-blue-600 rounded-lg text-zinc-200 text-sm mx-auto"
                    >
                      Informações
                    </button>
                    <Modal.Root open={open}>
                      <Modal.Close onClick={() => setOpen(!open)} />
                      <Modal.Header title="Informações do Plano" />
                      <Modal.Body>
                        <Modal.Input
                          label="Dono"
                          title=""
                          variant="outlined"
                          disabled
                          value={selectService?.owner}
                        />
                        <Modal.Input
                          label="ID"
                          title=""
                          variant="outlined"
                          disabled
                          value={selectService?.id}
                        />
                        <Modal.Input
                          label="Key"
                          title=""
                          variant="outlined"
                          disabled
                          value={selectService?.serviceKey}
                        />
                        <Modal.Footer>
                          <span className="text-center text-sm text-red-600 text-light">
                            {selectService?.expirateAt}
                          </span>
                          <div className="self-center">
                            <Modal.Button>Suspender</Modal.Button>
                          </div>
                        </Modal.Footer>
                      </Modal.Body>
                    </Modal.Root>
                  </div>
                ))
              ) : (
                <div className="flex items-center bg-zinc-100 p-4">
                  <span className="grow text-zinc-700 text-sm max-w-[33%] overflow-hidden truncate">
                    -
                  </span>
                  <span className="grow text-zinc-700 text-sm max-w-[13%] overflow-hidden truncate">
                    -
                  </span>
                  <span className="grow text-zinc-700 text-sm max-w-[33%] overflow-hidden truncate">
                    -
                  </span>
                </div>
              )}
            </div>
          </div>
          */}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Plans
