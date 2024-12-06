import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout/MainLayout";
import SignIn from "./pages/Auth/SignIn/SignIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import PlaygroundRecommendation from "./pages/Playground/PlaygroundRecommendation";
import PlaygroundDetail from "./pages/Playground/PlaygroundDetail";
import ProfilePage from "./pages/User/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritePage from "./pages/Favorite/FavoritePage";
import HomePage from "./pages/Home/HomePage";
import MapPage from "./pages/Map/MapPage";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Route cho trang Sign In */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        {/* Route cho trang Sign Up */}
        <Route path="/auth/sign-up" element={<SignUp />} />
        {/* Route được bảo vệ */}
        <Route element={<ProtectedRoute />}>
          {/* Main Layout */}
          <Route path="/" element={<MainLayout />}>
            {/* Các route con */}
            {/* Trang chủ */}
            <Route path="home" element={<HomePage />} />
            <Route
              path="playground-recommendation"
              element={<PlaygroundRecommendation />}
            />
            {/* Trang chi tiết khu vui chơi */}
            <Route path="playground/:id" element={<PlaygroundDetail />} />
            {/* user profile */}
            <Route path="user-profile" element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="map" element={<MapPage />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout/MainLayout";
import SignIn from "./pages/Auth/SignIn/SignIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import PlaygroundRecommendation from "./pages/Playground/PlaygroundRecommendation";
import ProfilePage from "./pages/User/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritePage from "./pages/Favorite/FavoritePage";
import HomePage from "./pages/Home/HomePage";
import MapPage from "./pages/Map/MapPage";
function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Route cho trang Sign In */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        {/* Route cho trang Sign Up */}
        <Route path="/auth/sign-up" element={<SignUp />} />
        {/* Route được bảo vệ */}
        <Route element={<ProtectedRoute />}>
          {/* Main Layout */}
          <Route path="/" element={<MainLayout />}>
            
            {/* Các route con */}
            {/* Trang chủ */}
            <Route path="home" element={<HomePage/>} />
            <Route path="playground-recommendation" element={<PlaygroundRecommendation />} />
            {/* user profile */}
            <Route path="user-profile" element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritePage />} />
            <Route path="map" element={<MapPage />} />

          
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
