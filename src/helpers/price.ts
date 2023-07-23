import { IProduct } from '../models/ProductModel';

interface IPrice {
  initial: number;
  value: number;
  fixed: string;
  isDiscount: boolean;
}

export const getPrice = (product: IProduct): IPrice => {
  const discount =
    product.price - product.price * (product.discountPercentage / 100);
  return {
    initial: product.price,
    value: discount,
    fixed: discount.toFixed(2),
    isDiscount: product.discountPercentage > 0,
  };
};
