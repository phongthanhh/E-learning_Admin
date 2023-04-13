import { TextField, TextFieldProps } from '@mui/material'
import { memo } from 'react'
import { useController, useFormContext } from 'react-hook-form'

interface IProps {
  name: string
  textFieldProps?: TextFieldProps,
  disabled?:boolean
}

function FormInput({ name, textFieldProps, disabled }: IProps) {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control })
  return (
    <TextField
      value={value}
      onChange={onChange}
      error={Boolean(error?.message)}
      helperText={error?.message}
      fullWidth
      disabled={disabled}
      variant="standard"
      {...textFieldProps}
    />
  )
}

export default memo(FormInput)
