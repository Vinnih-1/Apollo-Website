import { ObjectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableColumnProps extends ObjectHTMLAttributes<HTMLObjectElement> {
  text: string
  persist?: boolean
}
export const TableColumn = ({
  text,
  persist = false,
  ...rest
}: TableColumnProps) => {
  return (
    <th className={twMerge('py-2 text-start', rest.className)}>
      <span
        className={
          persist
            ? 'ml-2 font-medium mr-2'
            : 'mr-2 ml-2 font-medium hidden md:block'
        }
      >
        {text}
      </span>
    </th>
  )
}
