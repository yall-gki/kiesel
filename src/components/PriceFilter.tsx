"use client";

import React from "react";
import Slider from "@mui/material/Slider";
import useFilterStore from '../store/useFilterStore';

interface IAppProps {}

const PriceFilter: React.FC<IAppProps> = () => {
  const priceRange = useFilterStore((state) => state.priceRange);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;
    const updatedValue = [...priceRange];
    updatedValue[index] = parseInt(inputValue, 10);
    setPriceRange(updatedValue);
  };

  return (
    <div className="w-full pt-4 h-auto flex flex-col items-center justify-start">
      <hr className="w-full h-[3px] bg-slate-400 pr-8" />
      <h2 className="text-l w-full mt-6 font-semibold">PRICE</h2>
      <div className="w-full">
        <Slider
          getAriaLabel={() => "Price"}
          value={priceRange}
          min={0}
          max={1500}
          step={10}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </div>
      <div className="h-3/4 w-full flex gap-4">
        <div className="border-[1px] border-zinc-500 p-2">
          <span className="text-zinc-400">Min $</span>
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleInputChange(0)}
            className="outline-none w-full bg-slate-50"
          />
        </div>
        <div className="border-[1px] border-zinc-500 p-2">
          <span className="text-zinc-400">Max $</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleInputChange(1)}
            className="outline-none w-full bg-slate-50"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
