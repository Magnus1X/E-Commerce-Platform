import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const productController = new ProductController();

router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.put('/:id', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), productController.update);
router.delete('/:id', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), productController.delete);

export default router;
