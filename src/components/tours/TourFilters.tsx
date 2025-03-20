import React, { useState } from "react";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface TourFiltersProps {
  onFilterChange?: (filters: {
    destination: string;
    priceRange: [number, number];
    duration: string;
    rating: string;
  }) => void;
}

const TourFilters = ({ onFilterChange }: TourFiltersProps = {}) => {
  const [filters, setFilters] = useState({
    destination: "all",
    priceRange: [0, 5000] as [number, number],
    duration: "all",
    rating: "all",
  });

  const destinations = [
    { value: "all", label: "All Destinations" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "north-america", label: "North America" },
    { value: "south-america", label: "South America" },
    { value: "australia", label: "Australia" },
  ];

  const durations = [
    { value: "all", label: "Any Duration" },
    { value: "1-3", label: "1-3 Days" },
    { value: "4-7", label: "4-7 Days" },
    { value: "8-14", label: "8-14 Days" },
    { value: "15+", label: "15+ Days" },
  ];

  const ratings = [
    { value: "all", label: "Any Rating" },
    { value: "5", label: "5 Stars" },
    { value: "4+", label: "4+ Stars" },
    { value: "3+", label: "3+ Stars" },
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination Filter */}
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Select
            value={filters.destination}
            onValueChange={(value) => handleFilterChange("destination", value)}
          >
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((destination) => (
                <SelectItem key={destination.value} value={destination.value}>
                  {destination.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <Label>
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </Label>
          <Slider
            defaultValue={filters.priceRange}
            min={0}
            max={5000}
            step={100}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
            className="mt-6"
          />
        </div>

        {/* Duration Filter */}
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select
            value={filters.duration}
            onValueChange={(value) => handleFilterChange("duration", value)}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration.value} value={duration.value}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Select
            value={filters.rating}
            onValueChange={(value) => handleFilterChange("rating", value)}
          >
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating.value} value={rating.value}>
                  {rating.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TourFilters;
