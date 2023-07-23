import { IProduct } from './ProductModel';

export interface ICartState {
  items: ICartItem[];
}

export interface ICartItem {
  item: IProduct;
  quantity: number;
}
