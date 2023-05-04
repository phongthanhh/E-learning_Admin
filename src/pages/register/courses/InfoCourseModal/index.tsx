import { Button } from '@mui/material'
import {
  BasicTabs, DialogComponent
} from 'components'
import { CourseQuery } from 'models'
import {
  memo, useMemo
} from 'react'
import RegisteredUser from './RegisteredUser'
import UnregisteredUser from './UnregisteredUser'
import WaitingUsers from './WaitingUsers'

interface Props {
  open: boolean
  onClose: () => void,
}
let courseCode: CourseQuery

function InfoCourseModal(props: Props) {
  if (localStorage.getItem('courseCode')) {
    courseCode = JSON.parse(localStorage.getItem('courseCode') || '{}')
  }
  const tabs = [
    {
      id: 0,
      label: 'Registered users',
      Component: <RegisteredUser courseCode={courseCode} />
    },
    {
      id: 1,

      label: 'Unregistered users',
      Component: <UnregisteredUser courseCode={courseCode} />
    },
    {
      id: 2,
      label: 'Waiting for approval',
      Component: <WaitingUsers courseCode={courseCode} />
    }
  ]
  const { open, onClose } = props

  const actions = useMemo(() => (
    <Button onClick={onClose}>Cancel</Button>
  ), [onClose])

  return (
    <DialogComponent
      dialogProps={{ open, onClose }}
      title="Course Register"
      actions={actions}
    >
      <BasicTabs tabs={tabs} />
    </DialogComponent>
  )
}

export default memo(InfoCourseModal)
