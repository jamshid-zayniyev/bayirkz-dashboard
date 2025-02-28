import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { setToken } from '../utils/auth';
import LanguageSelector from '../components/language/LanguageSelector';

function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { darkMode } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials with an API
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      // Create a dummy token that expires in 1 hour
      const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
      const dummyToken = JSON.stringify({
        sub: '1',
        name: 'Admin User',
        email: credentials.email,
        exp: expirationTime
      });
      
      // Base64 encode the token to simulate a JWT
      const encodedToken = btoa(dummyToken);
      
      setToken(encodedToken);
      setIsAuthenticated(true);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'dark' : ''}`}>
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('auth.loginTitle')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('auth.loginSubtitle')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">{t('auth.email')}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                placeholder={t('auth.email')}
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">{t('auth.password')}</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                placeholder={t('auth.password')}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {t('auth.login')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;