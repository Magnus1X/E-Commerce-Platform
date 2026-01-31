import { BaseRepository } from './base.repository';
import Product, { IProduct } from '../models/product.model';

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }
}
