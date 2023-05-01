import { Product } from "../../../../src/domain/entities/product";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";

export class MockProductRepository implements IProductRepository {
    getById(id: String): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    deleteProduct(id: String): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createProduct(product: Product): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateProduct(product: Product): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}