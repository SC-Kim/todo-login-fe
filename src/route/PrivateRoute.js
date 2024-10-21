import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({user, children}) => {
    // console.log("user info: ", user)
  return (
    user? children:<Navigate to="/login" />
  )
}

// user 값이 있으면? todo page : redirect to /login

export default PrivateRoute