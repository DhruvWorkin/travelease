import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/tours/TourCard";
import TourFilters from "@/components/tours/TourFilters";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getTours } from "@/lib/api";

const ToursPage = () => {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const toursData = await getTours();
        setTours(toursData);
        setFilteredTours(toursData);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError("Failed to load tours. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleFilterChange = (filters) => {
    // Filter tours based on selected filters
    let filtered = [...tours];

    // Filter by destination
    if (filters.destination !== "all") {
      filtered = filtered.filter((tour) => {
        // This is a simplified filter - in a real app you would have proper categories
        // For now, just check if the location contains the destination string
        return tour.location
          .toLowerCase()
          .includes(filters.destination.toLowerCase());
      });
    }

    // Filter by price range
    filtered = filtered.filter((tour) => {
      return (
        tour.price >= filters.priceRange[0] &&
        tour.price <= filters.priceRange[1]
      );
    });

    // Filter by duration
    if (filters.duration !== "all") {
      filtered = filtered.filter((tour) => {
        if (filters.duration === "1-3")
          return tour.duration >= 1 && tour.duration <= 3;
        if (filters.duration === "4-7")
          return tour.duration >= 4 && tour.duration <= 7;
        if (filters.duration === "8-14")
          return tour.duration >= 8 && tour.duration <= 14;
        if (filters.duration === "15+") return tour.duration >= 15;
        return true;
      });
    }

    // Filter by rating
    if (filters.rating !== "all") {
      filtered = filtered.filter((tour) => {
        if (filters.rating === "5") return tour.rating === 5;
        if (filters.rating === "4+") return tour.rating >= 4;
        if (filters.rating === "3+") return tour.rating >= 3;
        return true;
      });
    }

    setFilteredTours(filtered);
  };

  const filterByCategory = (category) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredTours(tours);
    } else {
      // This is a simplified filter - in a real app you would have proper categories
      const filtered = tours.filter((tour) => {
        if (category === "popular") return tour.rating >= 4.5;
        if (category === "trending") return tour.price < 1500;
        if (category === "new") {
          const tourDate = new Date(tour.start_date);
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          return tourDate > threeMonthsAgo;
        }
        return true;
      });
      setFilteredTours(filtered);
    }
  };

  const handleViewTourDetails = (id) => {
    // Navigate to tour details page
    window.location.href = `/tours/${id}`;
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
              Explore Our Tours
            </h1>
            <p className="text-gray-600">
              Discover amazing destinations and unforgettable experiences around
              the world
            </p>
          </div>

          {/* Quick category filters */}
          <div className="mb-8 flex flex-wrap justify-start gap-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => filterByCategory("all")}
            >
              All Tours
            </Button>
            <Button
              variant={activeFilter === "popular" ? "default" : "outline"}
              onClick={() => filterByCategory("popular")}
            >
              Popular
            </Button>
            <Button
              variant={activeFilter === "trending" ? "default" : "outline"}
              onClick={() => filterByCategory("trending")}
            >
              Best Value
            </Button>
            <Button
              variant={activeFilter === "new" ? "default" : "outline"}
              onClick={() => filterByCategory("new")}
            >
              New Tours
            </Button>
          </div>

          {/* Advanced filters */}
          <div className="mb-8">
            <TourFilters onFilterChange={handleFilterChange} />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Tour cards grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTours.map((tour) => (
                  <div key={tour.id} className="flex justify-center">
                    <TourCard
                      id={tour.id}
                      title={tour.title}
                      description={tour.description}
                      image={tour.image}
                      price={tour.price}
                      duration={tour.duration}
                      location={tour.location}
                      rating={tour.rating}
                      startDate={tour.start_date}
                      maxGroupSize={tour.max_group_size}
                      onViewDetails={handleViewTourDetails}
                    />
                  </div>
                ))}
              </div>

              {/* No results message */}
              {filteredTours.length === 0 && (
                <div className="mt-10 rounded-lg bg-white p-8 text-center shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold">No tours found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to find the perfect tour for you.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToursPage;
