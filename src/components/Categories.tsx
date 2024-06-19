"use client";
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

interface IAppProps {}

const Categories: React.FC<IAppProps> = (props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const fetchCategories = async () => {
    setIsFetching(true);
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
      setIsFetched(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="relative max-h-full overflow-y-hidden lg:w-1/2 bg-zinc-800 flex flex-col text-slate-50 justify-between h-full items-center w-full">
      {isFetching && <div>Loading...</div>}
      {isFetched && categories.map((item: any, i) => (
        <div
          key={i}
          className="flex items-center justify-between w-full hover:bg-zinc-700 transition duration-75 pointer-cursor"
          style={{ height: `calc(100% / ${categories.length})` }}
        >
          <div className="lg:p-8 p-5 w-full font-sans font-bold text-3xl lg:text-8xl">
            {item.title.toUpperCase()}
          </div>
         < Link href={`/${item.slug.current}`}>
          <div className="h-full lg:p-16 border-b-2 border-black text-slate-90 lg:text-zinc-800 lg:bg-zinc-50 flex justify-center items-center">
            <ArrowRight size={50}  />
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
