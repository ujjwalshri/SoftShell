import { motion } from 'framer-motion';
import { staggerContainer, slideInFromLeft, slideInFromRight, fadeIn, scaleUp, useAnimateOnScroll } from '../utils/animations';

const HeroSection = () => {
  const { ref: heroRef, isInView: heroInView } = useAnimateOnScroll(0.1);
  const { ref: imageRef, isInView: imageInView } = useAnimateOnScroll(0.2);

  return (
    <div className="bg-gradient-to-b from-light-surface via-light-accent to-light-background dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Hero Text Content */}
          <motion.div 
            ref={heroRef}
            className="mx-auto max-w-md sm:max-w-2xl sm:text-center lg:text-left lg:flex lg:items-center"
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <div>
              <motion.h1 
                className="text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white sm:text-5xl md:text-6xl transition-colors duration-300"
                variants={slideInFromLeft}
              >
                <motion.span className="block mb-2" variants={slideInFromLeft}>Maximize the Value of</motion.span>
                <motion.span className="block text-primary-600 dark:text-blue-400 transition-colors duration-300" variants={slideInFromLeft}>Your Software Licenses</motion.span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-base text-gray-600 dark:text-gray-300 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0 transition-colors duration-300"
                variants={fadeIn}
              >
                Transform unused software licenses into immediate revenue. Our platform connects you with buyers, handles compliance, and ensures secure transactions for your unused or excess software assets.
              </motion.p>
              
              <motion.div 
                className="mt-8 sm:flex sm:justify-center lg:justify-start"
                variants={staggerContainer}
              >
                <motion.div 
                  className="rounded-md shadow-md"
                  variants={scaleUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-sm hover:shadow"
                  >
                    Sell My Licenses
                  </a>
                </motion.div>
                
                <motion.div 
                  className="mt-3 sm:mt-0 sm:ml-3"
                  variants={scaleUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-primary-200 text-base font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 dark:text-blue-100 dark:bg-blue-800 dark:hover:bg-blue-700 dark:border-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-sm hover:shadow"
                  >
                    Get a Quote
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div 
            ref={imageRef}
            className="mt-12 sm:mt-16 lg:mt-0"
            variants={slideInFromRight}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
          >
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <div className="w-full">
                <div className="h-56 w-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-soft sm:h-72 md:h-96 flex items-center justify-center p-8 transition-colors duration-300 overflow-hidden border border-primary-200 dark:border-blue-700">
                  <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" className="text-primary-600 dark:text-blue-400" />
                      </svg>
                    </div>

                    {/* Main icon with animation */}
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-32 h-32 text-primary-600 dark:text-blue-300 opacity-80 transition-colors duration-300 z-10"
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 8, 
                        ease: "easeInOut", 
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>

                    {/* Floating elements */}
                    <motion.div 
                      className="absolute -top-4 -right-4 w-12 h-12 bg-primary-300 dark:bg-blue-700 rounded-full z-0"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary-200 dark:bg-green-700 rounded-full z-0"
                      animate={{
                        y: [0, 10, 0],
                        opacity: [0.5, 0.7, 0.5]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                    <motion.div 
                      className="absolute top-1/4 -left-10 w-8 h-8 bg-secondary-300 dark:bg-purple-700 rounded-full z-0"
                      animate={{
                        x: [0, 15, 0],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;