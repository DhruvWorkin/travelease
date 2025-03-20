import React from "react";
import { Button } from "../ui/button";

interface CallToActionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  backgroundImage?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CallToAction = ({
  title = "Start Your Adventure Today",
  description = "Join thousands of satisfied travelers who have experienced our premium tour packages. Book now and get exclusive discounts on your next journey.",
  primaryButtonText = "Book Now",
  secondaryButtonText = "Learn More",
  backgroundImage = "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=80",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
}: CallToActionProps) => {
  return (
    <section className="relative w-full h-[300px] bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "brightness(0.4)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
            onClick={onPrimaryClick}
          >
            {primaryButtonText}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={onSecondaryClick}
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
