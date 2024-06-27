"use client"


import useFilterStore from '@/store/useFilterStore';
import * as React from 'react';

interface IAppProps {
}

 const ProductCard = ()=> {
    const products = useFilterStore((state) => state.products);
    console.log(products);
    

       return <>{products?.map((item : any,i:number)=>{
         console.log("http://localhost:1337/uploads/"+item.attributes.images.data[0].attributes.name);

           return <div key={i} className='h-[320px] w-[330px] border-2 border-slate-300 flex flex-col rounded-md overflow-hidden  cursor-pointer  bg-white text-black'>
<div className=' w-full relative   h-[80%]'>            <img src={"http://localhost:1337"+item.attributes.images.data[0].attributes.formats.thumbnail.url} alt="" className='absolute h-full w-full object-fill' />
</div>                 
<span className='px-4 h-[10%] w-full flex items-center justify-start '>{item.attributes.price}$</span> 
<hr className='w-full h-[1px] bg-black ' />
<span className='font-semibold text-xl px-4 h-[10%] w-full flex items-center justify-start  '>{item.attributes.name}</span>    

              </div>
                })}</>
      
    
}
export default ProductCard