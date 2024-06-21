
import * as React from 'react';
import ProductCard from './ui/ProductCard';

interface IAppProps {
}

 const Products = (props: IAppProps)=> {
    return (
      <div className='h-full p-6 flex flex-wrap gap-6 w-screen '>
        <ProductCard  />
      </div>
    );
}
export default Products