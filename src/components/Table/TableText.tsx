import { ObjectHTMLAttributes } from 'react'

interface TableTextProps extends ObjectHTMLAttributes<HTMLObjectElement> {
  text: string
}

export const TableText = ({ text, ...rest }: TableTextProps) => {
  return <span {...rest}>{text}</span>
}
