import { Component } from '@angular/core';
import { Observable, share, tap } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }
  products = new Observable<Product[]>();
  isLoading = this.products.pipe().subscribe(() => false);
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.products = this.productsService.getProducts().pipe(share()).pipe(tap({
      error: (err) => { this.errorMessage = err.message; throw err; }
    }));
  }
}
