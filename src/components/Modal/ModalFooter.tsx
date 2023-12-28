import { ObjectHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ModalFooterProps extends ObjectHTMLAttributes<HTMLObjectElement> {
  children: ReactNode
}

export const ModalFooter = ({ children, ...rest }: ModalFooterProps) => {
  return (
    <div className={twMerge('flex flex-col mt-4 gap-4', rest.className)}>
      {children}
    </div>
  )
}
