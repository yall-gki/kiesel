"use client";

import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useFilterStore from '../store/useFilterStore';

interface Category {
  title: string;
}

const CategoriesFilter: React.FC = () => {
  const { data: categories, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const selectedCategories = useFilterStore((state) => state.categories);
  const setCategories = useFilterStore((state) => state.setCategories);

  async function fetchCategories(): Promise<Category[]> {
    const { data } = await axios.get('/api/categories');
    return data;
  }

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setCategories(newCategories);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching categories</div>;

  return (
    <div className="h-auto flex flex-col gap-2 text-slate-50 justify-between items-start">
      {categories?.map((category, i) => (
        <div key={i} className="flex gap-4 justify-start items-center">
          <input
            className="h-4 w-full scale-150"
            type="checkbox"
            name="category"
            value={category.title}
            checked={selectedCategories.includes(category.title.toUpperCase())}
            onChange={() => handleCategoryChange(category.title.toUpperCase())}
          />
          <span className="text-zinc-800 font-semibold">{category.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoriesFilter;
