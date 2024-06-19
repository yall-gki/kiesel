
import * as React from 'react';
import ProductCard from './ui/ProductCard';

interface IAppProps {
}

 const Products = (props: IAppProps)=> {
    return (
      <div className='h-full p-6 flex flex-wrap w-screen '>
        <ProductCard  />
      </div>
    );
}
export default Products