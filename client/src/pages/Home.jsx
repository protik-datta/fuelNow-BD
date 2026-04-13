import React from "react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";
import Pricing from "../components/home/Pricing";
import TrustSection from "../components/home/TrustSection";
import GallerySection from "../components/home/GallerySection";
import ReviewsSection from "../components/home/ReviewsSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Pricing />
      <TrustSection />
      <GallerySection />
      <ReviewsSection />
      <CTASection />
    </>
  );
};

export default Home;
