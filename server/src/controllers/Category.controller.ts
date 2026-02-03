import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/Category.service";
import { CreateCategoryDto } from "../dto/category/CreateCategory.dto";
import { UpdateCategoryDto } from "../dto/category/UpdateCategory.dto";
import { parseCategoryParams } from "../utils/params.utils";

export class CategoryController {
  static async getCategoryByUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = parseInt(req.params.userId as string);
      const category = await CategoryService.getCategoryByUser(userId);
      return res.json({ data: category });
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
      const params = parseCategoryParams(req);
      const category = await CategoryService.getCategoryById(params);
      return res.json({ success: true, data: category });
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
      return res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const params = parseCategoryParams(req);
      const updateDto: UpdateCategoryDto = req.body;

      const updatedCategory = await CategoryService.updateCategory(
        params,
        updateDto,
      );
      return res.status(200).json({ data: updatedCategory });
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
      const params = parseCategoryParams(req);
      await CategoryService.deleteCategoryById(params);

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
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
