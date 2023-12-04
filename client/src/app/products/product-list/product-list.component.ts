import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from '../../services/products.service';
import { IProduct } from '../product.model';
import { ProductsApiService } from '../../services/products-api.service';
import { ProductFormComponent } from '../product-form/product-form.component';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsApiService, ProductsService],
})
export class ProductListComponent implements OnInit {
  public products$: Observable<IProduct[]> = this.productsService.products$;

  constructor(
    private productsService: ProductsService,
    private productsApiService: ProductsApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.productsApiService.getProducts().subscribe((products) => {
      this.productsService.setProducts(products);
    });
  }

  public navigateToCreate(): void {
    this.router.navigate(['product-create']);
  }

  public navigateToEdit(id: number): void {
    this.router.navigate(['product-edit', id])
  }

  public navigateToProduct(id: number): void {
    this.router.navigate(['product', id]);
  }

  public sendDeleteProductReq(id: number): void {
    this.productsApiService.deleteProduct(id).subscribe(() => {
      this.productsService.deleteProduct(id);
    });
  }
}
