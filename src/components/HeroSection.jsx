// eslint-disable-next-line no-unused-vars
import React, { useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function NavbarSection(){
    useEffect(() => { 
        AOS.init({ duration: 1000});
    }, []);

    return (
        <div className='h-screen'>  
    <img src="./src/assets/img1.jpg" alt="Hero-section Image" className='w-full h-full object-cover'/>

    
<div className="absolute bottom-16 left-10 text-white">
    <p className="font-montserrat text-xl font-medium mb-2">Family Medical Center in San Francisco</p>
    <h1 className="text-9xl font-lora font-bold mt-2 leading-tight">
      Healthcare <br />
      focused on you
    </h1>
    <button className="bg-yellow-200 text-blue-900 font-semibold py-3 px-6 rounded-full mt-6 hover:bg-yellow-300">
      Book an Appointment
    </button>
  </div>

  </div> 

    );
}
