import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { IProduct, Product } from '../product.model';
import { ProductsApiService } from '../../services/products-api.service';
import { TagsApiService } from '../../services/tags-api.service';
import { ITag } from '../../tags/tag.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  providers: [ProductsApiService, HttpClientModule, TagsApiService],
})
export class ProductFormComponent implements OnInit {
  public newProduct: IProduct = new Product(0, '', 0, '', '', []);
  public tags: ITag[] = [];
  public selectedTags: number[] = [];
  public isPriceAcceptable = false;

  constructor(
    private productsApiService: ProductsApiService,
    private tagsApiService: TagsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tagsApiService.getTags().subscribe((tagsArr) => {
      this.tags = tagsArr;
    });
  }

  public addProduct(): void {
    this.newProduct.tags = this.selectedTags;
    this.productsApiService.postProduct(this.newProduct).subscribe(() => {
      this.newProduct = new Product(0, '', 0, '', '', []);
      this.goRoot();
    });
  }

  public updateSelectedTags(tagId: number, event: any) {
    if (event.target.checked) {
      this.selectedTags.push(tagId);
    } else {
      const index = this.selectedTags.indexOf(tagId);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }

  public checkPrice(event: any) {
    const enteredPrice = parseFloat(event.target.value);
    this.isPriceAcceptable = !isNaN(enteredPrice) && enteredPrice > 0;
  }

  public goRoot(): void {
    this.router.navigate(['/']);
  }
}
