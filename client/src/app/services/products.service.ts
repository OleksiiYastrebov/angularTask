import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  protected readonly _products$: BehaviorSubject<IProduct[]> =
    new BehaviorSubject<IProduct[]>([]);
  public readonly products$ = this._products$.asObservable();

  get products(): IProduct[] {
    return this._products$.getValue();
  }

  private set products(products: IProduct[]) {
    this._products$.next(products);
  }

  public setProducts(products: IProduct[]): void {
    this.products = products;
  }

  public addProduct(newProduct: IProduct): void {
    this.products = [...this.products, newProduct];
  }

  public getProductById(id: number): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  public deleteProduct(id: number): void {
    const updatedProducts = this.products.filter(
      (product) => product.id !== id
    );
    this.setProducts(updatedProducts);
  }
}
