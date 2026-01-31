import { Model, Document, UpdateQuery, FilterQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        const createdItem = new this.model(data);
        return createdItem.save();
    }

    async findAll(
        filter: FilterQuery<T> = {},
        sort: any = { createdAt: -1 },
        skip: number = 0,
        limit: number = 10
    ): Promise<T[]> {
        return this.model.find(filter).sort(sort).skip(skip).limit(limit);
    }

    async count(filter: FilterQuery<T> = {}): Promise<number> {
        return this.model.countDocuments(filter);
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(filter);
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id);
    }
}
