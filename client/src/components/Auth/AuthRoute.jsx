import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

function AuthRoute() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/home', { replace: true });
    } else {
      setIsLoading(false);
    }
  }, [])

  return (
    <div>
      {
        isLoading ? (
          <LoadingScreen />
        ) : (
          <Outlet />
        )
      }
    </div>
  )
}

export default AuthRoute