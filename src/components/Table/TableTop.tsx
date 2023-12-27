import { ReactNode } from 'react'

interface TableTopProps {
  children: ReactNode
}

export const TableTop = ({ children }: TableTopProps) => {
  return (
    <div className="flex items-center justify-between py-8 px-2">
      {children}
    </div>
  )
}
