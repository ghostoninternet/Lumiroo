import { useNavigate, Outlet } from "react-router-dom";
rfce
function ProtectedRoute() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user')
  console.log(user)
  if (!user) {
    navigate('/auth/sign-in')
    return null
  }

  return (
    <div><Outlet /></div>
  )
}

export default ProtectedRoute