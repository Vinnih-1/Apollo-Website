import { Modal } from '@mui/material'
import { ReactNode } from 'react'

interface ModalRootProps {
  children: ReactNode
  open: boolean
}

export const ModalRoot = ({ children, open }: ModalRootProps) => {
  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="relative flex flex-col items-center grow justify-center max-w-sm bg-zinc-100 rounded-lg p-4">
          {children}
        </div>
      </div>
    </Modal>
  )
}
