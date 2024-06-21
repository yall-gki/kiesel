"use client";

import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useFilterStore from '../store/useFilterStore';

interface Category {
  title: string;
  slug: { current: string };
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get('/api/categories');
  return data;
};
  

const CategoriesFilter = () => {
  const selectedCategories = useFilterStore((state) => state.categories);
  const setCategories = useFilterStore((state) => state.setCategories);
  const slug = useFilterStore((state) => state.slug);

  const { data: categories, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (slug) {
      setCategories([slug as string]);
    }
  }, [slug, setCategories]);

  const handleCategoryChange = (categorySlug: string) => {
    const updatedCategories = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter((c) => c !== categorySlug)
      : [...selectedCategories, categorySlug];
    setCategories(updatedCategories);
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
            value={category.slug.current}
            checked={selectedCategories.map(c => c.toLowerCase()).includes(category.slug.current.toLowerCase())}
            onChange={() => handleCategoryChange(category.slug.current.toLowerCase())}
          />
          <span className="text-zinc-800 font-semibold">{category.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoriesFilter;
