import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Calendar, Users, MapPin, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getTourById, getTourReviews } from "@/lib/api";
import AuthModal from "@/components/auth/AuthModal";

const TourDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        setIsLoading(true);
        const tourData = await getTourById(id);
        setTour(tourData);

        // Set default selected date to tour start date
        setSelectedDate(tourData.start_date);

        // Fetch reviews
        const reviewsData = await getTourReviews(id);
        setReviews(reviewsData || []);
      } catch (err) {
        console.error("Error fetching tour details:", err);
        setError("Failed to load tour details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTourDetails();
    }
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    // Navigate to booking page with tour details
    navigate(`/booking/${id}`, {
      state: {
        tourId: id,
        tourTitle: tour.title,
        tourImage: tour.image,
        price: tour.price,
        participants,
        selectedDate,
        totalPrice: tour.price * participants,
      },
    });
  };

  const handleParticipantsChange = (e) => {
    const value = parseInt(e.target.value);
    setParticipants(value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <p>{error || "Tour not found"}</p>
            </div>
            <div className="mt-4">
              <Button onClick={() => navigate("/tours")}>Back to Tours</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={!!user}
        userName={user?.name || "Guest User"}
        userAvatar={user?.avatar_url || ""}
      />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {tour.title}
              </h1>
              <div className="flex items-center text-white space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                  <span>{tour.rating} rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="includes">What's Included</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                      <p className="text-gray-700 mb-6">{tour.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-semibold">{tour.duration} days</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-semibold">{tour.location}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm text-gray-500">Group Size</p>
                          <p className="font-semibold">
                            Max {tour.max_group_size}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="font-semibold">
                            {new Date(tour.start_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>
                            Expert local guides with deep knowledge of the
                            destination
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>
                            Carefully selected accommodations for comfort and
                            authenticity
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>
                            Small group sizes for a more personalized experience
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>
                            Balanced itinerary with guided activities and free
                            time
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="itinerary" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        Tour Itinerary
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Day 1: Arrival
                          </h3>
                          <p className="text-gray-700">
                            Arrive at your destination and transfer to your
                            hotel. Meet your tour guide and fellow travelers at
                            a welcome dinner.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Day 2: Exploration
                          </h3>
                          <p className="text-gray-700">
                            Begin your adventure with a guided tour of the main
                            attractions. Enjoy lunch at a local restaurant and
                            continue exploring in the afternoon.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Day 3: Adventure
                          </h3>
                          <p className="text-gray-700">
                            Embark on an exciting outdoor activity specific to
                            your destination. Enjoy breathtaking views and
                            unique experiences.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Final Day: Departure
                          </h3>
                          <p className="text-gray-700">
                            Enjoy a farewell breakfast with your group before
                            transferring to the airport for your departure
                            flight.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="includes" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        What's Included
                      </h2>

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">
                          Included in the Price
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>
                              Accommodation for the duration of the tour
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>
                              Professional, English-speaking tour guide
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>Transportation during the tour</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>
                              Daily breakfast and select meals as per itinerary
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>
                              Entrance fees to attractions listed in the
                              itinerary
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">
                          Not Included
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">✕</span>
                            <span>International airfare</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">✕</span>
                            <span>Travel insurance</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">✕</span>
                            <span>
                              Optional activities not listed in the itinerary
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-500 mr-2">✕</span>
                            <span>Personal expenses and gratuities</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        Traveler Reviews
                      </h2>

                      {reviews.length > 0 ? (
                        <div className="space-y-6">
                          {reviews.map((review) => (
                            <div
                              key={review.id}
                              className="border-b border-gray-200 pb-6 last:border-0"
                            >
                              <div className="flex items-center mb-2">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                  <img
                                    src={
                                      review.profiles?.avatar_url ||
                                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user_id}`
                                    }
                                    alt={review.profiles?.name || "User"}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {review.profiles?.name || "Anonymous"}
                                  </h4>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-500">
                                      {new Date(
                                        review.created_at,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">
                            No reviews yet for this tour.
                          </p>
                          {user && (
                            <Button
                              className="mt-4"
                              onClick={() => navigate(`/tours/${id}/review`)}
                            >
                              Be the first to review
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Card */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      ${tour.price}
                      <span className="text-base font-normal text-gray-500">
                        {" "}
                        / person
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        min={tour.start_date}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Participants
                      </label>
                      <select
                        value={participants}
                        onChange={handleParticipantsChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {[...Array(tour.max_group_size)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} {i === 0 ? "Person" : "People"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Price per person</span>
                      <span>${tour.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Participants</span>
                      <span>x {participants}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${tour.price * participants}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleBookNow}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="login"
      />
    </div>
  );
};

export default TourDetailsPage;
