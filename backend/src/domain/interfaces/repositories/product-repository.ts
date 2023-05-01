import { Product } from "../../entities/product";

export interface IProductRepository {
    deleteProduct(id: String): Promise<boolean>;
    createProduct(product: Product): Promise<boolean>;
    updateProduct(product: Product): Promise<boolean>;
    getProducts(): Promise<Product[]>;
    getById(id: String): Promise<Product | null>;
}