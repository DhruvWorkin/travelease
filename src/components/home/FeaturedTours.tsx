import React, { useState } from "react";
import TourCard from "../tours/TourCard";
import TourFilters from "../tours/TourFilters";
import { Button } from "../ui/button";

interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  location: string;
  rating: number;
  startDate: string;
  maxGroupSize: number;
}

interface FeaturedToursProps {
  tours?: Tour[];
  onViewDetails?: (id: string) => void;
}

const FeaturedTours = ({
  tours = mockTours,
  onViewDetails = () => console.log("View details clicked"),
}: FeaturedToursProps) => {
  const [filteredTours, setFilteredTours] = useState<Tour[]>(tours);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filters: {
    destination: string;
    priceRange: [number, number];
    duration: string;
    rating: string;
  }) => {
    // In a real app, this would filter the tours based on the selected filters
    // For now, we'll just log the filters and keep the original tours
    console.log("Filters applied:", filters);
    setFilteredTours(tours);
  };

  const filterByCategory = (category: string) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredTours(tours);
    } else {
      // This is a simplified filter - in a real app you would have proper categories
      const filtered = tours.filter((tour) => {
        if (category === "popular") return tour.rating >= 4.5;
        if (category === "trending") return tour.price < 1500;
        if (category === "new") {
          const tourDate = new Date(tour.startDate);
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          return tourDate > threeMonthsAgo;
        }
        return true;
      });
      setFilteredTours(filtered);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Featured Tours
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover our handpicked selection of extraordinary destinations and
            unforgettable experiences
          </p>
        </div>

        {/* Quick category filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
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
                startDate={tour.startDate}
                maxGroupSize={tour.maxGroupSize}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>

        {/* Show more button */}
        {filteredTours.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg">
              View All Tours
            </Button>
          </div>
        )}

        {/* No results message */}
        {filteredTours.length === 0 && (
          <div className="mt-10 rounded-lg bg-white p-8 text-center shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">No tours found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to find the perfect tour for you.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Mock data for tours
const mockTours: Tour[] = [
  {
    id: "1",
    title: "Alpine Adventure",
    description:
      "Experience the majestic Swiss Alps with guided hiking tours and luxury accommodations.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    price: 2499,
    duration: 7,
    location: "Switzerland",
    rating: 4.8,
    startDate: "2023-07-15",
    maxGroupSize: 12,
  },
  {
    id: "2",
    title: "Tropical Paradise",
    description:
      "Relax on pristine beaches and explore vibrant coral reefs in this island getaway.",
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80",
    price: 1899,
    duration: 5,
    location: "Maldives",
    rating: 4.9,
    startDate: "2023-08-10",
    maxGroupSize: 8,
  },
  {
    id: "3",
    title: "Historic Rome Tour",
    description:
      "Walk through ancient history with expert guides showcasing the wonders of the Eternal City.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    price: 1299,
    duration: 4,
    location: "Italy",
    rating: 4.7,
    startDate: "2023-09-05",
    maxGroupSize: 15,
  },
  {
    id: "4",
    title: "Safari Adventure",
    description:
      "Witness the incredible wildlife of Africa on this unforgettable safari experience.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    price: 3299,
    duration: 8,
    location: "Kenya",
    rating: 4.9,
    startDate: "2023-10-20",
    maxGroupSize: 10,
  },
  {
    id: "5",
    title: "Japanese Culture Tour",
    description:
      "Immerse yourself in the rich traditions and modern wonders of Japan.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    price: 2799,
    duration: 10,
    location: "Japan",
    rating: 4.8,
    startDate: "2023-11-12",
    maxGroupSize: 12,
  },
  {
    id: "6",
    title: "Northern Lights Expedition",
    description:
      "Chase the aurora borealis across the Arctic Circle in this magical winter tour.",
    image:
      "https://images.unsplash.com/photo-1579033385971-a7bc023a7298?w=800&q=80",
    price: 3499,
    duration: 6,
    location: "Iceland",
    rating: 4.7,
    startDate: "2023-12-05",
    maxGroupSize: 8,
  },
  {
    id: "7",
    title: "Amazon Rainforest Expedition",
    description:
      "Explore the world's most biodiverse ecosystem with expert naturalist guides.",
    image:
      "https://images.unsplash.com/photo-1601000785686-c45240e25f25?w=800&q=80",
    price: 2199,
    duration: 9,
    location: "Brazil",
    rating: 4.6,
    startDate: "2024-01-15",
    maxGroupSize: 10,
  },
  {
    id: "8",
    title: "Greek Island Hopping",
    description:
      "Discover the beauty of Santorini, Mykonos, and other stunning Greek islands.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    price: 1899,
    duration: 8,
    location: "Greece",
    rating: 4.8,
    startDate: "2024-02-10",
    maxGroupSize: 14,
  },
];

export default FeaturedTours;
