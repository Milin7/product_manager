import { ProductRepository } from "../repositories/Product.repository";
import { CreateProductDto } from "../dto/product/CreateProduct.dto";
import { UpdateProductDto } from "../dto/product/UpdateProduct.dto";
import { ProductResponseDto } from "../dto/product/ProductResponse.dto";
import { Product } from "../models/Product.model";
import { NotFoundError } from "../utils/errors";

export class ProductService {
  private static toResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      availability: product.availability,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    };
  }

  static async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await ProductRepository.findAll();
    return products.map(this.toResponseDto);
  }

  static async getProductById(id: number): Promise<ProductResponseDto> {
    const product = await ProductRepository.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return this.toResponseDto(product);
  }

  static async createProduct(
    data: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const newProduct = await ProductRepository.create(data);
    return this.toResponseDto(newProduct);
  }

  static async updateProduct(
    id: number,
    data: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const exists = await ProductRepository.exists(id);
    if (!exists) {
      throw new NotFoundError("Product not found");
    }

    const updatedProduct = await ProductRepository.update(id, data);

    if (!updatedProduct) {
      throw new Error("Failed to update product.");
    }

    return this.toResponseDto(updatedProduct);
  }

  static async toggleAvailability(id: number): Promise<ProductResponseDto> {
    const updatedProduct = await ProductRepository.toggleAvailability(id);

    if (!updatedProduct) {
      throw new NotFoundError("Product not found");
    }

    return this.toResponseDto(updatedProduct);
  }

  static async deleteProduct(id: number): Promise<void> {
    const deleted = await ProductRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError("Product not found");
    }
  }
}
