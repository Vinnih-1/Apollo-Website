import { TextField } from '@mui/material'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

export const ModalNumericInput = ({ title, ...rest }: NumericFormatProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-zinc-400 text-sm font-light">{title}</span>
      <NumericFormat
        valueIsNumericString={true}
        allowNegative={false}
        customInput={TextField}
        {...rest}
      />
    </div>
  )
}
