// ProductFilter.tsx
import React from 'react';
import axios from 'axios';
import useFilterStore from '../store/useFilterStore';
import CategoriesFilter from './CategoriesFilter';
import PriceFilter from './PriceFilter';
import useSWR from 'swr';
import SearchInput from './SearchInput';

interface Category {
  title: string;
  slug: { current: string };
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get('/api/categories');
  return data;
};

const ProductFilter = () => {
  const categories = useFilterStore((state) => state.categories);
  const priceRange = useFilterStore((state) => state.priceRange);
  const inputValue = useFilterStore((state) => state.inputValue)
  const setProducts = useFilterStore((state) => state.setProducts);

  // Using SWR to fetch categories
  const { data: categoriesData, error: categoriesError } = useSWR<Category[], Error>(
    '/api/categories',
    fetchCategories
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
    

    const query = {
      search : inputValue,
      categories: categories.join(','),
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };

    try {
      const response = await axios.get('/api/products', {
        params: query,
      });
      setProducts(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error
    }
  };

  if (!categoriesData && !categoriesError) return <div>Loading...</div>;
  if (categoriesError) return <div>Error fetching categories</div>;

  return (
    <div className="flex flex-col gap-4 w-1/6 lg:border-slate-300 items-center justify-start border-r-2 pt-4 px-6">
      <h2 className="text-2xl w-full font-semibold">FILTERS</h2>
      <hr className="w-full h-[2px] bg-slate-400 pr-8" />
      <form className="w-full lg:h-full flex flex-col items-start justify-start" onSubmit={handleSubmit}>
        <SearchInput />
        <CategoriesFilter  />
        <PriceFilter />
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default ProductFilter;
