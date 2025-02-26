import { motion } from 'framer-motion';
import { HiCalendar } from 'react-icons/hi';

function DateCard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center">
        <div className="bg-orange-500 p-3 rounded-full">
          <HiCalendar className="w-6 h-6 text-white" />
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Date</p>
          <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
            {formattedDate}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default DateCard;