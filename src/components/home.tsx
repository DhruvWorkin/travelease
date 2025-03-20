import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import HeroSection from "./home/HeroSection";
import FeaturedTours from "./home/FeaturedTours";
import Testimonials from "./home/Testimonials";
import CallToAction from "./home/CallToAction";
import Footer from "./layout/Footer";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "@/context/AuthContext";

interface HomePageProps {
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
}

const HomePage = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const userName = user?.name || "Guest User";
  const userAvatar = user?.avatar_url || "";
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const handleOpenAuthModal = (tab: "login" | "signup") => {
    navigate(tab === "login" ? "/login" : "/signup");
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleViewTourDetails = (id: string) => {
    console.log(`View details for tour ${id}`);
    // In a real app, this would navigate to the tour details page
  };

  const handleBookNowClick = () => {
    if (!isAuthenticated) {
      handleOpenAuthModal("login");
    } else {
      console.log("Navigate to tours page");
      // In a real app, this would navigate to the tours page
    }
  };

  const handleLearnMoreClick = () => {
    console.log("Navigate to about page");
    // In a real app, this would navigate to the about page
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <Navbar
        isAuthenticated={isAuthenticated}
        userName={userName}
        userAvatar={userAvatar}
      />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {" "}
        {/* pt-20 to account for fixed navbar */}
        <HeroSection />
        <FeaturedTours onViewDetails={handleViewTourDetails} />
        <Testimonials />
        <CallToAction
          onPrimaryClick={handleBookNowClick}
          onSecondaryClick={handleLearnMoreClick}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default HomePage;
