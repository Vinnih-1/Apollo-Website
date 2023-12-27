import { ReactNode } from 'react'

interface TableHeaderProps {
  children: ReactNode
}

export const TableHeader = ({ children }: TableHeaderProps) => {
  return <tr className="bg-zinc-200">{children}</tr>
}
