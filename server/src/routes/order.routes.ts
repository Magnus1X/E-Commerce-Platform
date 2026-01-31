import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const orderController = new OrderController();

router.post('/', AuthMiddleware.authenticate, orderController.create);
router.get('/my-orders', AuthMiddleware.authenticate, orderController.getMyOrders);
router.get('/', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), orderController.getAll);

export default router;
