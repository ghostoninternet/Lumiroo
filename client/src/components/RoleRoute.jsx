/* eslint-disable react/prop-types */
import { Outlet, Navigate } from "react-router-dom"

function RoleRoute({ roles }) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!roles.includes(user.role)) {
    return <Navigate to={"/home"} />
  }

  return (
    <Outlet />
  )
}

export default RoleRoute