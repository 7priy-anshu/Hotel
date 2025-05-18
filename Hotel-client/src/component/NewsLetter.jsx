import React from 'react';
import { assets } from '../assets/assets';
import Title from './title';

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl w-full rounded-2xl px-4 py-12 
    md:py-16 mx-2 lg:mx-auto my-10 bg-gray-900 text-white">

      <Title 
        title="Stay Inspired" 
        subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
      />

      <form 
        className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 w-full px-2"
        onSubmit={(e) => {
          e.preventDefault();
          // handleSubmit logic here
          alert('Subscribed!');
        }}
      >
        <div className="w-full md:w-80">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input 
            type="email" 
            id="email"
            required 
            className="bg-white/10 text-sm px-4 py-2.5 border border-white/20 rounded 
            outline-none w-full focus:border-white/50 focus:ring-1 focus:ring-white/20" 
            placeholder="Enter your email" 
          />
        </div>

        <button 
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 
          group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
          <img 
            src={assets.arrowIcon} 
            alt="arrow icon" 
            className="w-3.5 invert group-hover:translate-x-1 transition-all" 
          />
        </button>
      </form>

      <p className="text-gray-500 mt-6 text-xs text-center max-w-md">
        By subscribing, you agree to our Privacy Policy and consent to receive updates.
      </p>
    </div>
  );
};

export default NewsLetter;
