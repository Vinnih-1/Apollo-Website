import { ReactNode } from 'react'

interface ModalBodyProps {
  children: ReactNode
}

export const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="flex flex-col mt-4 gap-4">{children}</div>
}
