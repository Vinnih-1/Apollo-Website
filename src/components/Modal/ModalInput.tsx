import { OutlinedTextFieldProps, TextField } from '@mui/material'

interface ModalInputProps extends OutlinedTextFieldProps {
  title: string
  label: string
}

export const ModalInput = ({ title, label, ...rest }: ModalInputProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-zinc-400 text-sm font-light">{title}</span>
      <TextField
        id="outlined-basic"
        label={label}
        className="rounded-xl"
        {...rest}
      />
    </div>
  )
}
