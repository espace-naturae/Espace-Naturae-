
import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1920" 
          alt="Champ de fleurs sauvages et nature lumineuse" 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1920";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-eucalyptus tracking-[0.3em] uppercase text-sm mb-4 block animate-fade-in font-sans font-medium">
            Artisanat & simplicité
          </span>
          <p className="text-lg text-gray-700 mb-10 max-w-lg leading-relaxed font-light font-sans">
            Des soins naturels, simples et artisanaux, créés avec des ingrédients soigneusement sélectionnés pour nourrir la peau en douceur.
          </p>
          <button 
            onClick={onExplore}
            className="bg-eucalyptus text-white px-10 py-4 tracking-widest uppercase text-xs hover:bg-gray-800 transition-all duration-300 font-sans font-bold shadow-lg"
          >
            Découvrir la collection
          </button>
        </div>
      </div>
    </section>
  );
};
