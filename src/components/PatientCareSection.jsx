// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PatientCareSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans px-8 py-16">
      {/* Patient Care Section */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Text Section */}
        <div data-aos="fade-right" className="space-y-6">
          <button className="bg-gray-800 text-white py-2 px-4 rounded-full">
            What makes us different
          </button>
          <h2 className="text-7xl font-normal font-lora">Patient-centered care</h2>
          <p className="text-gray-600 font-montserrat text-lg">
            This is the space to introduce the Services section. Briefly describe the types of
            services offered and highlight any special benefits or features.
          </p>
        </div>

        {/* Cards Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
          data-aos="fade-up"
        >
          <div className="flex items-center justify-center p-8 bg-[#A35220] rounded-2xl text-white font-lora text-4xl shadow-md h-72">
            Holistic care
          </div>
          <div className="flex items-center justify-center p-8 bg-[#DDE9FF] rounded-full text-center shadow-md font-lora text-4xl h-72">
            Personalized plans
          </div>
          <div className="flex items-center justify-center p-8 bg-[#4A5653] rounded-2xl text-white font-lora text-4xl shadow-md h-72">
            Experienced staff
          </div>
          <div className="flex items-center justify-center p-8 bg-[#B5D4C5] rounded-full text-center shadow-md font-lora text-4xl h-72">
            Advanced technology
          </div>
          <div className="flex items-center justify-center p-8 bg-[#5E6A9C] rounded-2xl text-white shadow-md text-4xl font-lora h-72">
            Family support
          </div>
          <div className="flex items-center justify-center p-8 bg-[#FFF4C3] rounded-full text-center shadow-md font-lora text-4xl h-72">
            Online appointments
          </div>
        </div>
      </div>
    </div>
  );
}
