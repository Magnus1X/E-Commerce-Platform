import { CategoryRepository } from '../repositories/category.repository';
import { ICategory } from '../models/category.model';

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async create(data: Partial<ICategory>): Promise<ICategory> {
        return this.categoryRepository.create(data);
    }

    async getAll(): Promise<ICategory[]> {
        return this.categoryRepository.findAll();
    }
}
