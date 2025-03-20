import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star, Clock, MapPin, Calendar } from "lucide-react";

interface TourCardProps {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  price?: number;
  duration?: number;
  location?: string;
  rating?: number;
  startDate?: string;
  maxGroupSize?: number;
  onViewDetails?: (id: string) => void;
}

const TourCard = ({
  id = "1",
  title = "Scenic Mountain Trek",
  description = "Experience breathtaking views on this guided mountain trek through pristine wilderness.",
  image = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  price = 1299,
  duration = 5,
  location = "Swiss Alps",
  rating = 4.8,
  startDate = "2023-06-15",
  maxGroupSize = 12,
  onViewDetails = () => {},
}: TourCardProps) => {
  const handleViewDetails = () => {
    onViewDetails(id);
  };

  return (
    <Card className="w-full max-w-[350px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <Badge className="absolute right-2 top-2 bg-primary text-white">
          ${price}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="flex items-center space-x-1">
          <MapPin size={16} className="text-gray-500" />
          <CardDescription>{location}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-primary" />
            <span>{duration} days</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-primary" />
            <span>
              Starts{" "}
              {new Date(startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            <span>{rating} rating</span>
          </div>

          <div className="text-sm">
            <span>Max group: {maxGroupSize}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button onClick={handleViewDetails} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
