import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * custom, duration: 0.4 }
    })
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, height: 0, pointerEvents: 'none' },
    open: { 
      opacity: 1, 
      y: 0, 
      height: 'auto', 
      pointerEvents: 'auto',
      transition: { duration: 0.3 }
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-light-border dark:border-gray-700 dark:bg-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div variants={logoVariants} initial="initial" animate="animate" className="flex items-center">
              <Logo size="md" className="mr-2" />
              <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-blue-400 transition-colors duration-300">
                SoftShell
              </Link>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item, index) => (
              <motion.div 
                key={item} 
                custom={index} 
                variants={navItemVariants} 
                initial="initial" 
                animate="animate"
              >
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="text-gray-700 hover:text-primary-600 font-medium dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={navItemVariants} custom={5} initial="initial" animate="animate" className="ml-2">
              <ThemeToggle />
            </motion.div>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <motion.button 
              className="text-gray-700 dark:text-gray-200 transition-colors duration-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
          className="md:hidden overflow-hidden"
          variants={mobileMenuVariants}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item, index) => (
              <motion.div 
                key={item}
                variants={{
                  open: { opacity: 1, y: 0, transition: { delay: 0.1 * index } },
                  closed: { opacity: 0, y: -10 }
                }}
              >
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;