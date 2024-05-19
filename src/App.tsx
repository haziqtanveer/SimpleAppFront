import { Routes, Route } from "react-router-dom";


import "./App.css";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./PrivateRoute";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;