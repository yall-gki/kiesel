"use client";

import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useFilterStore from '../store/useFilterStore';

interface Category {
  attributes : {

    name: string;
    slug:  string ;
  }
}


const CategoriesFilter = () => {
  const selectedCategories = useFilterStore((state) => state.categories);
  const setCategories = useFilterStore((state) => state.setCategories);
  const categories = useFilterStore((state) => state.categories);
  const slug = useFilterStore((state) => state.slug);

  console.log(categories);
  

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

  return (
    <div className="h-auto flex flex-col gap-2 text-slate-50 justify-between items-start">
      {categories?.map((category : any, i) => (
        <div key={i} className="flex gap-4 justify-start items-center">
          <input
            className="h-4 w-full scale-150"
            type="checkbox"
            name="category"
            value={category.attributes.slug.name}
            
            onChange={() => handleCategoryChange(category.attributes.slug.toLowerCase())}
          />
          <span className="text-zinc-800 font-semibold">{category.attributes.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoriesFilter;
