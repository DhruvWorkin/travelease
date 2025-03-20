import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title = "Discover the World's Most Amazing Places",
  subtitle = "Find and book your perfect tour package with our easy-to-use platform. Explore destinations worldwide with our expert guides.",
  backgroundImage = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=80",
}: HeroSectionProps) => {
  return (
    <div className="relative h-[600px] w-full bg-slate-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
          {subtitle}
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center p-2">
            <Input
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="ml-2 bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="text-white text-center">
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm">Destinations</p>
          </div>
          <div className="text-white text-center">
            <p className="text-3xl font-bold">10k+</p>
            <p className="text-sm">Happy Travelers</p>
          </div>
          <div className="text-white text-center">
            <p className="text-3xl font-bold">100%</p>
            <p className="text-sm">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
