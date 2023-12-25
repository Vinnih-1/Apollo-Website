import CloseIcon from '@mui/icons-material/CloseRounded'
import { ButtonHTMLAttributes } from 'react'

type ModalCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ModalClose = ({ ...rest }: ModalCloseProps) => {
  return (
    <button {...rest}>
      <CloseIcon className="absolute top-2 right-2 !fill-blue-600" />
    </button>
  )
}
