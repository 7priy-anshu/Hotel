import React from 'react';
import Title from './title';
import { testimonials } from '../assets/assets';
import Starrating from './Starrating';

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-24 bg-slate-50 pt-20 pb-24">
      <Title 
        title="What Our Guests Say" 
        subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world." 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full max-w-7xl">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <img 
                className="w-12 h-12 rounded-full object-cover" 
                src={testimonial.image} 
                alt={testimonial.name} 
              />
              <div>
                <p className="font-playfair text-lg">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.address}</p>
              </div>
            </div>

            <div className="mt-4 flex">
              <Starrating />
            </div>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
