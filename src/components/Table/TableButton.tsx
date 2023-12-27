import { ButtonHTMLAttributes } from 'react'

interface TableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export const TableButton = ({ text, ...rest }: TableButtonProps) => {
  return (
    <td className="text-end">
      <button
        {...rest}
        className="mr-2 px-4 py-2 bg-blue-600 text-zinc-200 text-sm rounded-lg"
      >
        {text}
      </button>
    </td>
  )
}
