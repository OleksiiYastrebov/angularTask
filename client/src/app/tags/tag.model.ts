export interface ITag {
  id: number;
  name: string;
  color: string;
}

export class Tag implements ITag {
  public id: number;
  public name: string;
  public color: string;
  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
