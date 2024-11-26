import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout/MainLayout";
import SignIn from "./pages/Auth/SignIn/SignIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import PlaygroundRecommendation from "./pages/Playground/PlaygroundRecommendation";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Route cho trang Sign In */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        {/* Route cho trang Sign Up */}
        <Route path="/auth/sign-up" element={<SignUp />} />
        {/* Route cho layout chính */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route
              path="/playground-recommendation"
              element={<PlaygroundRecommendation />}
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
