import { ReactNode } from 'react'

interface ModalFooterProps {
  children: ReactNode
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="mt-4">{children}</div>
}
