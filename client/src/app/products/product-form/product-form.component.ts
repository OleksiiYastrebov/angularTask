import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { IProduct, Product } from '../product.model';
import { ProductsApiService } from '../../services/products-api.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  providers: [ProductsApiService, HttpClientModule],
})
export class ProductFormComponent {
  public newProduct: IProduct = new Product(0, '', 0, '', '');

  constructor(
    private productsApiService: ProductsApiService,
    private router: Router
  ) {}

  public addProduct(): void {
    this.productsApiService.postProduct(this.newProduct).subscribe(() => {
      this.newProduct = new Product(0, '', 0, '', '');
      this.goRoot();
    });
  }

  public goRoot(): void {
    this.router.navigate(['/']);
  }
}
