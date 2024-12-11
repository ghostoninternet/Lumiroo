import React from 'react';
import Footer from '../../layouts/MainLayout/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import LandingHeader from './components/LandingHeader';

const Landing = () => {
  return (
    <div className="bg-white min-h-screen">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default Landing;