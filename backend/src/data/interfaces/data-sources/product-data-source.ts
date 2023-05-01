import { Product } from "../../../domain/entities/product";

export interface IProductDataSource {
    delete(id: String): Promise<boolean>;
    create(product: Product): Promise<boolean>;
    update(product: Product): Promise<boolean>;
    getAll(): Promise<Product[]>;
    getById(id: String): Promise<Product | null>;
}