# SoftShell - Software License Marketplace

![SoftShell Logo](public/favicon.svg)

SoftShell is a modern, responsive web application for buying and selling software licenses. The platform helps businesses transform unused software licenses into immediate revenue through a secure marketplace.

## 🌟 Features

### Core Functionality
- **License Sales Platform**: Sell unused software licenses securely
- **AI-Powered Valuation**: Get instant valuations for your licenses
- **Secure Transactions**: All transfers are compliant and secure
- **Fast Payment Processing**: Get paid within 48 hours

### Technical Features
- **Responsive Design**: Works on all device sizes (mobile, tablet, desktop)
- **Dark/Light Mode**: Fully implemented theme switching with user preference detection
- **Modern UI Components**: Built with Tailwind CSS and Framer Motion
- **AI Chat Assistant**: Gemini-powered chatbot for instant support

## 🛠️ Tech Stack

### Frontend Framework
- React 18 (with hooks and context API)
- React Router v6 for navigation

### Styling & Animations
- Tailwind CSS for utility-first styling
- Custom color palette with light/dark mode support
- Framer Motion for smooth animations and transitions

### Additional Features
- Custom SVG logo with animations
- AI-powered chat widget using Google's Gemini API (with fallback)
- SEO-optimized with meta tags
- Form validation for contact forms
- Smooth page transitions

## 📋 Project Structure

```
/public             # Static assets
  /images           # Image assets
  favicon.svg       # Custom SVG favicon
/src
  /components       # Reusable UI components
    ChatBox.jsx     # AI-powered chat interface
    ContactForm.jsx # Form with validation
    Logo.jsx        # Animated SVG logo component
    Navbar.jsx      # Responsive navigation with mobile menu
    ...
  /context
    ThemeContext.jsx # Dark/light mode theme context
  /pages
    Contact.jsx     # Contact page with form
    Home.jsx        # Landing page with sections
  /utils
    animations.js   # Animation utility functions
    geminiService.js # AI service for chat feature
```

## ✨ Key Components

### Theme System
- Complete dark/light mode implementation
- System preference detection
- Theme persistence using localStorage
- Smooth theme transitions

### Navigation
- Responsive navbar with mobile menu
- Animated navigation links
- Active link state

### Chat Feature
- AI-powered assistant using Google Gemini API
- Fallback to local response generation when API is unavailable
- Dynamic responses based on user queries
- Realistic typing animation and message history
- Suggested questions for better user experience

### Contact Form
- Form validation for all fields
- Responsive layout
- Success message after submission
- Clear error states

### Visual Design
- Coherent color palette for brand consistency
- Custom SVG logo and icons
- Subtle animations for enhanced user experience
- Responsive layouts for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourname/softshell.git
cd softshell
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser at `http://localhost:5173`

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with extended theme options:
- Custom color palette with primary and secondary colors
- Extended animation variants
- Custom gradients and shadows

### Google Gemini API
To use the AI chat feature with Gemini API:
1. Get an API key from Google AI Studio
2. Add your API key to `src/utils/geminiService.js`

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## 🎨 Color Palette

### Light Mode
- Background: Light blue gradient to white
- Surface: White with subtle patterns
- Primary: Blue (#0ea5e9)
- Secondary: Purple (#a855f7)
- Text: Dark gray (#1a202c)

### Dark Mode
- Background: Dark gradient from gray-900 to gray-800
- Surface: Gray-800
- Primary: Blue (#38bdf8)
- Secondary: Purple (#c084fc)
- Text: White (#ffffff)

## 🔍 SEO Optimization

- Custom page titles and meta descriptions
- Open Graph tags for social sharing
- Twitter Card metadata
- Canonical links
- Appropriate heading hierarchy

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ by the SoftShell team
