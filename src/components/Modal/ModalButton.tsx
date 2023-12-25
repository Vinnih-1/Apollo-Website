import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const ModalButton = ({ children, ...rest }: ModalButtonProps) => {
  return (
    <button
      {...rest}
      className="py-2 px-4 bg-blue-600 text-zinc-200 text-sm rounded-lg"
    >
      {children}
    </button>
  )
}
