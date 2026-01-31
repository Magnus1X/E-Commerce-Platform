import { ProductRepository } from '../repositories/product.repository';
import { IProduct } from '../models/product.model';

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async create(data: Partial<IProduct>): Promise<IProduct> {
        return this.productRepository.create(data);
    }

    async getAll(query: any) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter: any = {};
        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } },
            ];
        }

        if (query.category) {
            filter.category = query.category;
        }

        if (query.minPrice || query.maxPrice) {
            filter.price = {};
            if (query.minPrice) filter.price.$gte = Number(query.minPrice);
            if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
        }

        const sort: any = {};
        if (query.sortBy) {
            const parts = query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            sort.createdAt = -1;
        }

        const products = await this.productRepository.findAll(filter, sort, skip, limit);
        const total = await this.productRepository.count(filter);

        return {
            data: products,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }

    async getById(id: string): Promise<IProduct | null> {
        return this.productRepository.findById(id);
    }

    async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
        return this.productRepository.update(id, data);
    }

    async delete(id: string): Promise<IProduct | null> {
        return this.productRepository.delete(id);
    }
}
