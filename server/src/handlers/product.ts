import { Request, Response } from "express";
import pool from "../config/db";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json({ data: result.rows });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const result = await pool.query(
      "INSERT INTO products (name, price, availability) VALUES ($1, $2, $3) RETURNING *",
      [name, price, true],
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ data: result.rows[0] });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, availability } = req.body;

    const checkResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id],
    );

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, availability = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [name, price, availability, id],
    );

    res.json({ data: result.rows[0] });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkResult = await pool.query(
      "SELECT availability FROM products WHERE id = $1",
      [id],
    );

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const currentAvailability = checkResult.rows[0].availability;

    const result = await pool.query(
      "UPDATE products SET availability = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [!currentAvailability, id],
    );

    res.json({ data: result.rows[0] });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Failed to update availability" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id],
    );

    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await pool.query("DELETE FROM products WHERE id = $1", [id]);

    res.json({ data: "The product has been deleted" });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
