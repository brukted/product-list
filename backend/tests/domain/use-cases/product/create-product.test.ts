import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { CreateProductUseCase } from "../../../../src/domain/use-cases/product/create-product";
import { MockProductRepository } from "./mock-product-repository";

describe("Create Product Use Case", () => {
    let mockProductRepository: IProductRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockProductRepository = new MockProductRepository();
    })

    test("should return true", async () => {
        const InputData = { title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 };

        const mockCreateProductFun = jest.fn(() => Promise.resolve(true))
        jest.spyOn(mockProductRepository, "createProduct").mockImplementation(mockCreateProductFun)
        const createProductUseCase = new CreateProductUseCase(mockProductRepository)
        const result = await createProductUseCase.execute(InputData);
        expect(result).toBe(true)
        expect(mockCreateProductFun).toBeCalledTimes(1)
        expect(mockCreateProductFun).toBeCalledWith(InputData)
    });
});