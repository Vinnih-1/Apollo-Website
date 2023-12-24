import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import HandshakeIcon from '@mui/icons-material/Handshake'
import HomeIcon from '@mui/icons-material/Home'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { ButtonHTMLAttributes, ElementType, useEffect, useState } from 'react'
import { Navbar } from '.'

interface NavbarTogglerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType
}

export const NavbarToggler = ({ icon: Icon, ...rest }: NavbarTogglerProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (target.id !== 'openDropdown') {
        setDropdownOpen(false)
      } else {
        setDropdownOpen(true)
      }
    }
    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  })

  return (
    <div>
      <button
        className="overflow-hidden w-auto lg:w-0 visible lg:invisible lg:ml-0 lg:mr-0 lg:p-0 p-9"
        onClick={() => {
          setDropdownOpen(!dropdownOpen)
        }}
        id="openDropdown"
      >
        <Icon {...rest} />
      </button>
      <Navbar.DropdownRoot
        className={dropdownOpen ? 'visible' : 'lg:invisible'}
      >
        <Navbar.Dropdown>
          <Navbar.DropdownIcon icon={HomeIcon} />
          <Navbar.DropdownItem
            title="Início"
            url="/"
            description="Vá para a página principal"
          />
        </Navbar.Dropdown>
        <Navbar.Dropdown>
          <Navbar.DropdownIcon icon={AddBusinessIcon} />
          <Navbar.DropdownItem
            title="Planos"
            url="/planos"
            description="Adquira nossos serviços"
          />
        </Navbar.Dropdown>
        <Navbar.Dropdown>
          <Navbar.DropdownIcon icon={HandshakeIcon} />
          <Navbar.DropdownItem
            title="Parceiros"
            url="/parceiros"
            description="Conheça os nossos parceiros"
          />
        </Navbar.Dropdown>
        <Navbar.Dropdown>
          <Navbar.DropdownIcon icon={SupportAgentIcon} />
          <Navbar.DropdownItem
            title="Suporte"
            url="/suporte"
            description="Acesse nosso canal de suporte"
          />
        </Navbar.Dropdown>
        <Navbar.Dropdown>
          <Navbar.DropdownIcon icon={PersonAddIcon} />
          <Navbar.DropdownItem
            title="Registrar"
            url="/register"
            description="Caso ainda não tenha uma conta"
          />
        </Navbar.Dropdown>
        <Navbar.Dropdown>
          <Navbar.DropdownIcon icon={AdminPanelSettingsIcon} />
          <Navbar.DropdownItem
            title="Autenticar"
            url="/login"
            description="Para ter acesso ao seu serviço"
          />
        </Navbar.Dropdown>
      </Navbar.DropdownRoot>
    </div>
  )
}
