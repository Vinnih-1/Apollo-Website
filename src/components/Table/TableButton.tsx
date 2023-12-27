import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const TableButton = ({ children, ...rest }: TableButtonProps) => {
  return (
    <td className={twMerge('text-end', rest.className)}>
      <button
        {...rest}
        className={twMerge(
          'px-4 py-2 bg-blue-600 text-zinc-200 text-sm rounded-lg',
          rest.className,
        )}
      >
        {children}
      </button>
    </td>
  )
}
