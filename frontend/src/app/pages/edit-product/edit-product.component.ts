import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, share } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  product: Observable<Product> = new Observable<Product>();
  isFormLoading = false;
  id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.product = this.productsService.getProduct(this.id!!).pipe(share());
  }

  onSubmit = (product: Product) => {
    product.id = this.id!!;
    this.isFormLoading = true;
    this.productsService.updateProduct(product)
      .subscribe({
        error: (err) => {
          this.isFormLoading = false; console.error(err);
          throw err;
        },
        complete: () => { this.isFormLoading = false; this.router.navigate(['/']) }
      });
  }
}
