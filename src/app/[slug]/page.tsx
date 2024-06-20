"use client"
import ProductFilter from '@/components/ProductFilter';
import Products from '@/components/Products';
import useFilterStore from '@/store/useFilterStore';
import * as React from 'react';

interface PageProps {
    params: {
      slug: string
    }
  }
  

 const page =  ({params}: PageProps) => {
const {slug} = params

const setSlug = useFilterStore((state) => state.setSlug);

setSlug(slug)
    return (
      <div  className="lg:h-[92.3vh] border-t-2 border-slate-300 w-screen h-[200vh] flex lg:flex-row  flex-col-reverse ">
         <ProductFilter  />
         <Products />
      </div>
    );
};
export default page