// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import 'aos/dist/aos.css';

export default function NavbarSection() {
    // For animation
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    //menu button
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('#menu-button') && !event.target.closest('#menu-items')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);


    return (
        <div className='py-4'>
            <header className='w-full h-20 flex items-center bg-indigo-200 rounded-3xl px-4'>
                <a href="/">
                    <img src="./src/assets/medico.jpeg" className='h-16 rounded-3xl' alt="Medico-Logo" />
                </a>
                <p className='text-black font-montserrat font-bold text-3xl ml-4'>Medico</p>
                <nav className="ml-auto">
                    <button
                        type="button"
                        className="rounded-full p-2 bg-white text-lg font-normal text-black hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        id="menu-button"
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    {isMenuOpen && (
                        <div
                            id="menu-items"
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                        >
                            <div className="py-1">
                                {['Patient Signup',  'Patient Login', 'Patient Dashboard', 'Doctor Signup', 'Doctor Login', 'Doctor Dashboard'].map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                                        className='block px-4 py-2 text-lg text-black font-lora hover:text-blue-700'
                                        role='menuitem'
                                        onClick={handleMenuItemClick}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>
            </header>
        </div>
    );
}





