import { useEffect, useState } from "react"
import { signIn } from "../../../apis/auth"

function SignIn() {
  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = async () => {
    try {
      const response = await signIn({ email: 'example@email.com', password: '123' })
      const data = response.data
      setUserInfo(data)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div>
      {
        userInfo
          ? (
            <div>
              <p className="text-2xl text-purple-400">{userInfo.email}</p>
              <p className="text-xl text-red-400">{userInfo.password}</p>
            </div>
          )
          : (
            <div>SignIn</div>
          )
      }
    </div>
  )
}

export default SignIn