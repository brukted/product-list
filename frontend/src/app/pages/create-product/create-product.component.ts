import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  isLoading = false;

  constructor(private productsService: ProductsService, private router: Router) { }

  onSubmit = (product: Product) => {
    this.isLoading = true;
    this.productsService.createProduct(product)
      .subscribe({
        error: (err) => { this.isLoading = false; throw err; },
        complete: () => { this.isLoading = false; this.router.navigate(['/']) }
      });
  };
}
