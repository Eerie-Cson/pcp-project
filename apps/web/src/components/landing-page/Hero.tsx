import React from 'react';

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12 rounded-2xl mb-8 text-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">Custom PC Builder</h2>
        <p className="text-lg text-gray-300 mb-8">
          Select compatible components and create your perfect system
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
          <div className="text-center">
            <span className="block text-3xl font-bold text-green-400">
              15K+
            </span>
            <p className="text-gray-300">Components</p>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-green-400">
              100%
            </span>
            <p className="text-gray-300">Compatibility</p>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-green-400">
              4.9★
            </span>
            <p className="text-gray-300">Ratings</p>
          </div>
        </div>
      </div>
    </section>
  );
}
