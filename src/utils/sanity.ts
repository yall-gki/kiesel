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
export async function getAllProducts(){

  const products = await client.fetch(groq`*[_type == "prodyct"]{title, description}`);
  return products;

}

export async function getProducts(params: ProductFilterParams) {
  const { category, minPrice, maxPrice } = params;

  try {
    let query = groq`*[_type == "product"`;

    // Add category filter if provided
    if (category.length > 0) {
      const categoriesArray = category.flatMap(cat => cat.split(','));
      query += ` && references(*[_type == "category" && (${categoriesArray.map(cat => `slug.current == "${cat.trim()}"`).join(' || ')})]._id)`;
    }

    // Add price range filter if provided
    if (minPrice !== undefined) {
      query += ` && price >= ${minPrice}`;
    }

    if (maxPrice !== undefined) {
      query += ` && price <= ${maxPrice}`;
    }

    // Add search query filter if provided
    

    query += `]{
      price,
      category->{
        title,
        slug
      },
      "imageUrl": mainImage.asset->url,
      name
    }`;

    const products = await client.fetch(query);
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products from Sanity: ' + error.message);
  }
}
export const revalidate = 60;
export const dynamic = 'force-dynamic';
