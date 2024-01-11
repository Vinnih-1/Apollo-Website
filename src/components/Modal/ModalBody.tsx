import { ObjectHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ModalBodyProps extends ObjectHTMLAttributes<HTMLObjectElement> {
  children: ReactNode
}

export const ModalBody = ({ children, ...rest }: ModalBodyProps) => {
  return (
    <div className={twMerge('flex flex-col mt-4 gap-4', rest.className)}>
      {children}
    </div>
  )
}
