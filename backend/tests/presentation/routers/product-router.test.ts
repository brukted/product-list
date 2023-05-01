import request from "supertest";
import server from '../../../src/server';

import { NextFunction, Response } from "express";
import { Product } from "../../../src/domain/entities/product";
import { ICreateProductUseCase } from "../../../src/domain/interfaces/use-cases/product/create-product";
import { IDeleteProductUseCase } from "../../../src/domain/interfaces/use-cases/product/delete-product";
import { IGetAllProductUseCase } from "../../../src/domain/interfaces/use-cases/product/get-all-products";
import { IUpdateProductUseCase } from "../../../src/domain/interfaces/use-cases/product/update-product";
import { AuthenticatedRequest } from "../../../src/presentation/interceptors/auth-interceptor";
import ProductsRouter from "../../../src/presentation/routers/product-router";
import { IGetProductByIdUseCase } from "../../../src/domain/interfaces/use-cases/product/get-product";

class MockGetAllProductsUseCase implements IGetAllProductUseCase {
    execute(): Promise<Product[]> {
        throw new Error("Method not implemented.")
    }
}

class MockCreateProductUseCase implements ICreateProductUseCase {
    execute(product: Product): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

class MockUpdateProductUseCase implements IUpdateProductUseCase {
    execute(product: Product): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

class MockDeleteProductUseCase implements IDeleteProductUseCase {
    execute(id: String): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

class MockGetProductByIdUseCase implements IGetProductByIdUseCase {
    execute(id: String): Promise<Product | null> {
        throw new Error("Method not implemented.")
    }
}

describe("Product Router", () => {
    let mockCreateProductUseCase: ICreateProductUseCase;
    let mockGetAllProductsUseCase: IGetAllProductUseCase;
    let mockUpdateProductUseCase: IUpdateProductUseCase;
    let mockDeleteProductUseCase: IDeleteProductUseCase;
    let mockGetProductByIdUseCase: IGetProductByIdUseCase;


    beforeAll(() => {
        mockGetAllProductsUseCase = new MockGetAllProductsUseCase()
        mockCreateProductUseCase = new MockCreateProductUseCase()
        mockUpdateProductUseCase = new MockUpdateProductUseCase()
        mockDeleteProductUseCase = new MockDeleteProductUseCase()
        mockGetProductByIdUseCase = new MockGetProductByIdUseCase()

        const mockProtectRoute = (request: AuthenticatedRequest, response: Response, next: NextFunction): Response<any, Record<string, any>> => {
            request.userId = "user_id";
            next();
            return response;
        }

        server.use("/product", ProductsRouter(mockCreateProductUseCase, mockGetAllProductsUseCase, mockUpdateProductUseCase, mockDeleteProductUseCase, mockGetProductByIdUseCase, mockProtectRoute))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("PUT /product", () => {
        test("PUT /product", async () => {
            const InputData = { id: "1", title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 }
            jest.spyOn(mockUpdateProductUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).put("/product").send(InputData)
            expect(response.status).toBe(200)
            expect(mockUpdateProductUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual({ message: "Product updated successful" })
        });
    });

    describe("GET /product", () => {
        test("should return 200 with data", async () => {
            const ExpectedData = [{ id: "1", title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 }];
            jest.spyOn(mockGetAllProductsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/product")

            expect(response.status).toBe(200)
            expect(mockGetAllProductsUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)

        });
    })

    describe("POST /product", () => {
        test("POST /product", async () => {
            const InputData = { id: "1", title: "title", price: 1, description: "description", brand: "brand", material: "material", color: "color", bannerImage: "bannerImage", rating: 1 }
            jest.spyOn(mockCreateProductUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/product").send(InputData)
            expect(response.status).toBe(201)
        });
    })

    describe("DELETE /product", () => {
        test("DELETE /product", async () => {
            jest.spyOn(mockDeleteProductUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).delete("/product/id").send()
            expect(response.status).toBe(200)
            expect(mockDeleteProductUseCase.execute).toBeCalledTimes(1)
            expect(mockDeleteProductUseCase.execute).toBeCalledWith("id")
            expect(response.body).toStrictEqual({ message: "Product deleted successful" })
        });
    });
})