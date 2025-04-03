import { useState } from "react";

type ComponentType =
  | "CPU"
  | "GPU"
  | "Motherboard"
  | "RAM"
  | "Storage"
  | "PSU"
  | "Case"
  | "Cooling";

interface PcComponent {
  id: string;
  name: string;
  type: ComponentType;
  price: number;
  specs: Record<string, string | number>;
  brand: string;
  image: string;
  compatibility: string[];
  rating?: number;
  features?: string[];
}

export default function PcBuilder() {
  // Sample data with rich content
  const allComponents: PcComponent[] = [
    {
      id: "cpu-1",
      name: "AMD Ryzen 9 7950X",
      type: "CPU",
      price: 699,
      specs: {
        "Cores/Threads": "16/32",
        "Base Clock": "4.5GHz",
        "Boost Clock": "5.7GHz",
        Socket: "AM5",
        TDP: "170W",
        Cache: "80MB",
      },
      brand: "AMD",
      image: "https://example.com/cpu-amd.jpg",
      compatibility: ["AM5"],
      rating: 4.9,
      features: [
        "Zen 4 Architecture",
        "PCIe 5.0 Support",
        "DDR5 Memory Support",
      ],
    },
    {
      id: "gpu-1",
      name: "NVIDIA RTX 4090 Founders Edition",
      type: "GPU",
      price: 1599,
      specs: {
        "CUDA Cores": "16384",
        "Boost Clock": "2.52GHz",
        Memory: "24GB GDDR6X",
        "Memory Bus": "384-bit",
        "Power Connectors": "1x 16-pin",
        TDP: "450W",
      },
      brand: "NVIDIA",
      image: "https://example.com/rtx4090.jpg",
      compatibility: ["PCIe 4.0"],
      rating: 4.8,
      features: ["DLSS 3", "Ray Tracing", "AV1 Encoding"],
    },
    // Add 10+ more components with similar detail
  ];

  const [build, setBuild] = useState<PcComponent[]>([]);
  const [selectedType, setSelectedType] = useState<ComponentType>("CPU");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedComponent, setSelectedComponent] =
    useState<PcComponent | null>(null);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);

  // Filter components based on selections
  const filteredComponents = allComponents.filter(
    (comp) =>
      comp.type === selectedType &&
      comp.price >= priceRange[0] &&
      comp.price <= priceRange[1] &&
      comp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add component to build
  const addToBuild = (component: PcComponent) => {
    if (!build.some((item) => item.id === component.id)) {
      const newBuild = [...build, component];
      setBuild(newBuild);
      checkCompatibility(newBuild);
    }
  };

  // Remove component from build
  const removeFromBuild = (id: string) => {
    const newBuild = build.filter((item) => item.id !== id);
    setBuild(newBuild);
    checkCompatibility(newBuild);
  };

  // Check for compatibility issues
  const checkCompatibility = (currentBuild: PcComponent[]) => {
    const issues: string[] = [];

    // Example checks
    const hasCPU = currentBuild.some((c) => c.type === "CPU");
    const hasMB = currentBuild.some((c) => c.type === "Motherboard");

    if (hasCPU && hasMB) {
      const cpu = currentBuild.find((c) => c.type === "CPU")!;
      const mb = currentBuild.find((c) => c.type === "Motherboard")!;

      if (!mb.compatibility.includes(cpu.specs["Socket"] as string)) {
        issues.push(
          `CPU socket (${cpu.specs["Socket"]}) doesn't match motherboard (${mb.compatibility[0]})`
        );
      }
    }

    setCompatibilityIssues(issues);
  };

  // Calculate total price
  const totalPrice = build.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-8 bg-gray-900 text-white">
        <div className="logo">
          <h1 className="text-2xl text-green-400">PC Architect Pro</h1>
          <p className="text-sm text-gray-400">Build your ultimate gaming rig</p>
        </div>
        <nav className="hidden md:flex gap-4">
          <button className="bg-transparent border-b-2 border-green-400 text-green-400 py-2 px-4">Builder</button>
          <button className="bg-transparent text-white py-2 px-4 hover:text-green-400">Pre-builds</button>
          <button className="bg-transparent text-white py-2 px-4 hover:text-green-400">Guides</button>
          <button className="bg-transparent text-white py-2 px-4 hover:text-green-400">Community</button>
        </nav>
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save Build</button>
          <button className="bg-transparent border border-white text-white py-2 px-4 rounded hover:border-green-400 hover:text-green-400">My Account</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mx-auto w-full max-w-7xl">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12 rounded-2xl mb-8 text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Custom PC Builder</h2>
            <p className="text-lg text-gray-300 mb-8">Select compatible components and create your perfect system</p>
            <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
              <div className="text-center">
                <span className="block text-3xl font-bold text-green-400">15K+</span>
                <p className="text-gray-300">Components</p>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-green-400">100%</span>
                <p className="text-gray-300">Compatibility</p>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-green-400">4.9★</span>
                <p className="text-gray-300">Ratings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Component Selection */}
          <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Select Components</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "CPU",
                      "GPU",
                      "Motherboard",
                      "RAM",
                      "Storage",
                      "PSU",
                      "Case",
                      "Cooling",
                    ] as ComponentType[]
                  ).map((type) => (
                    <button
                      key={type}
                      className={`py-2 px-4 border rounded ${
                        selectedType === type 
                          ? "bg-blue-500 text-white border-blue-500" 
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 border border-gray-300 rounded"
                />
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseInt(e.target.value)])
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:translate-y-[-5px] hover:shadow-md transition duration-300"
                  onClick={() => setSelectedComponent(component)}
                >
                  <div className="mb-4">
                    <h4 className="text-base font-medium mb-1">{component.name}</h4>
                    <span className="text-sm text-gray-600">{component.brand}</span>
                  </div>
                  <div className="h-32 flex items-center justify-center mb-4 bg-gray-100 rounded">
                    <img src={component.image} alt={component.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="mb-4">
                    {Object.entries(component.specs)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between mb-2 text-sm">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-800">${component.price}</span>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded text-sm hover:bg-blue-600 transition duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToBuild(component);
                      }}
                    >
                      Add to Build
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Build Panel */}
          <div className="bg-white rounded-lg p-6 shadow lg:sticky lg:top-4">
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Your Build</h3>
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 p-3 rounded text-center">
                  <span className="block text-sm text-gray-600 mb-1">Components</span>
                  <span className="font-bold">{build.length}/8</span>
                </div>
                <div className="bg-gray-100 p-3 rounded text-center">
                  <span className="block text-sm text-gray-600 mb-1">Total Price</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                <div className="bg-gray-100 p-3 rounded text-center">
                  <span className="block text-sm text-gray-600 mb-1">Est. Wattage</span>
                  <span className="font-bold">750W</span>
                </div>
              </div>

              {compatibilityIssues.length > 0 && (
                <div className="bg-yellow-100 p-4 rounded mb-6">
                  <h4 className="text-yellow-800 font-medium mb-2">⚠️ Compatibility Issues</h4>
                  <ul className="list-inside">
                    {compatibilityIssues.map((issue, i) => (
                      <li key={i} className="text-sm text-yellow-800">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-6">
                {build.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Add components to start your build
                  </p>
                ) : (
                  <ul>
                    {build.map((item) => (
                      <li key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                        <div>
                          <span className="block text-xs text-gray-500 uppercase">{item.type}</span>
                          <span className="block text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-blue-800">${item.price}</span>
                        </div>
                        <button
                          className="text-red-500 text-xl px-2 hover:text-red-600"
                          onClick={() => removeFromBuild(item.id)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button className="border border-red-500 text-red-500 py-3 rounded hover:bg-red-50 transition duration-300">Clear Build</button>
                <button className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300">Save Configuration</button>
                <button className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-300">Checkout</button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        <section className="mt-12 pb-8">
          <h3 className="text-xl font-semibold text-center mb-6">Featured Brands</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "AMD",
              "Intel",
              "NVIDIA",
              "Corsair",
              "ASUS",
              "MSI",
              "Samsung",
              "Seagate",
            ].map((brand) => (
              <div key={brand} className="w-24 h-16 flex items-center justify-center bg-white p-2 rounded shadow-sm">
                <img
                  src={`https://example.com/logos/${brand.toLowerCase()}.png`}
                  alt={brand}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Component Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedComponent(null)}
            >
              ×
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">{selectedComponent.name}</h3>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="inline-block bg-gray-100 py-1 px-3 rounded text-sm">{selectedComponent.brand}</span>
                <span className="text-xl font-bold text-blue-800 mr-4">${selectedComponent.price}</span>
                {selectedComponent.rating && (
                  <span className="inline-flex items-center bg-gray-100 py-1 px-3 rounded text-sm text-yellow-500">
                    {selectedComponent.rating} ★
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center bg-gray-100 p-8 rounded">
                <img
                  src={selectedComponent.image}
                  alt={selectedComponent.name}
                  className="max-w-full max-h-72 object-contain"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Specifications</h4>
                <table className="w-full">
                  <tbody>
                    {Object.entries(selectedComponent.specs).map(
                      ([key, value]) => (
                        <tr key={key} className="border-b border-gray-200 last:border-b-0">
                          <td className="py-2 text-gray-600">{key}</td>
                          <td className="py-2">{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                {selectedComponent.features && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Key Features</h4>
                    <ul className="list-inside">
                      {selectedComponent.features.map((feature, i) => (
                        <li key={i} className="mb-2">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => {
                  addToBuild(selectedComponent);
                  setSelectedComponent(null);
                }}
              >
                Add to Build
              </button>
              <button className="border border-blue-500 text-blue-500 py-3 px-6 rounded hover:bg-blue-50 transition duration-300">
                Compare
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-green-400">PC Architect</h4>
            <p className="text-gray-300">Build your dream PC with our comprehensive tools and guides</p>
          </div>
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-green-400">Resources</h4>
            <ul>
              <li className="mb-2 hover:text-green-400 cursor-pointer">Build Guides</li>
              <li className="mb-2 hover:text-green-400 cursor-pointer">Component Reviews</li>
              <li className="mb-2 hover:text-green-400 cursor-pointer">Compatibility Guide</li>
              <li className="mb-2 hover:text-green-400 cursor-pointer">Benchmarks</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Support</h4>
            <ul>
              <li className="mb-2 hover:text-green-400 cursor-pointer">Contact Us</li>
              <li className="mb-2 hover:text-green-400 cursor-pointer">FAQ</li>
              <li className="mb-2 hover:text-green-400 cursor-pointer">Returns</li>
              <li className="mb-2 hover:text-green-400 cursor-pointer">Shipping</li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 mt-8 border-t border-gray-800">
          <p className="text-gray-400">© 2023 PC Architect Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}