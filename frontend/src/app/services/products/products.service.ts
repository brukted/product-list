import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private products = [
    {
      id: "aldfkalsdhjfkadsfadsf",
      title: 'Samsung Galaxy S21 - Phantom Gray (Unlocked)',
      price: 546,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      brand: 'Samsung',
      material: 'Material 1',
      color: 'Color 1',
      bannerImage: 'https://picsum.photos/200/300?random=' + (Math.floor(Math.random() * 1000)).toString(),
      rating: Math.random() * 5
    },
    {
      id: "dffaadfsdfad",
      title: 'OnePlus 9 Pro 5G - Morning Mist 12GB RAM, 256GB Storage',
      price: 234,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      brand: 'OnePlus',
      material: 'Material 2',
      color: 'Color 2',
      bannerImage: 'https://picsum.photos/200/300?random=' + (Math.floor(Math.random() * 1000)).toString(),
      rating: Math.random() * 5
    },
    {
      id: "dffasdfad",
      title: 'Apple iPhone 12 Pro Max - Pacific Blue (Unlocked)',
      price: 343,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      brand: 'Apple',
      material: 'Material 3',
      color: 'Color 3',
      bannerImage: 'https://picsum.photos/200/300?random=' + (Math.floor(Math.random() * 1000)).toString(),
      rating: Math.random() * 5
    },
    {
      id: "afsdadfadsf",
      title: 'JBL Flip 5 - Portable Bluetooth Speaker',
      price: 519.99,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      brand: 'JBL',
      material: 'Material 1',
      color: 'Color 1',
      bannerImage: 'https://picsum.photos/200/300?random=' + (Math.floor(Math.random() * 1000)).toString(),
      rating: Math.random() * 5
    },
    {
      id: "sdfajdlsfkasdjlfasjd",
      title: 'Dell XPS 13 - 13.3" UHD+ Touch Laptop',
      price: 129.99,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      brand: 'Dell',
      material: 'Aluminum',
      color: 'Color 2',
      bannerImage: 'https://picsum.photos/200/300?random=' + (Math.floor(Math.random() * 1000)).toString(),
      rating: Math.random() * 5
    },
    {
      id: "adfadfadfasdcav",
      title: 'HP Spectre x360 2-in-1 - 15.6" 4K Ultra HD Touch-Screen Laptop',
      price: 499.99,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      brand: 'HP',
      material: 'Magnesium alloy',
      color: 'Color 3',
      bannerImage: 'https://picsum.photos/200/300?random=' + (Math.floor(Math.random() * 1000)).toString(),
      rating: Math.random() * 5
    },
  ];

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('product');
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`product/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    this.products.push(product);
    return this.http.post<any>('product', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<any>('product', product);
  }
}
