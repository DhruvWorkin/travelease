import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const AboutPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar
        isAuthenticated={!!user}
        userName={user?.name || "Guest User"}
        userAvatar={user?.avatar_url || ""}
      />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
              alt="Travel destination"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-24 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About TravelEase
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Connecting travelers with extraordinary experiences since 2010
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  TravelEase was founded in 2010 by a group of passionate
                  travelers who believed that exploring the world should be
                  accessible, easy, and unforgettable for everyone.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a small operation offering guided tours in
                  just three countries has grown into a global travel company
                  connecting adventurers with extraordinary experiences in over
                  50 destinations worldwide.
                </p>
                <p className="text-gray-700">
                  Our mission remains the same: to create meaningful travel
                  experiences that inspire, educate, and transform, while
                  maintaining our commitment to responsible tourism and
                  supporting local communities.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800&q=80"
                  alt="TravelEase team"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Responsible Tourism
                </h3>
                <p className="text-gray-700">
                  We believe in minimizing our environmental impact and
                  maximizing the positive benefits to local communities. All our
                  tours are designed with sustainability in mind.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Authentic Experiences
                </h3>
                <p className="text-gray-700">
                  We create opportunities for genuine cultural exchange and
                  immersive experiences that go beyond typical tourist
                  attractions, connecting travelers with local people and
                  traditions.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety & Support</h3>
                <p className="text-gray-700">
                  Your safety is our priority. We provide comprehensive support
                  before, during, and after your journey, with expert guides and
                  24/7 assistance for peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="John Smith"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">John Smith</h3>
                <p className="text-primary">Founder & CEO</p>
                <p className="text-gray-600 mt-2">
                  With over 20 years in the travel industry, John's vision
                  drives our company's mission to create transformative travel
                  experiences.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                    alt="Maria Rodriguez"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Maria Rodriguez</h3>
                <p className="text-primary">Head of Operations</p>
                <p className="text-gray-600 mt-2">
                  Maria ensures that every tour runs smoothly, managing our
                  global network of guides and partners with precision and care.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                    alt="David Chen"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">David Chen</h3>
                <p className="text-primary">Tour Development Manager</p>
                <p className="text-gray-600 mt-2">
                  David's passion for discovery leads our efforts to create
                  unique itineraries that showcase the best each destination has
                  to offer.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    alt="Sarah Johnson"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-primary">Customer Experience Director</p>
                <p className="text-gray-600 mt-2">
                  Sarah's dedication to exceptional service ensures that every
                  traveler receives personalized attention and support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have experienced the
              world with TravelEase. Book your dream vacation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => (window.location.href = "/tours")}
              >
                Explore Tours
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
