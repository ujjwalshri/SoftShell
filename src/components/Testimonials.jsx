import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../utils/dummyData';
import { useAnimateOnScroll, staggerContainer, slideInFromBottom } from '../utils/animations';

const TestimonialCard = ({ testimonial }) => {
  const { ref, isInView } = useAnimateOnScroll(0.2);
  
  // Function to render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={index < rating ? "currentColor" : "none"}
        stroke={index >= rating ? "currentColor" : "none"}
        className={`w-5 h-5 ${index < rating ? 'text-amber-400' : 'text-gray-300'}`}
      >
        <path 
          fillRule="evenodd" 
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
          clipRule="evenodd" 
        />
      </svg>
    ));
  };

  return (
    <motion.div
      ref={ref}
      variants={slideInFromBottom}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700"
    >
      {testimonial.highlight && (
        <div className="mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2.5 py-1 rounded-full">
            {testimonial.highlight}
          </span>
        </div>
      )}
      
      <div className="flex items-center space-x-1 mb-2">
        {renderStars(testimonial.rating)}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 italic mb-4 flex-grow">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center mt-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { ref, isInView } = useAnimateOnScroll();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2 
              variants={slideInFromBottom}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Customer Testimonials
            </motion.h2>
            <motion.p 
              variants={slideInFromBottom}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Hear what our customers have to say about their experience with SoftShell
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;