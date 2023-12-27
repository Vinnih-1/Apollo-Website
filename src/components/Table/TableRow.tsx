import { ObjectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableRowProps extends ObjectHTMLAttributes<HTMLObjectElement> {
  text?: string
  texts?: string[]
  persist?: boolean
}

export const TableRow = ({
  text,
  texts,
  persist = false,
  ...rest
}: TableRowProps) => {
  return (
    <td className="py-4 text-sm text-zinc-400">
      <span
        className={twMerge(persist ? '' : 'hidden md:block', rest.className)}
      >
        {text || texts}
      </span>
    </td>
  )
}
