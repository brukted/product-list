import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  constructor(private productsService: ProductsService, private route: ActivatedRoute,) { }
  product = new Observable<Product>();
  errorMessage: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.productsService.getProduct(id!!);
    this.product.subscribe({
      error: (err) => { this.errorMessage = err.message; throw err; }
    });
  }
}
