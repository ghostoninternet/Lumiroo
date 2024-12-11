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
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritePage from "./pages/Favorite/FavoritePage";
import HomePage from "./pages/Home/HomePage";
import MapPage from "./pages/Map/MapPage";
import Landing from "./pages/Landing/Landing";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix cho marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
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
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;