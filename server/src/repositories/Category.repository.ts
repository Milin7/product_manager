import pool from "../config/db";
import { CreateCategoryDto } from "../dto/category/CreateCategory.dto";
import { Category, CategoryParams } from "../models/Category.model";

export class CategoryRepository {
  static async findCategoriesByUser(userId: number): Promise<Category[]> {
    const query = `
        SELECT 
            id, 
            name, 
            user_id, 
            description 
        FROM categories
        WHERE user_id = $1
        `;
    const result = await pool.query<Category>(query, [userId]);
    return result.rows;
  }

  static async getCategoryByIdAsync(params: CategoryParams): Promise<Category> {
    const { userId, categoryId } = params;
    const query = `
    SELECT
      id,
      name,
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
    const { name, description } = createCategoryDto;
    const query = `
    INSERT INTO categories (name, user_id, description)
    VALUES ($1, $2, $3)
    RETURNING id, name, user_id, description;
    `;
    const result = await pool.query<Category>(query, [
      name,
      userId,
      description,
    ]);
    return result.rows[0];
  }

  static async updateCategoryAsync(category: Category): Promise<Category> {
    const { id, user_id, name, description } = category;
    const query = `
    UPDATE categories
      SET name = $1, description = $2
    WHERE user_id = $3
      AND id = $4
    RETURNING *;
    `;
    const result = await pool.query<Category>(query, [
      name,
      description,
      user_id,
      id,
    ]);
    return result.rows[0];
  }

  static async deleteCategoryByIdAsync(params: CategoryParams): Promise<void> {
    const { userId, categoryId } = params;
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
