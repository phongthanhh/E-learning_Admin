import { BasicTabs, DialogComponent } from 'components'
import { UserNameQuery } from 'models'
import {
  memo
} from 'react'
import ApprovedCourses from './ApprovedCourses'
import UnregisteredCourses from './UnregisteredCourses'

interface Props {
  open: boolean
  onClose: () => void,
  userName: UserNameQuery
}

function InfoUserModal({ open, onClose, userName }: Props) {
  const tabs = [
    {
      label: 'Registered course',
      Component: <ApprovedCourses userName={userName} />
    },
    {
      label: 'Unregistered course',
      Component: <UnregisteredCourses userName={userName} />
    },
    {
      label: 'Waiting for approval',
      Component: <div>helo3</div>
    }
  ]
  return (
    <DialogComponent
      dialogProps={{ open, onClose }}
      title="Course Register"
    >
      <BasicTabs tabs={tabs} />
    </DialogComponent>
  )
}

export default memo(InfoUserModal)
