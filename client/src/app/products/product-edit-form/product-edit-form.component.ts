import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ProductsApiService } from '../../services/products-api.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-edit-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-edit-form.component.html',
  styleUrl: './product-edit-form.component.css',
  providers: [ProductsApiService, HttpClientModule],
})
export class ProductEditFormComponent implements OnInit {
  public productToUpdate: Product | undefined;
  public id: number | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsApiService: ProductsApiService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productsApiService.getProducts().subscribe((products) => {
      if (!this.id) return;
      const foundProduct = products.find((product) => product.id === this.id);
      if (!foundProduct) return;
      this.productToUpdate = foundProduct;
    });
  }

  public sendUpdateProductReq() {
    this.productsApiService
      .updateProduct(this.id!, this.productToUpdate!)
      .subscribe(() => {
        this.goRoot();
      });
  }

  public goRoot(): void {
    this.router.navigate(['/']);
  }
}
