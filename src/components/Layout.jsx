import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ChatBox from './ChatBox';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light-background dark:from-gray-900 dark:to-gray-800 bg-subtle-pattern transition-all duration-300">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeIn}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 SoftSell. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Chat Box Component */}
      <ChatBox />
    </div>
  );
};

export default Layout;