import { TextField, TextFieldProps } from '@mui/material'
import { memo } from 'react'
import { useController, useFormContext } from 'react-hook-form'

interface IProps {
  name: string
  inputFieldProps?: TextFieldProps
}

function InputField({ name, inputFieldProps }: IProps) {
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
      {...inputFieldProps}
    />
  )
}

export default memo(InputField)
