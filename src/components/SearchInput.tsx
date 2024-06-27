// ProductFilter.tsx
import React from 'react';
import useFilterStore from '../store/useFilterStore';
import { TextField } from '@mui/material';


const SearchInput = () => {
  
  const inputalue = useFilterStore((state) => state.inputValue);
  const setInputValue = useFilterStore((state) => state.setInputValue);
  // Using SWR to fetch categories

  return (
    <div className="w-full flex items-center justify-center mb-6">
  <TextField style={{
    border : "2px "
  }} className='border-4' id="outlined-basic" label="Search" variant="outlined" 
   onChange={(e)=>setInputValue(e.target.value)}
   />
    </div>
  );
};

export default SearchInput;
