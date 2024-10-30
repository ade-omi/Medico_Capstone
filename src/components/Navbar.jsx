// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import 'aos/dist/aos.css';

export default function NavbarSection() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

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
                                {['Patient Signup', 'Patient Dashboard', 'Patient Login', 'Doctor Signup', 'Doctor Login', 'Doctor Dashboard'].map((item, index) => (
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





// My Version 1.0
{/* <div className='py-4 '>
<header className='  w-full h-32 flex items-center  bg-indigo-200 rounded-3xl px-2 py-5 '>
   <a href="/">
    <img src="./src/assets/medico.jpeg" className='h-28 rounded-3xl' alt="Medico-Logo" />
  </a> 
<p className='text-black-600 font-lora font-bold text-8xl '>Medico</p>
<nav className="ml-auto ">
    <ul className=" flex space-x-4 ">
      <li><a className=" text-black-500 font-lora text-xl font-normal hover:text-blue-700" href="#how">How it works</a></li>
      <li><a className=" text-black-500 font-lora text-xl hover:text-blue-700" href="#appointments">Appointments</a></li>
      <li><a className=" text-black-500 font-lora text-xl hover:text-blue-700" href="#about">About</a></li>
      <li><a className=" text-black-500 font-lora text-xl hover:text-blue-700" href="#prescription">Prescription</a></li>
      <li><a className=" text-black-500 font-lora text-xl hover:text-blue-700" href="/patient-login">Patient Login</a></li>
      {/* <li><a className=" text-black-500 font-lora text-xl hover:text-blue-700" href=".././src/pages/PatientSignup">Patient Signup</a></li> */}
    //   <li><Link to='/patient-signup' className='text-black-500 font-lora text-xl hover:text-blue-700'>PatientSingup</Link></li>
    //   <li><a className=" text-black-500 font-lora text-xl hover:text-blue-700" href="/doctor-login">Doctor Login</a></li>
//     </ul>
//   </nav>
// </header> */}
// </div>

// My Code Version 2.0 with   (Dark Mode Toggle)

// import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import { Link } from 'react-router-dom';
// import 'aos/dist/aos.css';
// import { FaSun, FaMoon } from 'react-icons/fa';

// export default function NavbarSection() {
//     useEffect(() => {
//         AOS.init({ duration: 1000 });
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme) {
//             document.documentElement.classList.add(savedTheme);
//         }
//     }, []);

//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

//     const handleMenuItemClick = () => {
//         setIsMenuOpen(false);
//     };

//     const toggleDarkMode = () => {
//         const newTheme = isDarkMode ? 'light' : 'dark';
//         setIsDarkMode(!isDarkMode);
//         document.documentElement.classList.remove(isDarkMode ? 'dark' : 'light');
//         document.documentElement.classList.add(newTheme);
//         localStorage.setItem('theme', newTheme);
//     };

//     return (
//         <div className='py-4'>
//             <header className='w-full h-32 flex items-center bg-indigo-200 dark:bg-indigo-900 rounded-3xl px-2 py-5'>
//                 <a href="/">
//                     <img src="./src/assets/medico.jpeg" className='h-28 rounded-3xl' alt="Medico-Logo" />
//                 </a>
//                 <p className='text-black-600 dark:text-white font-lora font-bold text-4xl md:text-6xl lg:text-8xl'>Medico</p>
//                 <nav className="ml-auto flex items-center gap-4">
//                     <div className="relative inline-block text-left">
//                         <div>
//                             <button 
//                                 type="button" 
//                                 className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-lg md:text-xl font-normal font-lora text-black-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" 
//                                 id="menu-button" 
//                                 aria-expanded={isMenuOpen} 
//                                 aria-haspopup="true"
//                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             >
//                                 Menu
//                                 <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                 </svg>
//                             </button>
//                         </div>

//                         {isMenuOpen && (
//                             <div className="origin-top-right absolute right-0 mt-2 w-48 md:w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
//                                 <div className="py-1" role="none">
//                                     <Link to='/patient-signup' className='block px-4 py-2 text-lg md:text-xl text-black-500 dark:text-white font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Patient Signup</Link>
//                                     <Link to='/patient-login' className='block px-4 py-2 text-lg md:text-xl text-black-500 dark:text-white font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Patient Login</Link>
//                                     <Link to='/doctor-signup' className='block px-4 py-2 text-lg md:text-xl text-black-500 dark:text-white font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Doctor Signup</Link>
//                                     <Link to='/doctor-login' className='block px-4 py-2 text-lg md:text-xl text-black-500 dark:text-white font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Doctor Login</Link>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <button
//                         onClick={toggleDarkMode}
//                         className="p-2 rounded-full bg-white dark:bg-gray-800 text-black-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                         {isDarkMode ? <FaSun /> : <FaMoon />}
//                     </button>
//                 </nav>
//             </header>
//         </div>
//     );
// }


//  My Code Version 3.0 
// import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import { Link } from 'react-router-dom';
// import 'aos/dist/aos.css';

// export default function NavbarSection() {
//     useEffect(() => {
//         AOS.init({ duration: 1000 });
//     }, []);

//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const handleMenuItemClick = () => {
//         setIsMenuOpen(false);
//     };


//     return (
//         <div className='py-4'>
//             <header className='w-full h-20 flex items-center bg-indigo-200 rounded-3xl px-2 py-5'>
//                 <a href="/">
//                     <img src="./src/assets/medico.jpeg" className='h-16 rounded-3xl ' alt="Medico-Logo" />
//                 </a>
//                 <p className='text-black-600 font-montserrat font-bold text-6xl '>Medico</p>
//                 <nav className="ml-auto">
//                     <div className="relative inline-block text-left">
//                         <div>
//                             <button 
//                                 type="button" 
//                                 className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-lg md:text-xl font-normal font-lora text-black-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
//                                 id="menu-button" 
//                                 aria-expanded={isMenuOpen} 
//                                 aria-haspopup="true"
//                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             >
//                                 Menu
//                                 <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                     <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                 </svg>
//                             </button>
//                         </div>

//                         {isMenuOpen && (
//                             <div className="origin-top-right absolute right-0 mt-2 w-48 md:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
//                                 <div className="py-1" role="none">
//                                     <Link to='/patient-signup' className='block px-4 py-2 text-lg md:text-xl text-black-500 font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Patient Signup</Link>
//                                     <Link to='/patient-dashboard' className='block px-4 py-2 text-lg md:text-xl text-black-500 font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Patient Dashboard</Link>
//                                     <Link to='/patient-login' className='block px-4 py-2 text-lg md:text-xl text-black-500 font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Patient Login</Link>
//                                     <Link to='/doctor-signup' className='block px-4 py-2 text-lg md:text-xl text-black-500 font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Doctor Signup</Link>
//                                     <Link to='/doctor-login' className='block px-4 py-2 text-lg md:text-xl text-black-500 font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Doctor Login</Link>
//                                     <Link to='/doctor-dashboard' className='block px-4 py-2 text-lg md:text-xl text-black-500 font-lora hover:text-blue-700' role='menuitem' tabIndex='-1' id='menu-item-5' onClick={handleMenuItemClick}>Doctor Dashboard</Link>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </nav>
//             </header>
//         </div>
//     );
// }
