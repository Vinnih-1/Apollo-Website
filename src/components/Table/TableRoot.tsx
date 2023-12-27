import { ReactNode } from 'react'

interface TableRootProps {
  children: ReactNode
}

export const TableRoot = ({ children }: TableRootProps) => {
  return (
    <div className="max-w-5xl bg-zinc-100 mx-auto rounded-lg border border-zinc-200 mt-16">
      {children}
    </div>
  )
}
