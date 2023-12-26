import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Loading } from '@/components/Loading/Loading'
import { Modal } from '@/components/Modal'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../DashboardLayout'

interface UserProps {
  email: string
  authorities: Array<{ authority: string }>
  service: string
}

export const Users = () => {
  const validation = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<Array<UserProps>>([])
  const [open, setOpen] = useState(false)
  const [viewUser, setViewUser] = useState<UserProps>()
  const usersUrl = process.env.NEXT_PUBLIC_AUTH_USERS as string

  useEffect(() => {
    if (validation.token !== '') {
      axios
        .get(usersUrl, {
          headers: {
            Authorization: 'Bearer ' + validation.token,
          },
        })
        .then((response) => {
          const { content } = response.data
          setUsers(content as Array<UserProps>)
          console.log(content as Array<UserProps>)
          setLoading(false)
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
                Usuários cadastrados
              </h1>
              <span className="ml-8 mt-4 text-blue-600 text-4xl font-bold">
                {users.length}
              </span>
              <span className="ml-8 mt-2 block text-zinc-400 text-xs font-light">
                Há 3 min
              </span>
            </div>
          </div>
          <div className="bg-zinc-100 max-w-5xl mx-auto rounded-lg shadow-xl mt-16 border border-zinc-200">
            <div className="flex items-center justify-between p-8">
              <h1 className="font-bold text-xl text-blue-600">
                Lista de usuários
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="flex bg-zinc-200 py-2 px-4">
                <span className="grow max-w-[70%] md:max-w-[23%]">Email</span>
                <span className="grow hidden md:block max-w-[38%]">
                  Serviço
                </span>
                <span className="grow hidden md:block max-w-[20%]">
                  Permissões
                </span>
                <span className="grow hidden md:block max-w-[18%] text-center">
                  Informações
                </span>
              </div>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <div
                    className="flex items-center bg-zinc-100 p-4"
                    key={index}
                  >
                    <span className="grow text-zinc-700 max-w-[70%] md:max-w-[23%]">
                      {user.email}
                    </span>
                    <span className="grow text-zinc-700 hidden md:block max-w-[38%] overflow-hidden truncate">
                      {user.service}
                    </span>
                    <span className="grow text-zinc-700 hidden md:block max-w-[20%] overflow-hidden truncate">
                      {user.authorities &&
                        user.authorities.map((role, index) => (
                          <span key={index} className="text-sm mr-4">
                            {role.authority.substring(5)}
                          </span>
                        ))}
                    </span>
                    <button
                      onClick={() => {
                        setViewUser(user)
                        setOpen(true)
                      }}
                      className="py-2 px-4 bg-blue-600 text-zinc-200 rounded-lg max-w-[15%] mx-auto"
                    >
                      Detalhes
                    </button>
                    <Modal.Root open={open}>
                      <Modal.Close onClick={() => setOpen(!open)} />
                      <Modal.Header title="Informações do Usuário" />
                      <Modal.Body>
                        <Modal.Input
                          title=""
                          value={viewUser?.email}
                          label="Email"
                          variant="outlined"
                          disabled
                        />
                        <Modal.Input
                          title=""
                          value={
                            viewUser?.service !== null
                              ? viewUser?.service
                              : 'Nenhum'
                          }
                          label="ID do Serviço"
                          variant="outlined"
                          disabled
                        />
                        <Modal.Footer>
                          {viewUser?.authorities &&
                            viewUser?.authorities.map((authority, index) => (
                              <span
                                className="block text-center text-sm text-zinc-400"
                                key={index}
                              >
                                {authority.authority.substring(5)}
                              </span>
                            ))}
                        </Modal.Footer>
                      </Modal.Body>
                    </Modal.Root>
                  </div>
                ))
              ) : (
                <div className="flex items-center bg-zinc-100 p-4">
                  <span className="grow text-zinc-700 max-w-[70%] md:max-w-[23%]">
                    -
                  </span>
                  <span className="grow text-zinc-700 hidden md:block max-w-[38%] overflow-hidden truncate">
                    -
                  </span>
                  <span className="grow text-zinc-700 hidden md:block max-w-[20%] overflow-hidden truncate">
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

export default Users
