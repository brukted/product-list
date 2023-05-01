import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  isLoading = false;

  constructor(private productsService: ProductsService) { }

  onSubmit = (product: Product) => {
    this.isLoading = true;
    this.productsService.createProduct(product)
      .subscribe({
        error: () => { this.isLoading = false },
        complete: () => { this.isLoading = false }
      });
  };
}
