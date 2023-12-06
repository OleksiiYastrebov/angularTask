import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ProductsApiService } from '../../services/products-api.service';
import { IProduct, Product } from '../product.model';
import { TagsApiService } from '../../services/tags-api.service';
import { ITag } from '../../tags/tag.model';

@Component({
  selector: 'app-product-edit-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-edit-form.component.html',
  styleUrl: './product-edit-form.component.css',
  providers: [ProductsApiService, HttpClientModule, TagsApiService],
})
export class ProductEditFormComponent implements OnInit {
  public tags: ITag[] = [];
  public productToUpdate: IProduct = new Product(0, '', 1, '', '', []);
  public id: number | undefined;
  public selectedTags: number[] = [];
  public isPriceAcceptable = true;

  constructor(
    private tagsApiService: TagsApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsApiService: ProductsApiService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!this.id) return;
    this.tagsApiService.getTags().subscribe((tagsArr) => {
      this.tags = tagsArr;
      this.productsApiService.getProducts().subscribe((products) => {
        const foundProduct = products.find((product) => product.id === this.id);
        if (!foundProduct) return;
        this.productToUpdate = foundProduct;
      });
    });
  }

  public sendUpdateProductReq() {
    this.productToUpdate.tags = this.selectedTags;
    this.productsApiService
      .updateProduct(this.id!, this.productToUpdate!)
      .subscribe(() => {
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
