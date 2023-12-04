import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:8000/products');
  }

  public postProduct(product: IProduct) {
    console.log('send post req');
    return this.http.post<IProduct>('http://localhost:8000/product', product);
  }

  public deleteProduct(id: number) {
    return this.http.delete('http://localhost:8000/product/' + String(id));
  }

  public updateProduct(id: number, product: IProduct) {
    return this.http.put(
      'http://localhost:8000/product/' + String(id),
      product
    );
  }
}
