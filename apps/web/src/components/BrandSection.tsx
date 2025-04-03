import React from 'react';

function BrandSection() {
  return (
    <section className="mt-12 pb-8">
      <h3 className="text-xl font-semibold text-center mb-6">
        Featured Brands
      </h3>
      <div className="flex flex-wrap justify-center gap-8">
        {[
          'AMD',
          'Intel',
          'NVIDIA',
          'Corsair',
          'ASUS',
          'MSI',
          'Samsung',
          'Seagate',
        ].map((brand) => (
          <div
            key={brand}
            className="w-24 h-16 flex items-center justify-center bg-white p-2 rounded shadow-sm"
          >
            <img
              src={`https://example.com/logos/${brand.toLowerCase()}.png`}
              alt={brand}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandSection;
