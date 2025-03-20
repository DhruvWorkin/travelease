import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, Users, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get booking details from location state
  const bookingDetails = location.state || {};

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!bookingDetails.bookingId) {
    navigate("/tours");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={!!user}
        userName={user?.name || "Guest User"}
        userAvatar={user?.avatar_url || ""}
      />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Booking Confirmed!
                </h1>
                <p className="text-gray-600">
                  Thank you for booking with TravelEase. Your tour is now
                  confirmed.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-1/3 text-gray-500">Booking ID</div>
                    <div className="w-2/3 font-medium">
                      #{bookingDetails.bookingId}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-1/3 text-gray-500">Tour</div>
                    <div className="w-2/3 font-medium">
                      {bookingDetails.tourTitle}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-1/3 text-gray-500">Date</div>
                    <div className="w-2/3 font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {new Date(bookingDetails.selectedDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-1/3 text-gray-500">Participants</div>
                    <div className="w-2/3 font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {bookingDetails.participants}{" "}
                      {bookingDetails.participants === 1 ? "person" : "people"}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-1/3 text-gray-500">Total Amount</div>
                    <div className="w-2/3 font-medium">
                      ${bookingDetails.totalPrice}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">1.</span>
                    <span>
                      You will receive a confirmation email with all the details
                      of your booking.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">2.</span>
                    <span>
                      Your tour guide will contact you a few days before the
                      tour with final instructions.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">3.</span>
                    <span>
                      You can view and manage your booking in your account
                      dashboard.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/profile")} variant="outline">
                  View My Bookings
                </Button>
                <Button onClick={() => navigate("/tours")}>
                  Browse More Tours
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
