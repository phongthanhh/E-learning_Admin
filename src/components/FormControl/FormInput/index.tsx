import { TextField, TextFieldProps } from '@mui/material'
import { memo } from 'react'
import { useController, useFormContext } from 'react-hook-form'

interface IProps {
  name: string
  textFieldProps?: TextFieldProps,
}

function FormInput({ name, textFieldProps }: IProps) {
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
      variant="standard"
      {...textFieldProps}
    />
  )
}

export default memo(FormInput)
