export interface Category {
  id: number;
  category: string;
  user_id: number;
  description?: string;
}

export interface CategoryParams {
  userId: number;
  categoryId: number;
}
