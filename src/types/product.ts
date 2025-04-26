export interface Product {
  id: number;
  title: string;
  price: number;
  cover: string;
  category: string;
  sold: number;
  rating: number;
  formattedPrice: string
}

export interface ProductDetails extends Product {
  description: string
}
