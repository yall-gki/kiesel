import { getCategories } from "@/utils/sanity";
import { json } from "node:stream/consumers";
import {z} from "zod"
export async function GET(){
try {
    const categories = await getCategories()

    return new Response(JSON.stringify(categories))
} catch (error) {
    if(error instanceof z.ZodError)return new Response(error.message)
    
    
}






}
export const revalidate = 60
