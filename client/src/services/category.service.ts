import { api } from "../api/axios";
import { CategoriesSchema } from "../types/category.types";

export async function getCategories(userId: number) {
  const response = await api.get(`categories/${userId}`);
  const validatedData = CategoriesSchema.safeParse(response.data);

  if (validatedData.success) {
    return validatedData.data;
  } else {
    console.error(validatedData.error.issues);
  }
}
