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

  static async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId, categoryId } = req.params;
      const parsedUserId = parseInt(userId as string);
      const parsedCategoryId = parseInt(categoryId as string);
      const category = await CategoryService.getCategoryById(
        parsedUserId,
        parsedCategoryId,
      );
      return res.json({ success: true, data: category });
    } catch (error) {
      next();
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
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId, categoryId } = req.params;
      const parsedUserId = parseInt(userId as string);
      const parsedCategoryId = parseInt(categoryId as string);

      await CategoryService.deleteCategoryById(parsedUserId, parsedCategoryId);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async deleteAllCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = parseInt(req.params.userId as string);
      await CategoryService.deleteAllCategories(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
