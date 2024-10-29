// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutSection() {
    useEffect(() => {
        AOS.init({ duration: 1000});
    }, []);

    return (

  <div className="font-sans px-8 py-16">
  {/* About Us Section */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Text Section */}
    <div data-aos="fade-right" className="space-y-6">
      <button className="bg-gray-800 text-white py-2 px-4 rounded-full">About Us</button>
      <h2 className="text-9xl font-lora font-normal">We’re dedicated to you</h2>
      <p className="text-gray-600 font-montserrat text-lg">
        This is a space to share more about the business: who’s behind it, what it does,
        and what this site has to offer. It’s an opportunity to tell the story behind the
        business or describe a special service or product it offers. You can use this
        section to share the company&#39;s history or highlight a particular feature that sets
        it apart from competitors.
      </p>
    </div>

    {/* Image Section */}
    <div className="flex flex-col gap-8">
      <div data-aos="zoom-in" className="overflow-hidden rounded-3xl">
        <img
          src="./src/assets/img3.jpg" // Replace with actual image URL
          alt="Clinic Reception"
          className="w-full h-auto object-cover"
        />
      </div>
      <div data-aos="zoom-in-up" className="overflow-hidden rounded-3xl">
        <img
          src="./src/assets/img5.jpg" // Replace with actual image URL
          alt="Doctor with Child"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </div>
</div>
    );
}