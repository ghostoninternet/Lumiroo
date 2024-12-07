import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
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
        {/* Authentication Routes */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Main Layout */}
          <Route path="/" element={<MainLayout />}>
            {/* Home Routes */}
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            
            {/* Playground Routes */}
            <Route path="playground-recommendation" element={<PlaygroundRecommendation />} />
            <Route path="playground/:id" element={<PlaygroundDetail />} />
            
            {/* User Routes */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritePage />} />
            
            {/* Map Route */}
            <Route path="map" element={<MapPage />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;