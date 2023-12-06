import { Routes } from '@angular/router';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductEditFormComponent } from './products/product-edit-form/product-edit-form.component';
import { TagsListComponent } from './tags/tags-list/tags-list.component';
import { TagFormComponent } from './tags/tag-form/tag-form.component';
import { TagEditFormComponent } from './tags/tag-edit-form/tag-edit-form.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'product-create',
    component: ProductFormComponent,
  },
  {
    path: 'product-edit/:id',
    component: ProductEditFormComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'tags-list',
    component: TagsListComponent,
  },
  {
    path: 'tag-create',
    component: TagFormComponent,
  },
  {
    path: 'tag-edit/:id',
    component: TagEditFormComponent,
  },
];
