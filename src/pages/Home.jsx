import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Home;