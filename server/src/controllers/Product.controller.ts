import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/Product.service";
import { CreateProductDto } from "../dto/product/CreateProduct.dto";
import { UpdateProductDto } from "../dto/product/UpdateProduct.dto";

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAllProducts();
      res.json({ data: products });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const product = await ProductService.getProductById(id);
      res.json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createProductDto: CreateProductDto = req.body;
      const newProduct = await ProductService.createProduct(createProductDto);
      res.status(201).json({ data: newProduct });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const updateProductDto: UpdateProductDto = req.body;
      const updatedProduct = await ProductService.updateProduct(
        id,
        updateProductDto,
      );
      res.json({ data: updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  static async toggleAvailability(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = parseInt(req.params.id as string);
      const updatedProduct = await ProductService.toggleAvailability(id);
      res.json({ data: updatedProduct });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      await ProductService.deleteProduct(id);
      res.json({ data: "The product has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}
