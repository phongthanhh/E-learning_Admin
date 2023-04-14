import { Box, Button, ButtonProps } from '@mui/material'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { memo, useMemo } from 'react'
import { StyledActionsWrapper, StyledContainer } from './styled'

interface ButtonAction extends ButtonProps {
  text: string
}

interface Props {
  actions?: ButtonAction[]
  dataGridProps: DataGridProps
}

function Table(props: Props) {
  // Props
  const { actions = [], dataGridProps } = props
  // End props

  const renderActions = useMemo(
    () => actions.map((action) => (
      <Button
        key={action.text}
        variant="contained"
        color="success"
        {...action}
      >
        {action.text}
      </Button>
    )),
    [actions]
  )

  return (
    <StyledContainer>
      <StyledActionsWrapper>
        {renderActions}
      </StyledActionsWrapper>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid paginationMode="server" {...dataGridProps} />
      </Box>
    </StyledContainer>
  )
}

export default memo(Table)
