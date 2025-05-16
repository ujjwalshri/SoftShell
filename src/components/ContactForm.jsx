import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const licenseOptions = [
    { value: '', label: 'Select a license type' },
    { value: 'basic', label: 'Basic' },
    { value: 'professional', label: 'Professional' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    // License type validation
    if (!formData.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, handle submission here
      console.log('Form data submitted:', formData);
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      });
      
      // Show success message
      setFormSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Contact Us</h2>
      
      {formSubmitted && (
        <div className="mb-6 p-3 bg-green-100 text-green-700 rounded">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="company" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Company*
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="licenseType" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            License Type*
          </label>
          <select
            id="licenseType"
            name="licenseType"
            value={formData.licenseType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.licenseType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          >
            {licenseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.licenseType && <p className="mt-1 text-sm text-red-500">{errors.licenseType}</p>}
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;