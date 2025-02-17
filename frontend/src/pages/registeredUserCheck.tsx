import React from 'react'
import RegisteredUsersTable from '../components/registeredUsersTable'

const RegisteredUserCheck = () => {
  return (
    <>
      <div className="w-screen h-screen bg-neutral-700 flex justify-center items-center">
        <RegisteredUsersTable />
      </div>
    </>
  )
}

export default RegisteredUserCheck