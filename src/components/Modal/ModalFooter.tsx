import { ReactNode } from 'react'

interface ModalFooterProps {
  children: ReactNode
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="flex flex-col mt-4 gap-4">{children}</div>
}
