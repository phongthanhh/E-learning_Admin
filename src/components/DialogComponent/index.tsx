import {
  Dialog, DialogActions, DialogContent, DialogProps, DialogTitle
} from '@mui/material'
import { ReactNode, memo } from 'react'
import styled from 'styled-components'
import Transition from './Transition'

export const StyledDialog = styled.div`
  .MuiPaper-elevation {}
`

interface Props {
  dialogProps: DialogProps
  title: string
  children: ReactNode
  actions?: ReactNode
}

function DialogComponent(props: Props) {
  // Props
  const {
    dialogProps, title, children, actions
  } = props
  // End props

  return (
    <StyledDialog>
      <Dialog
        TransitionComponent={Transition}
        {...dialogProps}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </StyledDialog>
  )
}

export default memo(DialogComponent)
