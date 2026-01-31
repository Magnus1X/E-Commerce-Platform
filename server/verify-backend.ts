import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AuthService } from './src/services/auth.service';
import { CategoryService } from './src/services/category.service';
import { ProductService } from './src/services/product.service';
import { OrderService } from './src/services/order.service';

dotenv.config();

const runVerification = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing");

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const authService = new AuthService();
        const categoryService = new CategoryService();
        const productService = new ProductService();
        const orderService = new OrderService();

        // 1. Register User
        console.log('\n--- Testing Auth ---');
        const email = `testuser_${Date.now()}@example.com`;
        const user = await authService.register({
            name: 'Test User',
            email: email,
            password: 'password123',
            role: 'admin'
        });
        console.log('User Registered:', user.email);

        const login = await authService.login(email, 'password123');
        console.log('User Logged In, Token received');

        // 2. Create Category
        console.log('\n--- Testing Category ---');
        const categoryName = `Electronics_${Date.now()}`;
        const category = await categoryService.create({
            name: categoryName,
            description: 'Gadgets and devices'
        });
        console.log('Category Created:', category.name);

        // 3. Create Product
        console.log('\n--- Testing Product ---');
        const product = await productService.create({
            name: 'Smartphone X',
            description: 'Latest model',
            price: 999,
            category: category._id as any,
            stock: 10,
            images: []
        });
        console.log('Product Created:', product.name);

        // 4. List Products
        const products = await productService.getAll({ search: 'Smartphone' });
        console.log('Products Found:', products.data.length);

        // 5. Create Order
        console.log('\n--- Testing Order ---');
        const order = await orderService.create(user._id as unknown as string, [
            { product: product._id as any, quantity: 2 }
        ]);
        console.log('Order PLaced:', order._id, 'Total:', order.totalAmount);

        // Cleanup (Optional)
        // await mongoose.connection.db.dropDatabase();

        console.log('\n✅ Verification Successful!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Verification Failed:', error);
        process.exit(1);
    }
};

runVerification();
