import { ROUTES_NAME, Storage, USER_URL } from 'constant'
import { useEffect } from 'react'

function RequestSignOut() {
  useEffect(() => {
    localStorage.removeItem(Storage.ACCESS_TOKEN)
    localStorage.removeItem(Storage.USER_LOGIN)
    window.location.replace(`${USER_URL}${ROUTES_NAME.REQUEST_SIGN_OUT}`)
  }, [])

  return null
}

export default RequestSignOut
