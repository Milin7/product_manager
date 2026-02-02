import pool from "../config/db";
import { CreateCategoryDto } from "../dto/category/CreateCategory.dto";
import { Category } from "../models/Category.model";

export class CategoryRepository {
  static async findCategoriesByUser(userId: number): Promise<Category[]> {
    const query = `
        SELECT 
            id, 
            category, 
            user_id, 
            description 
        FROM categories
        WHERE user_id = $1
        `;
    const result = await pool.query<Category>(query, [userId]);
    return result.rows;
  }

  static async getCategoryByIdAsync(
    userId: number,
    categoryId: number,
  ): Promise<Category> {
    const query = `
    SELECT
      id,
      category,
      user_id,
      description
    FROM categories
    WHERE user_id = $1
      AND id = $2
    `;
    const result = await pool.query<Category>(query, [userId, categoryId]);
    return result.rows[0];
  }

  static async createCategoryByUserAsync(
    createCategoryDto: CreateCategoryDto,
    userId: number,
  ): Promise<Category> {
    const { category, description } = createCategoryDto;
    const query = `
    INSERT INTO categories (category, user_id, description)
    VALUES ($1, $2, $3)
    RETURNING id, category, user_id, description;
    `;
    const result = await pool.query<Category>(query, [
      category,
      userId,
      description,
    ]);
    return result.rows[0];
  }

  static async deleteCategoryByIdAsync(
    userId: number,
    categoryId: number,
  ): Promise<void> {
    const query = `
    DELETE FROM categories
    WHERE user_id = $1
      AND id = $2
    `;
    await pool.query(query, [userId, categoryId]);
  }

  static async deleteAllCategoriesAsync(userId: number): Promise<void> {
    const query = `
    DELETE FROM categories
    WHERE user_id = $1
    `;
    await pool.query(query, [userId]);
  }
}
