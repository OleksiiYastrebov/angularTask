export interface IProduct {
  id: number;
  name: string | number;
  price: number;
  descriptionShort: string | number;
  descriptionLong: string | number;
}

export class Product implements IProduct {
  id!: number;
  name!: string | number;
  price!: number;
  descriptionShort!: string | number;
  descriptionLong!: string | number;

  constructor(
    id: number,
    name: string | number,
    price: number,
    descriptionShort: string | number,
    descriptionLong: string | number
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.descriptionShort = descriptionShort;
    this.descriptionLong = descriptionLong;
  }
}
