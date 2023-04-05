import { MenuItem, TextField, TextFieldProps } from '@mui/material'
import { IOption } from 'models'
import { memo } from 'react'
import { useController, useFormContext } from 'react-hook-form'

interface IProps {
  name: string
  options: IOption[]
  textFieldProps?: TextFieldProps
}

function FormSelect({ name, options, textFieldProps }: IProps) {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control })
  return (
    <TextField
      select
      value={value}
      onChange={onChange}
      error={Boolean(error?.message)}
      helperText={error?.message}
      fullWidth
      variant="standard"
      {...textFieldProps}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default memo(FormSelect)
