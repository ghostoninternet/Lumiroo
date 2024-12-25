import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout/MainLayout";
import SignIn from "./pages/Auth/SignIn/SignIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import PlaygroundRecommendation from "./pages/Playground/PlaygroundRecommendation";
import PlaygroundDetail from "./pages/Playground/PlaygroundDetail";
import ProfilePage from "./pages/User/ProfilePage";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword.jsx"; 
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritePage from "./pages/Favorite/FavoritePage";
import HomePage from "./pages/Home/HomePage";
import MapPage from "./pages/Map/MapPage";
import Landing from "./pages/Landing/Landing";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import LoadingScreen from "./components/LoadingScreen";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import PlaygroundManagement from "./pages/Admin/PlaygroundManagement/PlaygroundManagement";
import PlaygroundAdd from './pages/Admin/PlaygroundManagement/components/PlaygroundAdd/index';
import AuthRoute from './components/Auth/AuthRoute';
import AdminPlaygroundDetail from './pages/Admin/PlaygroundManagement/components/PlaygroundDetail/index';
import UserManagement from './pages/Admin/Dashboard/UserManagement/UserManagement.jsx';
import UserDetail from './pages/Admin/Dashboard/UserManagement/components/UserDetail/index.jsx';

import RoleRoute from './components/RoleRoute';
import { ROLE } from './constants';

import AttractionManagement from './pages/Admin/AttractionManagement/index.jsx';
import { pingServer } from './apis/ping.js';
import { useEffect } from 'react';

// Fix cho marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function App() {
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      const pingResult = pingServer()
      console.log(pingResult)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route element={<AuthRoute />}>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/auth/reset-password" element={<ResetPassword />} /> 
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Main Layout Routes */}
          
          <Route element={<MainLayout />}>
            {/* Home Routes */}
            <Route path="/home" element={<HomePage />} />
            
            {/* Playground Routes */}
            <Route path="/playground-recommendation" element={<PlaygroundRecommendation />} />
            <Route path="/playground/:id" element={<PlaygroundDetail />} />
            
            {/* User Routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            
            {/* Map Route */}
            <Route path="/map" element={<MapPage />} />
          </Route>

          {/* Admin Layout Routes */}
          <Route element={<RoleRoute roles={[ROLE.ADMIN]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            
            {/* Playground Management Routes */}
              <Route path="playgrounds">
                <Route index element={<PlaygroundManagement />} />
                <Route path="add" element={<PlaygroundAdd />} />
                <Route path=":id">
                  <Route index element={<AdminPlaygroundDetail />} />  {/* Sử dụng component admin */}
                </Route>
            </Route>
            
            
            {/* Other Admin Routes */}
            <Route path="users">
              <Route index element={<UserManagement />} />
              <Route path=":id" element={<UserDetail />} />
            </Route>
            <Route path="attractions" element={<AttractionManagement />} />

            </Route>
          </Route>
        </Route>

        {/* Utility Routes */}
        <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
