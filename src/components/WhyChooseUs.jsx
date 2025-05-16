import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whyChooseUsReasons } from '../utils/dummyData';
import Icon from './Icon';
import { useAnimateOnScroll } from '../utils/animations';

const WhyChooseUs = () => {
  const { ref, isInView } = useAnimateOnScroll(0.1);
  const [activeFeature, setActiveFeature] = useState(null);
  const [hoverFeature, setHoverFeature] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 50,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.98,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 10
      }
    }
  };

  // Particle animation for background
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-primary-300 dark:bg-blue-600 opacity-30"
        initial={{ 
          x: Math.random() * 100 - 50 + "%", 
          y: Math.random() * 100 - 50 + "%",
          scale: Math.random() * 0.3 + 0.1
        }}
        animate={{ 
          x: [null, Math.random() * 100 - 50 + "%"],
          y: [null, Math.random() * 100 - 50 + "%"]
        }}
        transition={{ 
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{ 
          width: `${Math.random() * 30 + 10}px`,
          height: `${Math.random() * 30 + 10}px`,
        }}
      />
    ));
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-light-surface via-light-accent to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-all duration-500">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-30">
        {generateParticles(15)}
      </div>
      
      {/* Background gradient blur effect */}
      <div className="absolute inset-0 bg-light-surface/30 dark:bg-gray-900/30 backdrop-blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary-100 dark:bg-blue-900 text-primary-800 dark:text-blue-200 text-sm font-medium mb-3 transition-colors duration-300 shadow-sm">
              Our Advantages
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Why Choose Us
          </motion.h2>
          
          <motion.div
            className="mt-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
              SoftSell offers unique advantages that make selling your software licenses simple, secure, and profitable.
            </p>
          </motion.div>
        </motion.div>

        {/* Feature cards with 3D hover effect */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChooseUsReasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              className="relative group perspective"
              variants={featureCardVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoverFeature(reason.id)}
              onHoverEnd={() => setHoverFeature(null)}
              onClick={() => setActiveFeature(activeFeature === reason.id ? null : reason.id)}
            >
              <motion.div 
                className={`
                  feature-card h-full overflow-hidden rounded-2xl p-8 
                  ${activeFeature === reason.id ? 'bg-gradient-to-br' : 'bg-white dark:bg-gray-800'} 
                  ${activeFeature === reason.id ? `from-${reason.color}-50 to-${reason.color}-100 dark:from-${reason.color}-900 dark:to-${reason.color}-800` : ''}
                  border border-light-border dark:border-gray-700
                  shadow-soft hover:shadow-soft-xl 
                  relative z-10 transform transition-all duration-500
                  flex flex-col items-center text-center
                `}
                style={{
                  transformStyle: "preserve-3d",
                  transform: hoverFeature === reason.id ? "rotateX(2deg) rotateY(2deg)" : "rotateX(0) rotateY(0)"
                }}
              >
                {/* Feature Icon with animated background */}
                <div className="relative mb-6">
                  <motion.div 
                    className={`
                      absolute inset-0 rounded-full 
                      bg-gradient-to-br from-${reason.color}-100 to-${reason.color}-200 
                      dark:from-${reason.color}-800 dark:to-${reason.color}-700 
                      opacity-70 transition-all duration-300
                    `}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.1, 1] }}
                    transition={{ 
                      delay: 0.2 + index * 0.1, 
                      duration: 0.8, 
                      ease: "easeOut" 
                    }}
                    style={{
                      width: "120%",
                      height: "120%",
                      top: "-10%",
                      left: "-10%",
                    }}
                  />
                  
                  {/* Animated ring */}
                  <motion.div
                    className={`absolute rounded-full border-2 border-${reason.color}-300 dark:border-${reason.color}-600 opacity-70`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0.3, 0.7]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: "150%",
                      height: "150%",
                      top: "-25%",
                      left: "-25%",
                    }}
                  />
                  
                  <motion.div 
                    className={`
                      relative z-10 w-20 h-20 rounded-full 
                      bg-white dark:bg-gray-700 shadow-xl
                      flex items-center justify-center
                      transition-all duration-300
                    `}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: `0 0 30px rgba(${reason.color === 'blue' ? '59, 130, 246' : reason.color === 'green' ? '52, 211, 153' : reason.color === 'purple' ? '139, 92, 246' : '245, 158, 11'}, 0.5)`
                    }}
                  >
                    <Icon type={reason.icon} color={reason.color} size="lg" />
                    
                    {/* Animated dots around icon */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full bg-${reason.color}-400 dark:bg-${reason.color}-300`}
                        animate={{
                          rotate: [0, 360],
                          opacity: [0.8, 0.5, 0.8]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "linear"
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                          marginLeft: '-4px',
                          marginTop: '-4px',
                          transformOrigin: `${Math.cos(i * Math.PI/2) * 50 + 50}% ${Math.sin(i * Math.PI/2) * 50 + 50}%`
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
                
                {/* Feature title */}
                <motion.h3 
                  className={`
                    text-xl font-bold mb-3 group-hover:text-${reason.color}-700 dark:group-hover:text-${reason.color}-300
                    text-gray-800 dark:text-white transition-all duration-300
                  `}
                  whileHover={{ scale: 1.05 }}
                >
                  {reason.title}
                </motion.h3>
                
                {/* Feature description */}
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 mb-4 flex-grow">
                  {reason.description}
                </p>
                
                {/* Learn more animated link */}
                <AnimatePresence>
                  {(hoverFeature === reason.id || activeFeature === reason.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <motion.a
                        href="#"
                        className={`
                          inline-flex items-center text-${reason.color}-600 dark:text-${reason.color}-400 
                          font-medium hover:underline transition-colors duration-300
                        `}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Learn more</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
                  <div className={`absolute -top-4 -left-4 w-8 h-8 transform rotate-45 bg-${reason.color}-500 opacity-20`}></div>
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
                  <div className={`absolute -bottom-4 -right-4 w-8 h-8 transform rotate-45 bg-${reason.color}-500 opacity-20`}></div>
                </div>
              </motion.div>
              
              {/* Card shadow/reflection effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl z-0 bg-gradient-to-br from-transparent to-black/10 dark:to-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(-10px) translateY(10px)"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Testimonial section */}
        <motion.div
          className="mt-24 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Glossy background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/30 dark:from-blue-600/30 dark:to-purple-600/40 backdrop-blur-sm" />
            
            <div className="relative px-6 py-10 sm:px-10 sm:py-12 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-soft-xl border border-white/40 dark:border-gray-700/40">
              <div className="flex flex-col items-center sm:items-start sm:flex-row">
                <div className="mb-6 sm:mb-0 sm:mr-8">
                  <motion.div 
                    className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    {/* Use a generic avatar placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">AB</span>
                    </div>
                  </motion.div>
                </div>
                <div>
                  <svg className="h-8 w-8 text-primary-400 dark:text-blue-300 mb-3 opacity-80" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                    "SoftSell transformed how we handle our excess software licenses. The platform is intuitive, secure, and we received payment much faster than expected. I highly recommend their service."
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Alex Bowman</h4>
                    <p className="text-gray-600 dark:text-gray-400">CTO, TechVenture Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            className="relative inline-flex items-center px-10 py-4 overflow-hidden text-lg font-bold text-white 
                     bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full shadow-lg
                     hover:from-primary-700 hover:to-secondary-700 
                     focus:ring-4 focus:ring-primary-500/50 dark:focus:ring-blue-600/50
                     transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background shine effect */}
            <motion.span 
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-15"
              animate={{ 
                x: ['-100%', '100%']
              }}
              transition={{ 
                repeat: Infinity,
                repeatDelay: 3,
                duration: 1.5,
                ease: "easeInOut" 
              }}
            />
            
            <span className="relative z-10">Explore All Benefits</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;