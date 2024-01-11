import { ObjectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ModalTextProps extends ObjectHTMLAttributes<HTMLObjectElement> {
  text?: string
}

export const ModalText = ({ text, ...rest }: ModalTextProps) => {
  return <span className={twMerge('', rest.className)}>{text}</span>
}
