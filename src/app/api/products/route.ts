import { z } from "zod";
import { NextResponse } from "next/server";
import axios from "axios";

export const revalidate = 60;

interface ProductFilterParams {
  category: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export async function GET(request: Request) {
  try {
    const params = parseRequestParams(request);

    // Validate params against the schema
    const validatedParams = validateParams(params);

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

// Function to parse and sanitize query parameters from request
function parseRequestParams(request: Request): ProductFilterParams {
  const url = new URL(request.url);

  return {
    category: url.searchParams.getAll('categories'),
    minPrice: parseQueryParamToInt(url.searchParams.get('minPrice')),
    maxPrice: parseQueryParamToInt(url.searchParams.get('maxPrice')),
    search: url.searchParams.get('search') || undefined,
  };
}

// Helper function to parse query parameter to integer
function parseQueryParamToInt(param: string | null | undefined): number | undefined {
  if (!param || param.trim() === '') {
    return undefined; // Return undefined if param is empty or not provided
  }

  const parsedValue = parseInt(param, 10);
  return isNaN(parsedValue) ? undefined : parsedValue; // Return undefined if parsing fails
}

// Validate params against the schema using Zod
function validateParams(params: any): ProductFilterParams {
  const productFilterSchema = z.object({
    category: z.array(z.string()),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    search: z.string().optional(),
  });

  return productFilterSchema.parse(params) as ProductFilterParams;
}

// Function to fetch products including images
async function getProducts(params: ProductFilterParams) {
  const queryParts = [];

  if (params.category.length) {
    queryParts.push(`filters[category][name][$in]=${params.category.join(',')}`);
  }

  if (params.minPrice !== undefined) {
    queryParts.push(`filters[price][$gte]=${params.minPrice}`);
  }

  if (params.maxPrice !== undefined) {
    queryParts.push(`filters[price][$lte]=${params.maxPrice}`);
  }

  if (params.search) {
    queryParts.push(`filters[name][_contains]=${params.search}`);
  }

  // Include default filters for pagination, sorting, and publication state
  queryParts.push('_limit=10&_sort=createdAt:DESC&_publicationState=published&_locale=en');

  const queryString = queryParts.join('&');
  const url = `http://localhost:1337/api/products?${queryString}&populate=*`;

  const options = {
    headers: {
      Authorization: "Bearer b7be1a45b1dfa42a26d12ed6a6751edf05cb9db73d3817ab39a1c62352aae37559b60783ffda07a96463f9fa1e363bb1904c8887cf522d4319704e1056b07dc17cc55e99350078c55ac7ec9c2d80eb92a6c1e1cb6be6b1cdec5466b5f9e2f4d4a036192a1708b832a55368d44d88bd1f1f3434eaeba97389ec52b65837816f4f"
    }
  };

  const response = await axios.get(url, options);
  return response.data.data;
}
