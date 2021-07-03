import React, { useState } from 'react'
import UserProfile from '../../../components/setting/profile'
import ChangePassword from '../../../components/setting/profile/password'

const Profile: React.FC = () => {
  const [changePassword, setChangePassword] = useState<Boolean>(false)

  if (changePassword) {
    return <ChangePassword onChangePassword={setChangePassword} />
  }

  return <UserProfile onChangePassword={setChangePassword} />
}

export default Profile
