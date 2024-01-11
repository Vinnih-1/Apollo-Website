import '@/app/globals.css'
import apolloIcon from '@/assets/apollo-icons/apollo-logotipo.svg'
import { useAuth } from '@/hooks/useAuth'
import AssignmentIcon from '@mui/icons-material/AssignmentRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import HomeIcon from '@mui/icons-material/HomeRounded'
import InventoryIcon from '@mui/icons-material/InventoryRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import LoyaltyIcon from '@mui/icons-material/LoyaltyRounded'
import MenuIcon from '@mui/icons-material/MenuRounded'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTipRounded'
import ReceiptIcon from '@mui/icons-material/ReceiptRounded'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccountRounded'
import ViewListIcon from '@mui/icons-material/ViewListRounded'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Sidebar = () => {
  const [location, setLocation] = useState('')
  const [openSidebar, setOpenSidebar] = useState(false)
  const validation = useAuth()
  const router = useRouter()

  useEffect(() => {
    const location = window.location.pathname.substring(1)
    setLocation(location)
  }, [])

  const sidebarMenuButton = () => {
    return (
      <button
        className="overflow-hidden fixed top-4 z-10 left-1 w-auto lg:w-0 visible lg:invisible lg:ml-0 lg:mr-0 lg:mt-0 lg:p-0 mt-8 p-4"
        onClick={() => {
          if (openSidebar) {
            closeSidebarMenu()
          } else {
            openSidebarMenu()
          }
        }}
        id="openDropdown"
      >
        {openSidebar ? (
          <CloseIcon className="fill-blue-600" />
        ) : (
          <MenuIcon className="fill-blue-600" />
        )}
      </button>
    )
  }

  const openSidebarMenu = () => {
    setOpenSidebar(true)
  }

  const closeSidebarMenu = () => {
    setOpenSidebar(false)
  }

  return (
    <>
      <div
        className={
          openSidebar
            ? 'bg-zinc-100 w-screen shadow-2xl fixed top-0 z-10 h-screen'
            : 'bg-zinc-200 lg:w-64 shadow-2xl hidden sticky z-10 top-0 lg:block h-screen'
        }
      >
        <div className="flex flex-col h-screen overflow-y-auto">
          <div className="pt-12">
            <Link href="/">
              <Image
                src={apolloIcon}
                width={40}
                height={40}
                alt="Logotipo da Apollo"
                className="mx-auto"
              />
            </Link>
          </div>
          <div className="flex flex-col ml-4 mt-16 justify-center divide-y divide-zinc-400">
            <button
              className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
              onClick={() => {
                router.push('/dashboard')
              }}
            >
              <HomeIcon
                className={
                  location === 'dashboard'
                    ? '!fill-blue-600 text-3xl'
                    : '!fill-zinc-600 text-3xl'
                }
              />
              <span className="text-zinc-400">Dashboard</span>
            </button>
            <button
              className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
              onClick={() => {
                router.push('/dashboard/products')
              }}
            >
              <InventoryIcon
                className={
                  location.match('dashboard/products')
                    ? '!fill-blue-600 text-3xl'
                    : '!fill-zinc-600 text-3xl'
                }
              />
              <span className="text-zinc-400">Produtos</span>
            </button>
            <button
              className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
              onClick={() => {
                router.push('/dashboard/coupons')
              }}
            >
              <LoyaltyIcon
                className={
                  location.match('dashboard/coupons')
                    ? '!fill-blue-600 text-3xl'
                    : '!fill-zinc-600 text-3xl'
                }
              />
              <span className="text-zinc-400">Cupons</span>
            </button>
            <button
              className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
              onClick={() => {
                router.push('/dashboard/sales')
              }}
            >
              <ReceiptIcon
                className={
                  location.match('dashboard/sales')
                    ? '!fill-blue-600 text-3xl'
                    : '!fill-zinc-600 text-3xl'
                }
              />
              <span className="text-zinc-400">Vendas</span>
            </button>
            <button
              className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
              onClick={() => {
                router.push('/dashboard/service')
              }}
            >
              <PrivacyTipIcon
                className={
                  location.match('dashboard/service')
                    ? '!fill-blue-600 text-3xl'
                    : '!fill-zinc-600 text-3xl'
                }
              />
              <span className="text-zinc-400">Segurança</span>
            </button>
            {validation.authorities.some(
              (auth) => auth.authority === 'ROLE_ADMIN',
            ) ? (
              <>
                <button
                  className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
                  onClick={() => {
                    router.push('/dashboard/users')
                  }}
                >
                  <SupervisorAccountIcon
                    className={
                      location.match('dashboard/users')
                        ? '!fill-blue-600 text-3xl'
                        : '!fill-zinc-600 text-3xl'
                    }
                  />
                  <span className="text-zinc-400">Usuários</span>
                </button>
                <button
                  className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
                  onClick={() => {
                    router.push('/dashboard/plans')
                  }}
                >
                  <AssignmentIcon
                    className={
                      location.match('dashboard/plans')
                        ? '!fill-blue-600 text-3xl'
                        : '!fill-zinc-600 text-3xl'
                    }
                  />
                  <span className="text-zinc-400">Planos</span>
                </button>
                <button
                  className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
                  onClick={() => {
                    router.push('/dashboard/orders')
                  }}
                >
                  <ViewListIcon
                    className={
                      location.match('dashboard/orders')
                        ? '!fill-blue-600 text-3xl'
                        : '!fill-zinc-600 text-3xl'
                    }
                  />
                  <span className="text-zinc-400">Pedidos</span>
                </button>
              </>
            ) : (
              <></>
            )}
            <button
              className="flex items-center gap-4 py-4 hover:brightness-50 duration-300"
              onClick={() => {
                router.replace('/')
                validation.logout()
              }}
            >
              <LogoutRoundedIcon
                className={
                  location.match('dashboard/service')
                    ? '!fill-blue-600 text-3xl'
                    : '!fill-zinc-600 text-3xl'
                }
              />
              <span className="text-zinc-400">Sair</span>
            </button>
          </div>
          <div className="flex justify-center items-end h-full">
            <span className="text-sm text-zinc-400 font-light mb-4">
              v2024.0111.0
            </span>
          </div>
        </div>
      </div>
      <div>{sidebarMenuButton()}</div>
    </>
  )
}
