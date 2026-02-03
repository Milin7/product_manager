import axios from "axios";
import { type DraftCategory } from "../types/category.types";

export async function createCategory(userId: number, data: DraftCategory) {
  try {
    // The URL now correctly points to the endpoint for creating a category for a user
    const url = `${import.meta.env.VITE_API_URL}/api/categories/${userId}`;
    // The 'data' object (containing name and description) is passed as the body of the POST request
    await axios.post(url, data);
  } catch (error) {
    console.log(error);
    // It's good practice to throw the error so the calling function knows something went wrong
    throw new Error("Failed to create category.");
  }
}
