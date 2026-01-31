import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const categoryController = new CategoryController();

router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), categoryController.create);
router.get('/', categoryController.getAll);

export default router;
