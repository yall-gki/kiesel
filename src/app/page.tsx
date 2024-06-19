import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Atkinson_Hyperlegible } from "next/font/google";
import { ArrowRight } from "lucide-react";
import Categories  from "@/components/Categories";

const DosisF = Atkinson_Hyperlegible({ weight: "400", subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <div className="lg:h-[92.3vh] w-screen h-[200vh] flex lg:flex-row  flex-col-reverse ">
   <Categories />

        <div className="relative h-full lg:w-1/2 w-full  ">
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
            alt=""
            className="object-cover absolute w-full h-full grayscale-[100%]  "
          />
        </div>
      </div>
    </>
  );
}
