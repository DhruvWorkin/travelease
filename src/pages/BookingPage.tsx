import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/lib/api";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // Get tour details from location state
  const bookingDetails = location.state || {};

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!bookingDetails.tourId) {
    navigate("/tours");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create booking in database
      const booking = {
        user_id: user.id,
        tour_id: bookingDetails.tourId,
        booking_date: bookingDetails.selectedDate,
        num_participants: bookingDetails.participants,
        total_price: bookingDetails.totalPrice,
        status: "confirmed", // In a real app, this would be 'pending' until payment is processed
      };

      await createBooking(booking);

      // Navigate to booking confirmation page
      navigate("/booking/confirmation", {
        state: {
          ...bookingDetails,
          bookingId: Date.now(), // In a real app, this would be the actual booking ID
        },
      });
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to process booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={!!user}
        userName={user?.name || "Guest User"}
        userAvatar={user?.avatar_url || ""}
      />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Booking
            </h1>
            <p className="text-gray-600">
              You're just a few steps away from confirming your tour
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
                      <p>{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "credit-card" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                          onClick={() => setPaymentMethod("credit-card")}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <svg
                              className="h-8 w-8"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="2"
                                y="5"
                                width="20"
                                height="14"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M2 10H22"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M6 15H10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <p className="text-center text-sm font-medium">
                            Credit Card
                          </p>
                        </div>
                        <div
                          className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                          onClick={() => setPaymentMethod("paypal")}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <svg
                              className="h-8 w-8"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.5 7.5H9.5C8.39543 7.5 7.5 8.39543 7.5 9.5V19.5C7.5 20.6046 8.39543 21.5 9.5 21.5H19.5C20.6046 21.5 21.5 20.6046 21.5 19.5V9.5C21.5 8.39543 20.6046 7.5 19.5 7.5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4.5 16.5L7.5 13.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4.5 10.5L7.5 13.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14.5 11.5C14.5 12.6046 15.3954 13.5 16.5 13.5C17.6046 13.5 18.5 12.6046 18.5 11.5C18.5 10.3954 17.6046 9.5 16.5 9.5C15.3954 9.5 14.5 10.3954 14.5 11.5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.5 17.5C10.5 18.6046 11.3954 19.5 12.5 19.5C13.6046 19.5 14.5 18.6046 14.5 17.5C14.5 16.3954 13.6046 15.5 12.5 15.5C11.3954 15.5 10.5 16.3954 10.5 17.5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-center text-sm font-medium">
                            PayPal
                          </p>
                        </div>
                        <div
                          className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "bank-transfer" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                          onClick={() => setPaymentMethod("bank-transfer")}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <svg
                              className="h-8 w-8"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 7L19 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M5 12L19 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M5 17L19 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <p className="text-center text-sm font-medium">
                            Bank Transfer
                          </p>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry-date">Expiry Date</Label>
                            <Input
                              id="expiry-date"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-blue-800 mb-2">
                          You will be redirected to PayPal to complete your
                          payment.
                        </p>
                        <p className="text-sm text-blue-600">
                          Click "Complete Booking" to proceed.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "bank-transfer" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800 mb-2">
                          Please use the following details for bank transfer:
                        </p>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Bank Name:</span>{" "}
                            Global Bank
                          </p>
                          <p>
                            <span className="font-medium">Account Name:</span>{" "}
                            TravelEase Ltd
                          </p>
                          <p>
                            <span className="font-medium">Account Number:</span>{" "}
                            1234567890
                          </p>
                          <p>
                            <span className="font-medium">Sort Code:</span>{" "}
                            12-34-56
                          </p>
                          <p>
                            <span className="font-medium">Reference:</span>{" "}
                            TOUR-{bookingDetails.tourId?.substring(0, 8)}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Complete Booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 rounded overflow-hidden mr-4">
                      <img
                        src={bookingDetails.tourImage}
                        alt={bookingDetails.tourTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {bookingDetails.tourTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span>
                        {new Date(
                          bookingDetails.selectedDate,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants</span>
                      <span>{bookingDetails.participants}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per person</span>
                      <span>${bookingDetails.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants</span>
                      <span>x {bookingDetails.participants}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${bookingDetails.totalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
