
import { IProductDataSource } from "../../interfaces/data-sources/product-data-source";
import { Product } from "../../../domain/entities/product";
import { ProductModel } from "./models/product";

export class MongoDBProductDataSource implements IProductDataSource {

    async delete(id: String): Promise<boolean> {
        const result = await ProductModel.findOneAndDelete({ _id: id });
        console.log(result);
        return result != null;
    }

    async update(product: Product): Promise<boolean> {
        const result = await ProductModel.findOneAndUpdate(
            { _id: product.id },
            {
                title: product.title,
                price: product.price,
                description: product.description,
                brand: product.brand,
                material: product.material,
                color: product.color,
                bannerImage: product.bannerImage,
                rating: product.rating,
            }
        );
        return result ? true : false;
    }

    async create(product: Product): Promise<boolean> {
        const model = new ProductModel({
            title: product.title,
            price: product.price,
            description: product.description,
            brand: product.brand,
            material: product.material,
            color: product.color,
            bannerImage: product.bannerImage,
            rating: product.rating,
        });
        const res = await model.save();
        return res ? true : false;
    }

    async getAll(): Promise<Product[]> {
        const result = await ProductModel.find();
        return result.map((product) => {
            return {
                id: product._id,
                title: product.title,
                price: product.price,
                description: product.description,
                brand: product.brand,
                material: product.material,
                color: product.color,
                bannerImage: product.bannerImage,
                rating: product.rating,
            };
        });
    }

    async getById(id: String): Promise<Product | null> {
        const result = await ProductModel.findById(id);
        if (result) {
            return {
                id: result._id,
                title: result.title,
                price: result.price,
                description: result.description,
                brand: result.brand,
                material: result.material,
                color: result.color,
                bannerImage: result.bannerImage,
                rating: result.rating,
            };
        }
        return null;
    }
}