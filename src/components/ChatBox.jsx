import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { getGeminiResponse, exampleQAs } from '../utils/geminiService';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you today? You can ask me about selling licenses, getting valuations, or the payment process.", fromUser: false, time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of messages when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      inputRef.current?.focus();
    }

    // Show suggested questions only when the chat is first opened
    if (isOpen && messages.length === 1 && suggestions.length === 0) {
      // Show example questions as suggestions
      setSuggestions(exampleQAs.map(qa => qa.question));
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      fromUser: true,
      time: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setSuggestions([]); // Clear suggestions when user sends a message
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Add a realistic delay to simulate network latency and AI processing time
      // This helps make the chat feel more natural and less immediate
      const minDelay = 1000; // Minimum delay in ms
      const additionalDelay = Math.random() * 2000; // Random additional delay up to 2 seconds
      const startTime = Date.now();
      
      // Get response from Gemini API
      const aiResponse = await getGeminiResponse(
        userMessage.text, 
        messages // Send message history for context
      );
      
      // Calculate how much time has elapsed
      const elapsedTime = Date.now() - startTime;
      
      // If the API response was very fast, add some delay to make it feel more natural
      if (elapsedTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay + additionalDelay - elapsedTime));
      }
      
      // Add AI response
      const botMessage = {
        id: messages.length + 2,
        text: aiResponse,
        fromUser: false,
        time: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Add fallback error message
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team for immediate assistance.",
        fromUser: false,
        time: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle clicking on a suggested question
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Auto-submit after short delay
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 300);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Animation variants
  const chatBoxVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    pressed: { scale: 0.95 }
  };

  const typingIndicator = (
    <div className="flex space-x-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg w-16">
      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <motion.button
        className="w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full shadow-lg flex items-center justify-center text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="pressed"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
            variants={chatBoxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 flex items-center">
              <Logo size="sm" className="mr-2" />
              <div>
                <h3 className="font-bold">SoftShell AI Assistant</h3>
                <p className="text-xs opacity-80">Ask me anything about license sales</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3/4 p-3 rounded-lg ${
                      message.fromUser 
                        ? 'bg-primary-600 text-white rounded-br-none' 
                        : 'bg-white dark:bg-gray-700 shadow rounded-bl-none'
                    }`}
                  >
                    <p className={`text-sm ${!message.fromUser && 'dark:text-white'}`}>{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.fromUser 
                        ? 'text-primary-100' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.time)}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  {typingIndicator}
                </div>
              )}
              
              {/* Suggested questions */}
              {suggestions.length > 0 && (
                <div className="mt-4 mb-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">You can ask me:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                                  text-gray-800 dark:text-gray-200 text-xs px-3 py-1.5 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 flex">
              <input
                type="text"
                ref={inputRef}
                className="flex-grow px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-l-lg focus:outline-none dark:text-white"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-r-lg transition-colors"
                disabled={isTyping}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>

            {/* Powered by Text */}
            <div className="bg-gray-50 dark:bg-gray-900 text-center py-2 text-xs text-gray-500 dark:text-gray-400">
              Powered by Google Gemini
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBox;