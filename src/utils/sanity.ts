import { createClient, groq } from 'next-sanity';

// Create Sanity client
export const client = createClient({
  projectId: "cm4f7y4a",
  dataset: 'production',
  apiVersion: '2021-10-21', // Use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
});

// Fetch categories from Sanity
export async function getCategories() {
  const categories = await client.fetch(groq`*[_type == "category"]{title, slug}`);
  return categories;
}

interface ProductFilterParams {
  category: string[];
  minPrice?: number;
  maxPrice?: number;
}

// Fetch products based on filter parameters
export async function getProducts(params: ProductFilterParams) {
  const { category, minPrice, maxPrice } = params;

  try {
    // Constructing GROQ query for products
    let query = groq`*[_type == "product"`;

    // Adding category filter
    if (category.length > 0) {
      const formattedCategories = category.map(cat => `"${cat}"`).join(', ');
      query += ` && category in [${formattedCategories}]`;
    }

    // Adding price range filter
    if (minPrice !== undefined) {
      query += ` && price >= ${minPrice}`;
    }

    if (maxPrice !== undefined) {
      query += ` && price <= ${maxPrice}`;
    }

    // Finalizing the query
    query += `]{ price, category, 'imageUrl': mainImage.asset->url, name }`;

    // Fetching products using Sanity client
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products from Sanity: ' + error.message);
  }
}

export const revalidate = 60;
export const dynamic = 'force-dynamic';
