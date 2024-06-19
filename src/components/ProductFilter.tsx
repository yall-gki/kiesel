"use client"

// ProductFilter.tsx
import React from 'react';
import axios from 'axios';
import CategoriesFilter from './CategoriesFilter';
import PriceFilter from './PriceFilter';
import useFilterStore from '../store/useFilterStore';

const ProductFilter: React.FC = () => {
  const categories = useFilterStore((state) => state.categories);
  const priceRange = useFilterStore((state) => state.priceRange);
  const setProducts = useFilterStore((state) => state.setProducts);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = {
      categories: categories.join(','),
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };

    try {
      const response = await axios.get('/api/products', {
        params: query,
      });
      setProducts(response.data);
      
      
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error
    }
  };

  return (
    <div className="flex flex-col gap-4 w-1/6 lg:border-slate-300 items-center justify-start border-r-2 pt-4 px-6">
      <h2 className="text-2xl w-full font-semibold">FILTERS</h2>
      <hr className="w-full h-[2px] bg-slate-400 pr-8" />
      <form className="w-full lg:h-full flex flex-col items-start justify-start" onSubmit={handleSubmit}>
        <CategoriesFilter />
        <PriceFilter />
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default ProductFilter
