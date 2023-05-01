
import { IProductDataSource } from "../../data/interfaces/data-sources/product-data-source";
import { Product } from "../entities/product";
import { IProductRepository } from "../interfaces/repositories/product-repository";

export class ProductRepositoryImpl implements IProductRepository {
    productDataSource: IProductDataSource;

    constructor(productDataSource: IProductDataSource) {
        this.productDataSource = productDataSource;
    }

    async getById(id: String): Promise<Product | null> {
        return await this.productDataSource.getById(id);
    }

    async deleteProduct(id: String): Promise<boolean> {
        return await this.productDataSource.delete(id);
    }

    async updateProduct(product: Product): Promise<boolean> {
        return await this.productDataSource.update(product);
    }

    async createProduct(product: Product): Promise<boolean> {
        return await this.productDataSource.create(product);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productDataSource.getAll();
    }
}