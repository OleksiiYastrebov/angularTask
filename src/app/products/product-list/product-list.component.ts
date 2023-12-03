import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from '../../services/products.service';
import { IProduct } from '../product.model';
import { ProductsApiService } from '../../services/products-api.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
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
    console.log('onInit prod list', this.productsService.products);
  }

  public navigateToCreate(): void {
    this.router.navigate(['product-create']);
  }

  public navigateToProduct(id: number): void {
    console.log('navigate prod list', this.productsService.products);
    this.router.navigate(['product', id]);
  }
}
