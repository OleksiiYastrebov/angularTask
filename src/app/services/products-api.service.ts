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
    return this.http.get<IProduct[]>(
      'https://my-json-server.typicode.com/OleksiiYastrebov/testData/products'
    );
  }
}
