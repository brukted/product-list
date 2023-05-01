import { IProductDataSource } from "../../../src/data/interfaces/data-sources/product-data-source";
import { Product } from "../../../src/domain/entities/product";
import { IProductRepository } from "../../../src/domain/interfaces/repositories/product-repository";
import { ProductRepositoryImpl } from "../../../src/domain/repositories/product-repository";

class MockProductDataSource implements IProductDataSource {
    getById(id: String): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: String): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(product: Product): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    create(product: Product): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}

describe("Product Repository", () => {
    let mockProductDataSource: IProductDataSource;
    let productRepository: IProductRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductDataSource = new MockProductDataSource()
        productRepository = new ProductRepositoryImpl(mockProductDataSource)
    })

    describe("getAllProducts", () => {
        test("should return data", async () => {
            const expectedData = [{ id: "1", title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 }]
            const mockGetAllFun = jest.fn(() => Promise.resolve(expectedData))
            jest.spyOn(mockProductDataSource, "getAll").mockImplementation(mockGetAllFun)
            const result = await productRepository.getProducts();
            expect(result).toBe(expectedData)
            expect(mockGetAllFun).toBeCalledTimes(1)
        });
    })

    describe("createProduct", () => {
        test("should return true", async () => {
            const inputData = { title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 }
            const mockCreateFun = jest.fn(() => Promise.resolve(true))
            jest.spyOn(mockProductDataSource, "create").mockImplementation(mockCreateFun)
            const result = await productRepository.createProduct(inputData);
            expect(result).toBe(true)
            expect(mockCreateFun).toBeCalledTimes(1)
            expect(mockCreateFun).toBeCalledWith(inputData)
        });
    })

    describe("updateProduct", () => {
        test("should return true", async () => {
            const inputData = { id: "1", title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 }
            const mockUpdateFun = jest.fn(() => Promise.resolve(true))
            jest.spyOn(mockProductDataSource, "update").mockImplementation(mockUpdateFun)
            const result = await productRepository.updateProduct(inputData);
            expect(result).toBe(true)
            expect(mockUpdateFun).toBeCalledTimes(1)
            expect(mockUpdateFun).toBeCalledWith(inputData)
        });
    });

    describe("deleteProduct", () => {
        test("should return true", async () => {
            const mockDeleteFun = jest.fn(() => Promise.resolve(true))
            jest.spyOn(mockProductDataSource, "delete").mockImplementation(mockDeleteFun)
            const result = await productRepository.deleteProduct("id");
            expect(result).toBe(true)
            expect(mockDeleteFun).toBeCalledTimes(1)
            expect(mockDeleteFun).toBeCalledWith("id")
        });
    });
})