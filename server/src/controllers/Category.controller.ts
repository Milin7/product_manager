import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/Category.service";
import { CreateCategoryDto } from "../dto/category/CreateCategory.dto";

export class CategoryController {
  static async getCategoryByUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = parseInt(req.params.userId as string);
      const category = await CategoryService.getCategoryByUser(userId);
      res.json({ data: category });
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId as string);
      const createCategoryDto: CreateCategoryDto = req.body;
      const newCategory = await CategoryService.createCategory(
        createCategoryDto,
        userId,
      );
      res.json({ data: newCategory });
    } catch (error) {
      next(error);
    }
  }
}
