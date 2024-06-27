import { getCategories } from "@/utils/sanity";
import axios from "axios";
import { headers } from "next/headers";
import { json } from "node:stream/consumers";
import { z } from "zod";

export async function GET() {

  // Define the type for axios options
  type AxiosOption = {
    headers: {
      Authorization: string;
    };
  };

  // Define the options with proper header structure
  const options: AxiosOption = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
    }
  };

  try {
    const response = await axios.get("http://localhost:1337/api/categories", options);
    const categories = response.data;

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" }
      });
    } else if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
}

export const revalidate = 60;
