import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = await this.categoryService.create(req.body);
            res.status(201).json({ success: true, data: category });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryService.getAll();
            res.status(200).json({ success: true, data: categories });
        } catch (error) {
            next(error);
        }
    };
}
