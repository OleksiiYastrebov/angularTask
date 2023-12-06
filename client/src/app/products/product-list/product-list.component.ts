import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from '../../services/products.service';
import { IProduct } from '../product.model';
import { ProductsApiService } from '../../services/products-api.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { TagsApiService } from '../../services/tags-api.service';
import { ITag } from '../../tags/tag.model';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsApiService, ProductsService, TagsApiService],
})
export class ProductListComponent implements OnInit {
  public products$: Observable<IProduct[]> = this.productsService.products$;
  public productsToList!: IProduct[];
  public tags!: ITag[];
  public selectedTags: number[] = [];

  constructor(
    private productsService: ProductsService,
    private productsApiService: ProductsApiService,
    private tagsApiService: TagsApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.tagsApiService.getTags().subscribe((tags) => (this.tags = tags));
    this.productsApiService.getProducts().subscribe((products) => {
      this.productsService.setProducts(products);
      this.productsToList = this.productsService.products;
    });
  }

  public findTagName(id: number) {
    return this.tags.find((tag) => tag.id === id)?.name;
  }

  public findTagColor(id: number) {
    return this.tags.find((tag) => tag.id === id)?.color;
  }

  public navigateToCreate(): void {
    this.router.navigate(['product-create']);
  }

  public navigateToTags(): void {
    this.router.navigate(['tags-list']);
  }

  public navigateToEdit(id: number): void {
    this.router.navigate(['product-edit', id]);
  }

  public navigateToProduct(id: number): void {
    this.router.navigate(['product', id]);
  }

  public sendDeleteProductReq(id: number): void {
    this.productsApiService.deleteProduct(id).subscribe(() => {
      this.productsService.deleteProduct(id);
      this.productsToList = this.productsService.products;
    });
  }

  updateSelectedTags(tagId: number, event: any) {
    if (event.target.checked) {
      this.selectedTags.push(tagId);
    } else {
      const index = this.selectedTags.indexOf(tagId);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }

  public filterProducts() {
    if (this.selectedTags.length === 0) return;
    this.productsToList = JSON.parse(
      JSON.stringify(this.productsService.products)
    ).filter((product: IProduct) =>
      product.tags.some((tag) => this.selectedTags.includes(tag))
    );
  }

  public removeFilter() {
    this.productsToList = this.productsService.products;
  }
}
