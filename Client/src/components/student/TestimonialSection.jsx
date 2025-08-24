import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <div className="pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
          Testimonials
        </h2>

        {/* ✅ Subtitle / Description */}
        <p className="text-gray-500 text-sm sm:text-base mt-3 text-center max-w-3xl mx-auto leading-relaxed">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          molestiae libero <br className="hidden md:block" />
          et velit? Id, nesciunt? Odio magnam vitae beatae rem!
        </p>

        {/* ✅ Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:px-20 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-12">
          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className="border border-gray-200 pb-6 rounded-xl bg-white text-sm text-left shadow-md overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <h1 className="text-gray-800 text-base sm:text-lg font-medium">
                    {testimonial.name}
                  </h1>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 pb-7">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      className="h-4 sm:h-5"
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                    />
                  ))}
                </div>
                <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                  {testimonial.feedback}
                </p>
              </div>

              {/* Card Footer */}
              <a
                href="#"
                className="text-blue-500 underline px-5 text-sm sm:text-base"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
