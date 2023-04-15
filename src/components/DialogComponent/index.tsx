import {
  Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Slide
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import {
  ReactElement, ReactNode, forwardRef, memo
} from 'react'

interface Props {
  dialogProps: DialogProps
  title: string
  children: ReactNode
  actions: ReactNode
}

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props: TransitionProps & { children: ReactElement }, ref: React.Ref<unknown>) => (<Slide direction="up" ref={ref} {...props} />))

function DialogComponent(props: Props) {
  // Props
  const {
    dialogProps, title, children, actions
  } = props
  // End props

  return (
    <Dialog
      TransitionComponent={Transition}
      {...dialogProps}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}

export default memo(DialogComponent)
