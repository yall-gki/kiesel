"use client"


import useFilterStore from '@/store/useFilterStore';
import * as React from 'react';

interface IAppProps {
}

 const ProductCard = ()=> {
    const products = useFilterStore((state) => state.products);

       return <>{products?.map((item : any,i:number)=>{
        
           return <div key={i} className='h-[400px] w-[260px] border-2 border-slate-300 flex flex-col rounded-md overflow-hidden  cursor-pointer  bg-white text-black'>
<div className=' w-full relative   h-[80%]'>            <img src={item.imageUrl} alt="" className='absolute h-full w-full object-fill' />
</div>                 
<span className='px-4 h-[10%] w-full flex items-center justify-start '>{item.price}$</span> 
<hr className='w-full h-[1px] bg-black ' />
<span className='font-semibold text-xl px-4 h-[10%] w-full flex items-center justify-start  '>{item.name}</span>    

              </div>
                })}</>
      
    
}
export default ProductCard