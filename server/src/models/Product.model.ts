export interface Product {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  created_at?: Date;
  updated_at?: Date;
}
