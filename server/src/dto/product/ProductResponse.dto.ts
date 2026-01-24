export interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductsResponseDto {
  data: ProductResponseDto[];
}
