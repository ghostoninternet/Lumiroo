import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user')

  if (!user) {
    navigate('/auth/sign-in')
  }

  return (
    <div><Outlet /></div>
  )
}

export default ProtectedRoute