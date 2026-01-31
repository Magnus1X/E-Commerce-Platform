import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';

interface AuthRequest extends Request {
    user?: any;
}

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const order = await this.orderService.create(req.user.id, req.body.products);
            res.status(201).json({ success: true, data: order });
        } catch (error) {
            next(error);
        }
    };

    getMyOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const orders = await this.orderService.getByUser(req.user.id);
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await this.orderService.getAll();
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            next(error);
        }
    };
}
