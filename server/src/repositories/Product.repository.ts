import pool from "../config/db";
import { CreateProductDto } from "../dto/product/CreateProduct.dto";
import { UpdateProductDto } from "../dto/product/UpdateProduct.dto";
import { Product } from "../models/Product.model";

export class ProductRepository {
  /**
   * Get all products
   */
  static async findAll(): Promise<Product[]> {
    const result = await pool.query<Product>(
      "SELECT * FROM products ORDER BY id DESC",
    );
    return result.rows;
  }

  static async findById(id: number): Promise<Product | null> {
    const result = await pool.query<Product>(
      "SELECT * FROM products WHERE id = $1",
      [id],
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  static async create(data: CreateProductDto): Promise<Product> {
    const { name, price } = data;
    const result = await pool.query<Product>(
      "INSERT INTO products (name, price, availability) VALUES ($1, $2, $3) RETURNING *",
      [name, price, true],
    );
    return result.rows[0];
  }

  static async update(
    id: number,
    data: UpdateProductDto,
  ): Promise<Product | null> {
    const { name, price, availability } = data;
    const result = await pool.query<Product>(
      "UPDATE products SET name = $1, price = $2, availability = $3 WHERE id = $4 RETURNING *",
      [name, price, availability, id],
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  static async toggleAvailability(id: number): Promise<Product | null> {
    const result = await pool.query<Product>(
      "UPDATE products SET availability = NOT availability, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  static async exists(id: number): Promise<boolean> {
    const result = await pool.query("SELECT 1 FROM products WHERE id = $1", [
      id,
    ]);
    return result.rows.length > 0;
  }
}
