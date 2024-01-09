import { ButtonHTMLAttributes } from 'react'

interface NavbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export const NavbarButton = ({ text, ...rest }: NavbarButtonProps) => {
  return (
    <button
      {...rest}
      className="bg-blue-800 text-sm text-white whitespace-nowrap rounded-lg px-0 py-0 w-0 lg:w-full lg:px-5 lg:py-2"
    >
      {text}
    </button>
  )
}
