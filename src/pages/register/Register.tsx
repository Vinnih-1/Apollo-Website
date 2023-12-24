import '@/app/globals.css'
import icon from '@/assets/apollo-icons/apollo-isologo.svg'
import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Footer } from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar'
import { useAuth } from '@/hooks/useAuth'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import MenuIcon from '@mui/icons-material/Menu'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface AuthProps {
  email: string
  password: string
  authenticating: boolean
  isFailed: boolean
}

const Register = () => {
  const [auth, setAuth] = useState<AuthProps>({
    email: '',
    password: '',
    authenticating: false,
    isFailed: false,
  })
  const router = useRouter()
  const validation = useAuth()
  const registerUrl = process.env.NEXT_PUBLIC_AUTH_REGISTER as string

  useEffect(() => {
    if (validation.isValid) {
      router.push('/dashboard')
    }
  })

  const handleAccountRegister = async () => {
    const element = document.getElementById(
      'registerButton',
    ) as HTMLButtonElement

    try {
      const response = await axios.post(registerUrl, {
        email: auth.email,
        password: auth.password,
      })

      if (response.status === 200) {
        router.push('/login')
      }
    } catch (e) {
      element.classList.remove('bg-blue-600')
      element.classList.add('bg-red-600')
      setAuth((prevState) => ({
        ...prevState,
        isFailed: true,
      }))
    }
  }

  return (
    <div className="bg-zinc-100">
      <div className="flex justify-between bg-sky-700 w-full py-2 px-5 md:px-20">
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
      <Navbar.Root icon={icon}>
        <Navbar.Links>
          <Navbar.Link text="Início" url="/" />
          <Navbar.Link text="Planos" url="/planos" />
          <Navbar.Link text="Parceiros" url="/parceiros" />
          <Navbar.Link text="Suporte" url="/suporte" />
        </Navbar.Links>
        <Navbar.Actions>
          <Navbar.Link text="Registrar" url="/register" />
          <Navbar.Button
            text="Minha conta"
            onClick={() => {
              router.push('/login')
            }}
          />
          <Navbar.Toggler icon={MenuIcon} id="openDropdown" />
        </Navbar.Actions>
      </Navbar.Root>
      <div className="flex flex-col items-center gap">
        <AdminPanelSettingsIcon className="text-8xl fill-blue-600 my-8" />
        <div className="max-w-md bg-white border-2 w-full h-auto rounded-xl">
          <div className="flex flex-col items-center">
            <h1 className="text-blue-600 font-bold text-4xl my-8">Register</h1>
            <div className="flex flex-col gap-12 w-full px-16">
              <div>
                <span className="block text-zinc-400 font-light text-sm">
                  Insira seu Email
                </span>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  className="rounded-xl mt-2"
                  value={auth.email}
                  onChange={(e) => {
                    setAuth((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }}
                />
              </div>
              <div>
                <span className="block text-zinc-400 font-light text-sm">
                  Insira sua Senha
                </span>
                <TextField
                  id="outlined-basic"
                  label="Senha"
                  variant="outlined"
                  fullWidth
                  type="password"
                  className="rounded-xl mt-2"
                  value={auth.password}
                  onChange={(e) => {
                    setAuth((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
            <span
              className={
                auth.isFailed
                  ? 'text-red-300 font-thin text-sm mt-4'
                  : 'invisible'
              }
            >
              Há algo de errado com este email. Vefique se ele é válido.
            </span>
            <button
              type="button"
              id="registerButton"
              className="py-6 md:py-3 bg-blue-600 rounded w-40 text-white text-sm my-16"
              onClick={() => {
                setAuth((prevState) => ({
                  ...prevState,
                  authenticating: true,
                }))
                handleAccountRegister()
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register
