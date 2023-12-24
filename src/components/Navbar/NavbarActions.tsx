import { ReactNode } from 'react'

interface NavbarActionsProps {
  children: ReactNode
}

export const NavbarActions = ({ children }: NavbarActionsProps) => {
  return (
    <div className="flex lg:gap-10 items-center justify-center mr-4 lg:visible invisible">
      <div className="flex items-center justify-center lg:gap-5">
        {children}
      </div>
    </div>
  )
}
