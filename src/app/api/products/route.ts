import { z } from "zod";
import { NextResponse } from "next/server";
import { getProducts } from "@/utils/sanity";

export const revalidate = 60;

interface ProductFilterParams {
  category: string[]; // Ensure 'categories' matches query parameter name
  minPrice?: number;
  maxPrice?: number;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      category: url.searchParams.getAll('categories'), // Ensure 'categories' matches query parameter name
      minPrice: parseQueryParamToInt(url.searchParams.get('minPrice')),
      maxPrice: parseQueryParamToInt(url.searchParams.get('maxPrice')),
    };
console.log(params);

    // Define a schema for validation
    const productFilterSchema = z.object({
      category: z.array(z.string()),
      minPrice: z.number().min(0).optional(),
      maxPrice: z.number().min(0).optional(),
    });

    // Validate params against the schema
    const validatedParams = productFilterSchema.parse(params) as ProductFilterParams;

    // Call getProducts with validated params
    const products = await getProducts(validatedParams);

    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return 400 Bad Request for validation errors
      return new Response(error.message, { status: 400 });
    }

    // Return 500 Internal Server Error for other errors
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Helper function to parse query parameter to integer
function parseQueryParamToInt(param: string | null | undefined): number | undefined {
  if (param === null || param === undefined || param.trim() === '') {
    return undefined; // Return undefined if param is empty or not provided
  }
  
  const parsedValue = parseInt(param, 10);
  return isNaN(parsedValue) ? undefined : parsedValue; // Return undefined if parsing fails
}
