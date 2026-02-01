import { CategoryResponseDto } from "../dto/category/CategoryResponse.dto";
import { CreateCategoryDto } from "../dto/category/CreateCategory.dto";
import { Category } from "../models/Category.model";
import { CategoryRepository } from "../repositories/Category.repository";
import { NotFoundError } from "../utils/errors";

export class CategoryService {
  private static toResponseDto(categories: Category): CategoryResponseDto {
    return {
      id: categories.id,
      category: categories.category,
      userId: categories.user_id,
      description: categories.description,
    };
  }
  static async getCategoryByUser(
    userId: number,
  ): Promise<CategoryResponseDto[]> {
    const categories = await CategoryRepository.findCategoriesByUser(userId);

    if (!categories) {
      throw new NotFoundError(
        "This user doesn't exist, check with valid user_id",
      );
    }
    return categories.map((cat) => this.toResponseDto(cat));
  }

  static async createCategory(
    createCategoryDto: CreateCategoryDto,
    userId: number,
  ): Promise<CategoryResponseDto> {
    try {
      const newCategory = await CategoryRepository.createCategoryByUserAsync(
        createCategoryDto,
        userId,
      );
      return this.toResponseDto(newCategory);
    } catch (error: any) {
      if (error.code === "23503") {
        throw new NotFoundError("User does not exist");
      }
      throw error;
    }
  }
}
