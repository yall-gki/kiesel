// useFilterStore.ts
import { create } from 'zustand';

interface FilterState {
  categories: string[];
  priceRange: number[];
  products: Product[]; // Array to hold products
  setCategories: (categories: string[]) => void;
  setPriceRange: (priceRange: number[]) => void;
  setProducts: (products: Product[]) => void; // Setter for products
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  // Add more fields as needed
}

const useFilterStore = create<FilterState>((set) => ({
  categories: [],
  priceRange: [0, 1500],
  products: [], // Initialize products array
  setCategories: (categories) => set({ categories }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setProducts: (products) => set({ products }), // Setter function for products
}));

export default useFilterStore;
