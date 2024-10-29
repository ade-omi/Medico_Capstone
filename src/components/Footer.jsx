// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Logo Section */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold mb-4">Medico</h3>
        </div>

        {/* Contact Information */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="font-semibold">Get in Touch</h4>
          <p>123-456-7890</p>
          <p>hello@medico.com</p>
          <h4 className="font-semibold mt-4">Visit us</h4>
          <p>7899 McLaughlin Rd</p>
          <p>Brampton, ON L6Y 0J8</p>
        </div>

        {/* Social Links */}
        {/* <div className="md:col-span-1 space-y-4">
          <h4 className="font-semibold">Social</h4>
          <p>Instagram</p>
          <p>Facebook</p>
        </div> */}

        {/* Legal Information */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="font-semibold">Legal</h4>
          <p>Privacy policy</p>
          <p>Accessibility Statement</p>
        </div>

        {/* Menu */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="font-semibold">Menu</h4>
          <p>About</p>
          <p>Services</p>
          <p>Insurance</p>
          <p>Contact</p>
          <p>FAQ</p>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-700 pt-6 text-sm text-gray-400">
        <p>© 2024 by Medico. </p>
      </div>
    </footer>
  );
}
