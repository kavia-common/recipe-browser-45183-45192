export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  tags?: string[];
}
