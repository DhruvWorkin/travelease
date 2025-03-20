import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForgotPassword from "@/components/auth/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <ForgotPassword />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
