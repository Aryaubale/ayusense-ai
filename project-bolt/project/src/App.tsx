import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthForm } from './components/Auth/AuthForm';
import AnimatedLayout from './components/Layout/AnimatedLayout';
import { AnimatePresence } from 'framer-motion';

import Dashboard from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Prakriti } from './pages/Prakriti';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { HumanPrakriti } from './pages/HumanPrakriti';
import ConsultVaidya from './pages/ConsultVaidya';
import { BookAppointment } from './pages/BookAppointment';
import { Profile } from './pages/Profile';
import SplashScreen from './components/Layout/SpashScreen';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // ✅ FIX: strict protection
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* AUTH */}
        <Route
          path="/auth"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <AuthForm onSuccess={() => {}} />
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <Dashboard />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* HUMAN PRAKRITI */}
        <Route
          path="/human-prakriti"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <HumanPrakriti />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* CONSULT */}
        <Route
          path="/consult-vaidya"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <ConsultVaidya />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* BOOK */}
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <BookAppointment />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* CHAT */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <Chat />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* PRAKRITI */}
        <Route
          path="/prakriti"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <Prakriti />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* HISTORY */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <History />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <Settings />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AnimatedLayout>
                <Profile />
              </AnimatedLayout>
            </ProtectedRoute>
          }
        />

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/auth"} replace />}
        />

      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>

          {/* 🌿 Splash Screen */}
          {showSplash && (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          )}

          {/* 🌿 Main App */}
          {!showSplash && (
            <>
              <AppRoutes />
              <Toaster position="top-right" />
            </>
          )}

        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;