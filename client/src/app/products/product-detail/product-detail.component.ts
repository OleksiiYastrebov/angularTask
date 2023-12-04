import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { IProduct } from '../product.model';
import { ProductsService } from '../../services/products.service';
import { ProductsApiService } from '../../services/products-api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [ProductsApiService, ProductsService],
})
export class ProductDetailComponent implements OnInit {
  public products$!: Observable<IProduct[]>;
  public product!: IProduct;

  constructor(
    private productsService: ProductsService,
    private productsApiService: ProductsApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.productsApiService.getProducts().subscribe((res) => {
      const product = res.find((p) => p.id === Number(id));
      if (product) this.product = product;
    });
  }

  public sendDeleteProductReq(id: number): void {
    this.productsApiService.deleteProduct(id).subscribe(() => {
      this.productsService.deleteProduct(id);
      this.goBack();
    });
  }

  public navigateToEdit(id: number): void {
    this.router.navigate(['product-edit', id]);
  }

  public goBack(): void {
    console.log('nav detail', this.productsService.products);
    this.router.navigate(['/']);
  }
}
