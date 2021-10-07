export class ProductDto {
  constructor(
    public _id: string,
    public title: string,
    public price: number,
    public thumbnail: string,
  ) {}
}
