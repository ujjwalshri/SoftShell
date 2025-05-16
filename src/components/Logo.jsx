import { motion } from 'framer-motion';

const Logo = ({ size = 'md', colored = true, className = '' }) => {
  // Size class mapping
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24'
  };
  
  // Get the appropriate size class or default to md
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  // Animation variants
  const shellVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    },
    hover: { 
      scale: 1.05, 
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15 
      } 
    }
  };
  
  return (
    <motion.div 
      className={`relative ${sizeClass} ${className}`}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* SVG Logo */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main Shell Shape */}
        <motion.path 
          d="M50 10C29.5 10 13 26.5 13 47C13 67.5 29.5 90 50 90C70.5 90 87 67.5 87 47C87 26.5 70.5 10 50 10Z"
          fill={colored ? "url(#shellGradient)" : "currentColor"}
          stroke={colored ? "url(#shellStrokeGradient)" : "currentColor"}
          strokeWidth="4"
          strokeLinecap="round"
          variants={shellVariants}
        />
        
        {/* Inner Shell Line 1 */}
        <motion.path 
          d="M35 30C42 35 58 35 65 30"
          stroke={colored ? "#ffffff" : "currentColor"}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { delay: 0.3, duration: 0.8 } 
          }}
        />
        
        {/* Inner Shell Line 2 */}
        <motion.path 
          d="M30 45C40 52 60 52 70 45"
          stroke={colored ? "#ffffff" : "currentColor"}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { delay: 0.5, duration: 0.8 } 
          }}
        />
        
        {/* Inner Shell Line 3 */}
        <motion.path 
          d="M25 60C38 70 62 70 75 60"
          stroke={colored ? "#ffffff" : "currentColor"}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { delay: 0.7, duration: 0.8 } 
          }}
        />
        
        {/* Software Symbol (S) */}
        <motion.path 
          d="M43 25C43 25 47 23 50 23C53 23 57 25 57 29C57 33 53 35 50 35C47 35 43 37 43 41C43 45 47 47 50 47C53 47 57 45 57 45"
          stroke={colored ? "#ffffff" : "currentColor"}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { delay: 0.9, duration: 1 } 
          }}
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="shellGradient" x1="13" y1="10" x2="87" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <linearGradient id="shellStrokeGradient" x1="13" y1="10" x2="87" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default Logo;