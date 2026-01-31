import { OrderRepository } from '../repositories/order.repository';
import { ProductRepository } from '../repositories/product.repository';
import { IOrder } from '../models/order.model';

export class OrderService {
    private orderRepository: OrderRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.productRepository = new ProductRepository();
    }

    async create(userId: string, products: { product: string; quantity: number }[]): Promise<IOrder> {
        let totalAmount = 0;
        const finalProducts = [];

        for (const item of products) {
            const product = await this.productRepository.findById(item.product);
            if (!product) {
                throw { status: 404, message: `Product ${item.product} not found` };
            }
            if (product.stock < item.quantity) {
                throw { status: 400, message: `Insufficient stock for product ${product.name}` };
            }
            totalAmount += product.price * item.quantity;
            finalProducts.push({ product: product._id, quantity: item.quantity });
        }

        // Deduct stock (simplified transaction simulation)
        for (const item of products) {
            const product = await this.productRepository.findById(item.product);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        return this.orderRepository.create({
            user: userId as any,
            products: finalProducts,
            totalAmount,
        });
    }

    async getByUser(userId: string): Promise<IOrder[]> {
        return this.orderRepository.findByUser(userId);
    }

    async getAll(): Promise<IOrder[]> {
        return this.orderRepository.findAll();
    }
}
