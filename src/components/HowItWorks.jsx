import React from 'react';
import { motion } from 'framer-motion';
import { howItWorksSteps } from '../utils/dummyData';
import Icon from './Icon';
import { useAnimateOnScroll } from '../utils/animations';

const HowItWorks = () => {
  const { ref, isInView } = useAnimateOnScroll(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Turning your unused licenses into cash is simple with SoftSell.
          </p>
        </motion.div>

        {/* Timeline design for steps */}
        <motion.div
          ref={ref}
          className="relative max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
          
          {howItWorksSteps.map((step, index) => (
            <motion.div 
              key={step.id}
              className={`relative md:grid md:grid-cols-2 md:gap-8 mb-16 last:mb-0 ${index % 2 === 0 ? '' : 'md:rtl'}`}
              variants={itemVariants}
            >
              {/* Content for each step */}
              <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl z-10 md:mt-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left md:rtl:text-right md:col-start-2'}`}>
                <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} mb-4`}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <span className="text-white text-2xl font-bold">{step.id}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>
                <motion.div 
                  className="mt-4 bg-blue-50 dark:bg-blue-900 rounded-lg p-4 transition-colors duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                >
                  <div className="flex items-center">
                    <Icon type={step.icon} color={step.color} size="md" />
                    <span className="ml-2 font-medium text-blue-700 dark:text-blue-300 transition-colors duration-300">
                      {index === 0 ? "Upload your license file securely" : 
                       index === 1 ? "Get instant AI-powered valuation" :
                       "Receive funds within 48 hours"}
                    </span>
                  </div>
                </motion.div>
              </div>
              
              {/* Visual elements */}
              <div className={`relative hidden md:flex md:items-center md:justify-center ${index % 2 === 0 ? 'md:justify-start md:col-start-2' : 'md:justify-end'}`}>
                <motion.div 
                  className="relative w-56 h-56"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Decorative gradient circle behind icon */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 opacity-70 transition-colors duration-300" />
                  
                  {/* Orbit animation */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Orbit elements */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full" />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full" />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full" />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full" />
                  </motion.div>
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="flex items-center justify-center w-24 h-24 bg-white dark:bg-gray-700 rounded-full shadow-xl border-4 border-white dark:border-gray-600 transition-colors duration-300"
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" 
                      }}
                    >
                      <Icon type={step.icon} color={step.color} size="lg" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-auto md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-gray-800 shadow-md z-20" />
              </div>
              
              {/* Mobile version icon - visible only on small screens */}
              <div className="flex md:hidden justify-center mt-6 mb-10">
                <motion.div 
                  className="flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-700 rounded-full shadow-xl border-4 border-blue-100 dark:border-gray-600 transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" 
                  }}
                >
                  <Icon type={step.icon} color={step.color} size="lg" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;