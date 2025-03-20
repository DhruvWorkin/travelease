import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Star } from "lucide-react";

interface TestimonialProps {
  testimonials?: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    rating: number;
    text: string;
  }[];
}

const Testimonials = ({
  testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      location: "New York, USA",
      rating: 5,
      text: "The tour to Bali was absolutely incredible! The guides were knowledgeable and friendly, and the itinerary was perfectly balanced between adventure and relaxation. I will definitely book with them again!",
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      location: "Toronto, Canada",
      rating: 4,
      text: "Our family trip to Costa Rica exceeded expectations. The accommodations were excellent and the wildlife tours were unforgettable. The kids still talk about the zip-lining adventure!",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      location: "London, UK",
      rating: 5,
      text: "The European cultural tour was meticulously planned with the perfect balance of guided tours and free time. The local guides provided fascinating insights that you wouldn't get from a guidebook.",
    },
    {
      id: "4",
      name: "David Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      location: "Sydney, Australia",
      rating: 5,
      text: "The Japan cherry blossom tour was a dream come true. Every detail was taken care of, and the seasonal timing was perfect. The cultural experiences arranged were authentic and memorable.",
    },
  ],
}: TestimonialProps) => {
  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of travelers choose us for their
            unforgettable journeys around the world.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/2 pl-4"
              >
                <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-2">
            <CarouselPrevious className="relative inset-0 translate-y-0 bg-primary hover:bg-primary/90 text-white" />
            <CarouselNext className="relative inset-0 translate-y-0 bg-primary hover:bg-primary/90 text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
