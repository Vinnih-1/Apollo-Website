import { ReactNode } from 'react'

interface NavbarDropdownProps {
  children: ReactNode
}

export const NavbarDropdown = ({ children }: NavbarDropdownProps) => {
  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
      {children}
    </div>
  )
}
