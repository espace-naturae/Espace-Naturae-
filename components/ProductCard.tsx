import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  const isIframe = product.image.trim().startsWith('<iframe');
  const isAvailable = product.price !== 'Bientôt disponible';
  
  const renderMedia = () => {
    if (isIframe) {
      const responsiveIframe = product.image
        .replace(/width="[^"]*"/, 'width="100%"')
        .replace(/height="[^"]*"/, 'height="100%"');
      return (
        <div 
          className="w-full h-full pointer-events-none bg-gray-50 flex items-center justify-center overflow-hidden"
          dangerouslySetInnerHTML={{ __html: responsiveIframe }}
        />
      );
    }
    return (
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-gray-100 mb-4 aspect-[4/5] cursor-pointer" onClick={() => onViewDetails(product)}>
        {renderMedia()}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/80 backdrop-blur-sm flex flex-col gap-2">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onViewDetails(product);
            }}
            className={`w-full py-2 text-[10px] tracking-widest uppercase font-bold transition-all ${
              isAvailable 
                ? 'text-eucalyptus border border-eucalyptus hover:bg-eucalyptus hover:text-white' 
                : 'text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white'
            }`}
          >
            {isAvailable ? 'Découvrir' : 'Bientôt disponible'}
          </button>
          {isAvailable && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                onAddToCart(product);
              }}
              className="w-full py-2 text-[10px] tracking-widest uppercase font-bold bg-eucalyptus text-white hover:bg-gray-800 transition-all"
            >
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
      <div className="text-center px-2">
        <h3 className="text-xl font-medium text-gray-900 mb-1 serif">{product.name}</h3>
        <p className="text-sm text-gray-500 italic mb-2 font-sans">{product.category}</p>
        <p className="text-eucalyptus font-light font-sans">
          {product.price}{typeof product.price === 'number' ? '$' : ''}
        </p>
      </div>
    </div>
  );
};