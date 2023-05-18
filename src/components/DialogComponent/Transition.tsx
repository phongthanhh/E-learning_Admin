import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { ReactElement, forwardRef } from 'react'

interface Props extends TransitionProps {
  children: ReactElement
}

function Transition(props: Props, ref: React.Ref<unknown>) {
  return (
    <Slide direction="up" ref={ref} {...props} />
  )
}

export default forwardRef(Transition)
