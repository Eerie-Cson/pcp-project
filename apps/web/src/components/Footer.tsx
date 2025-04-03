import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-4 text-green-400">
            PC Architect
          </h4>
          <p className="text-gray-300">
            Build your dream PC with our comprehensive tools and guides
          </p>
        </div>
        <div className="mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-4 text-green-400">
            Resources
          </h4>
          <ul>
            <li className="mb-2 hover:text-green-400 cursor-pointer">
              Build Guides
            </li>
            <li className="mb-2 hover:text-green-400 cursor-pointer">
              Component Reviews
            </li>
            <li className="mb-2 hover:text-green-400 cursor-pointer">
              Compatibility Guide
            </li>
            <li className="mb-2 hover:text-green-400 cursor-pointer">
              Benchmarks
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-green-400">Support</h4>
          <ul>
            <li className="mb-2 hover:text-green-400 cursor-pointer">
              Contact Us
            </li>
            <li className="mb-2 hover:text-green-400 cursor-pointer">FAQ</li>
            <li className="mb-2 hover:text-green-400 cursor-pointer">
              Returns
            </li>
            <li className="mb-2 hover:text-green-400 cursor-pointer">
              Shipping
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 mt-8 border-t border-gray-800">
        <p className="text-gray-400">
          © 2023 PC Architect Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
