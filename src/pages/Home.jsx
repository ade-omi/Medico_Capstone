// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// import NavbarSection from '../components/Navbar';
// import Footer from '../components/Footer';





import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from '../components/HeroSection';
import PatientCareSection from '../components/PatientCareSection';
import TeamAndTestimonials from '../components/TeamSection';
import ContactUsSection from '../components/ContactSection';
import AboutSection from '../components/About';



function Home(){
    useEffect(() => {
        AOS.init({ duration: 1000});
    }, []);

    return(
        <>
            
            <HeroSection /> 
            <AboutSection />
            <PatientCareSection /> 
            <TeamAndTestimonials /> 
            <ContactUsSection /> 
        
        </>
    );
}

export default Home;