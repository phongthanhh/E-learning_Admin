import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { memo } from 'react'

interface IProps {
  dataGridProps: DataGridProps
}

function Table(props: IProps) {
  // Props
  const { dataGridProps } = props
  // End props

  return (
    <DataGrid paginationMode="server" {...dataGridProps} />
  )
}

export default memo(Table)
