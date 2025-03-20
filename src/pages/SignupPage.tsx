import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/auth/AuthModal";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={handleCloseAuthModal}
            defaultTab="signup"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
