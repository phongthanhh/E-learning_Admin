import { BasicTabs, DialogComponent } from 'components'
import { UserNameQuery } from 'models'
import {
  memo
} from 'react'
import ApprovedCourses from './ApprovedCourses'
import UnregisteredCourses from './UnregisteredCourses'
import WaitingCourses from './WaitingCourses'

interface Props {
  open: boolean
  onClose: () => void,
  userName: UserNameQuery
}

function InfoUserModal({ open, onClose, userName }: Props) {
  const tabs = [
    {
      id: 0,
      label: 'Registered course',
      Component: <ApprovedCourses userName={userName} />
    },
    {
      id: 1,
      label: 'Unregistered course',
      Component: <UnregisteredCourses userName={userName} />
    },
    {
      id: 2,
      label: 'Waiting for approval',
      Component: <WaitingCourses userName={userName} />
    }
  ]
  return (
    <DialogComponent
      dialogProps={{ open, onClose }}
      title="User Register"
    >
      <BasicTabs tabs={tabs} />
    </DialogComponent>
  )
}

export default memo(InfoUserModal)
