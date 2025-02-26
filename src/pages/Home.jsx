import { motion } from 'framer-motion';
import StatsContainer from '../components/stats/StatsContainer';

function Home() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to the Bayir Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This is your central hub for managing your application. Use the navigation menu to access different sections.
        </p>
      </motion.div>

      <StatsContainer />
    </div>
  );
}

export default Home;