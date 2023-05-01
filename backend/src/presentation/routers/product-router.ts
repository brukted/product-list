import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import { ICreateProductUseCase } from '../../domain/interfaces/use-cases/product/create-product'
import { IDeleteProductUseCase } from '../../domain/interfaces/use-cases/product/delete-product'
import { IGetAllProductUseCase } from '../../domain/interfaces/use-cases/product/get-all-products'
import { IUpdateProductUseCase } from '../../domain/interfaces/use-cases/product/update-product'
import { IGetProductByIdUseCase } from '../../domain/interfaces/use-cases/product/get-product'


export default function ProductsRouter(
    createProductUseCase: ICreateProductUseCase,
    getAllProductsUseCase: IGetAllProductUseCase,
    updateProductUseCase: IUpdateProductUseCase,
    deleteProductUseCase: IDeleteProductUseCase,
    getProductByIdUseCase: IGetProductByIdUseCase,
    authenticatedRoute: RequestHandler
) {
    const router = express.Router()

    router.get('/', async (_: Request, res: Response) => {
        const products = await getAllProductsUseCase.execute()
        res.status(200).send(products)
    })

    router.get('/:id', async (req: Request, res: Response) => {
        const product = await getProductByIdUseCase.execute(req.params.id)
        res.status(200).send(product)
    })

    router.post('/', async (req: Request, res: Response) => {
        await createProductUseCase.execute(req.body)
        res.status(201).json({ message: "Product created successfully" })
    })

    router.put('/', async (req: Request, res: Response) => {
        await updateProductUseCase.execute(req.body)
        res.status(200).json({ message: "Product updated successful" })

    })

    router.delete('/:id', authenticatedRoute, async (req: Request, res: Response) => {
        await deleteProductUseCase.execute(req.params.id)
        res.status(200).json({ message: "Product deleted successful" })
    });

    return router
}