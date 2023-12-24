import { ElementType } from 'react'

interface NavbarDropdownIconProps {
  icon: ElementType
}

export const NavbarDropdownIcon = ({ icon: Icon }: NavbarDropdownIconProps) => {
  return (
    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
      <Icon />
    </div>
  )
}
