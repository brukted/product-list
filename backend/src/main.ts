import mongoose from 'mongoose';
import { MongoDBProductDataSource } from './data/data-sources/mongodb/mongodb-product-data-source';
import { IProductDataSource } from './data/interfaces/data-sources/product-data-source';
import { IProductRepository } from './domain/interfaces/repositories/product-repository';
import { ProductRepositoryImpl } from './domain/repositories/product-repository';
import { CreateProductUseCase } from './domain/use-cases/product/create-product';
import { GetAllProductsUseCase } from './domain/use-cases/product/get-all-products';
import { UpdateProductUseCase } from './domain/use-cases/product/update-product';
import ProductsRouter from './presentation/routers/product-router';
import server from './server'
import { MONGO_DB_CONNECTION_STRING } from './config';
import { DeleteProductUseCase } from './domain/use-cases/product/delete-product';
import { IUserDataSource } from './data/interfaces/data-sources/user-data-source';
import { MongoDBUserDataSource } from './data/data-sources/mongodb/mongodb-user-data-source';
import { UserRepositoryImpl } from './domain/repositories/user-repository';
import { IUserRepository } from './domain/interfaces/repositories/user-repository';
import AuthRouter from './presentation/routers/auth-router';
import { SignInUserUseCase } from './domain/use-cases/auth/sign-in-user';
import { RegisterUserUseCase } from './domain/use-cases/auth/register-user';
import { ErrorHandler } from './presentation/interceptors/error-handler';
import { protectRoute } from './presentation/interceptors/auth-interceptor';
import { GetProductByIdUseCase } from './domain/use-cases/product/get-product';
import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';


(async () => {
    // Connect to mongoDB
    mongoose.connect(MONGO_DB_CONNECTION_STRING, { dbName: 'productList' })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB', err));

    // Use middleware
    server.use(compression());
    server.use(helmet());
    server.use(morgan('tiny'));
    server.use(cors({
        origin: '*',
    }));

    // Serve static files
    server.use(express.static('public'));

    // Health check
    server.use('/api/v1/health', (_, res) => res.send('OK'));

    const mongoDbProductDataSource: IProductDataSource = new MongoDBProductDataSource()
    const productRepository: IProductRepository = new ProductRepositoryImpl(mongoDbProductDataSource)
    const productRouter = ProductsRouter(
        new CreateProductUseCase(productRepository),
        new GetAllProductsUseCase(productRepository),
        new UpdateProductUseCase(productRepository),
        new DeleteProductUseCase(productRepository),
        new GetProductByIdUseCase(productRepository),
        protectRoute
    )
    server.use("/api/v1/product", productRouter)

    const mongoDBUserDataSource: IUserDataSource = new MongoDBUserDataSource()
    const userRepository: IUserRepository = new UserRepositoryImpl(mongoDBUserDataSource)
    const authRouter = AuthRouter(
        new SignInUserUseCase(userRepository),
        new RegisterUserUseCase(userRepository)
    );
    server.use("/api/v1/auth", authRouter)

    // Error handling
    server.use(ErrorHandler);
    server.listen(3000, () => console.log("Running server on port 3000"))
})()