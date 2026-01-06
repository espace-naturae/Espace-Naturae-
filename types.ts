
export interface ProductOption {
  label: string;
  price: number | string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number | string;
  description: string;
  ingredients: string[];
  image: string;
  options?: ProductOption[];
  inci?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedOption?: ProductOption;
}

export type View = 'home' | 'shop' | 'about' | 'product' | 'glossary';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface GlossaryItem {
  name: string;
  inci: string;
  description: string;
}