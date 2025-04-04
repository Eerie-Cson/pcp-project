import React, { useState } from 'react';

export function Header() {
  const [activeButton, setButton] = useState<string>('builder');

  const handleClick = (button: string) => {
    setButton(button);
    //Route Here
  };
  return (
    <header className="flex justify-between items-center p-4 md:p-8 bg-gray-900 text-white">
      <div className="logo">
        <h1 className="text-2xl text-green-400">PC Picker</h1>
        <p className="text-sm text-gray-400">Build your ultimate gaming rig</p>
      </div>
      <nav className="hidden md:flex gap-4">
        <button
          className={`${activeButton === 'builder' ? 'border-b-2 border-green-400 text-green-400 bg-green-400' : 'text-white'}bg-transparent  py-2 px-4 hover:text-green-400`}
          onClick={() => handleClick('builder')}
        >
          Builder
        </button>
        <button
          className={`${activeButton === 'prebuild' ? 'border-b-2  border-green-400 text-green-400 bg-green-400' : 'text-white'}bg-transparent  py-2 px-4 hover:text-green-400`}
          onClick={() => handleClick('prebuild')}
        >
          Pre-builds
        </button>
        <button
          className={`${activeButton === 'guides' ? 'border-b-2 border-green-400 text-green-400 bg-green-400' : 'text-white'}bg-transparent  py-2 px-4 hover:text-green-400`}
          onClick={() => handleClick('guides')}
        >
          Guides
        </button>
        <button
          className={`${activeButton === 'community' ? 'border-b-2 border-green-400 text-green-400 bg-green-400' : 'text-white'}bg-transparent  py-2 px-4 hover:text-green-400`}
          onClick={() => handleClick('community')}
        >
          Community
        </button>
      </nav>
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Save Build
        </button>
        <button className="bg-transparent border border-white text-white py-2 px-4 rounded hover:border-green-400 hover:text-green-400">
          My Account
        </button>
      </div>
    </header>
  );
}
