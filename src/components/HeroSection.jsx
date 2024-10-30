// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function NavbarSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleAppointmentClick = () => {
    window.location.href = '/patient-login'; 
  };

  return (
    <div className="relative h-screen">
      <img
        src="./src/assets/img1.jpg"
        alt="Family Medical Center in San Francisco"
        className="w-full h-full object-cover"
      />

      <div
        className="absolute bottom-16 left-10 text-white"
        data-aos="fade-up"
      >
        <p className="font-montserrat text-xl font-medium mb-2">
          Family Healthcare System in Canada
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-lora font-bold mt-2 leading-tight">
          Healthcare <br />
          one click away
        </h1>
        <button
          className="bg-yellow-200 text-blue-900 font-semibold py-3 px-6 rounded-full mt-6 hover:bg-yellow-300"
          onClick={handleAppointmentClick}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}
