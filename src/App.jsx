import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './layouts/Dashboard';
import Home from './pages/Home';
import Products from './pages/Products';
import Admins from './pages/Admins';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { checkAuth, removeToken } from './utils/auth';
import './i18n';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const validateAuth = () => {
      const isValid = checkAuth();
      setIsAuthenticated(isValid);
      
      if (!isValid) {
        removeToken();
      }
    };

    validateAuth();
    
    // Set up interval to check token validity periodically
    const interval = setInterval(validateAuth, 600000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            
            <Route path="/" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="admins" element={<Admins />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;