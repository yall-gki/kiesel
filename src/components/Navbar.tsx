import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Icons } from "./Icons";
import { Comic_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import Link from "next/link";

const DosisF = Comic_Neue({ weight: "400", subsets: ["latin"] });

export interface IAppProps {}

export function Navbar(props: IAppProps) {
  return (
    <nav
      className={cn(
        "px-6 py-4 flex items-center justify-between "
      )}
    >
      <span className="logo text-4xl  font-light text-zinc-800">
        <Link href='/'>Kiesel</Link>
        
      </span>
      <div className="flex gap-4 items-center  text-zinc-800 ">
        <Icons.cart size="150px" />
        
        <Link href="/sign-in" className={cn("font-sans   ", buttonVariants())}>
          Sign In
        </Link>
      
      </div>
    </nav>
  );
}
