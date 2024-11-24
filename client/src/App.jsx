import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import SignIn from './pages/Auth/SignIn/SignIn'
import SignUp from './pages/Auth/SignUp/SignUp'
import PlaygroundRecommendation from './pages/PlaygroundRecommendation/PlaygroundRecommendation'
import AdminLayout from './layouts/AdminLayout/AdminLayout'

function App() {
  return (
    <Routes>
      <Route path='/auth/sign-in' element={<SignIn />} />
      <Route path='/auth/sign-up' element={<SignUp />} />
      <Route path='/' element={<MainLayout />}>
        <Route path='/playground-recommendation' element={<PlaygroundRecommendation />} />
      </Route>
    </Routes>
  )
}

export default App
