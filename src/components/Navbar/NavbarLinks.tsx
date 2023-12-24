import { ReactNode } from 'react'

interface NavbarLinksProps {
  children: ReactNode
}

export const NavbarLinks = ({ children }: NavbarLinksProps) => {
  return (
    <div className="flex justify-center items-center w-0 lg:w-full lg:visible invisible">
      <div className="flex whitespace-nowrap gap-7">{children}</div>
    </div>
  )
}
