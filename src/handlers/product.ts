import { Request, Response } from "express";
import Product from "../models/Product.model";
import { NextFunction } from "express-serve-static-core";
import { error } from "console";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log("Couldn't create product", error);
  }
};
