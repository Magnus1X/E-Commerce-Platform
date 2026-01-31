import { BaseRepository } from './base.repository';
import Order, { IOrder } from '../models/order.model';

export class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super(Order);
  }

  async findByUser(userId: string): Promise<IOrder[]> {
    return this.model.find({ user: userId }).populate('products.product');
  }
}
