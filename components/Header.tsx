
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-2">
      <div className="relative">
        <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-25 animate-pulse"></div>
        <img 
          src="https://cdn.onlineradiobox.com/img/l/4/152174.v1.png" 
          alt="Radio Burkina Logo" 
          className="relative w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
        />
      </div>
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-md">
          RADIO BURKINA
        </h1>
        <p className="text-yellow-400 font-bold tracking-widest text-sm md:text-base">
          LA VOIX DU FASO • 92.2 FM
        </p>
      </div>
    </div>
  );
};

export default Header;
