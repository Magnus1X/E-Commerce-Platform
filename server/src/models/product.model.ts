import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: mongoose.Types.ObjectId;
    stock: number;
    images: string[];
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        stock: { type: Number, required: true, default: 0 },
        images: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
