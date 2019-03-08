import {ProductDto} from '../responses/products/products.dto';

export class ProductLocalDto extends ProductDto {
  isInCart: boolean;
}
