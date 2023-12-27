import { ReactNode } from 'react'

interface TableDataProps {
  children: ReactNode
}

export const TableData = ({ children }: TableDataProps) => {
  return <tr>{children}</tr>
}
