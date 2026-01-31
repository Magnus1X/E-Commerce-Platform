import { BaseRepository } from './base.repository';
import Category, { ICategory } from '../models/category.model';

export class CategoryRepository extends BaseRepository<ICategory> {
    constructor() {
        super(Category);
    }
}
