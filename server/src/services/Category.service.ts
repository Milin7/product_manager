import { CategoryResponseDto } from "../dto/category/CategoryResponse.dto";
import { CreateCategoryDto } from "../dto/category/CreateCategory.dto";
import { UpdateCategoryDto } from "../dto/category/UpdateCategory.dto";
import { Category, CategoryParams } from "../models/Category.model";
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

  static async getCategoryById(
    params: CategoryParams,
  ): Promise<CategoryResponseDto> {
    const category = await CategoryRepository.getCategoryByIdAsync(params);

    if (!category) {
      throw new NotFoundError("This category doesn't exist.");
    }
    return this.toResponseDto(category);
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

  static async updateCategory(
    params: CategoryParams,
    updateDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const existingCategory =
      await CategoryRepository.getCategoryByIdAsync(params);

    if (!existingCategory) {
      throw new NotFoundError(
        "Category not found or does not belong to this user",
      );
    }

    const updatedData: Category = {
      ...existingCategory,
      category: updateDto.category ?? existingCategory.category,
      description: updateDto.description ?? existingCategory.description,
    };

    const savedCategory =
      await CategoryRepository.updateCategoryAsync(updatedData);

    return this.toResponseDto(savedCategory);
  }

  static async deleteCategoryById(params: CategoryParams): Promise<void> {
    await CategoryRepository.deleteCategoryByIdAsync(params);
  }

  static async deleteAllCategories(userId: number): Promise<void> {
    await CategoryRepository.deleteAllCategoriesAsync(userId);
  }
}
