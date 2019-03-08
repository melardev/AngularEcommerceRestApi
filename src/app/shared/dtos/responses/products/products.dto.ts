import {Tag} from '../../../models/tag.model';
import {Category} from '../../../models/category.model';

import {PagedResponseDto} from '../shared/page-meta.dto';
import {Product} from '../../../models/product';
import {BaseAppDtoResponse} from '../shared/base.dto';

export class ProductDto extends BaseAppDtoResponse {
  // product: Product;
  // authInfo: AuthInfo;

  id: string;
  name: string;
  slug: string;
  description: string;

  price: number;
  stock: number;
  image_urls: string[];
  
  created_at: string;

  categories?: Category[];
  tags?: Tag[];
  comments?: Comment[];
}


export class ProductListResponseDto extends PagedResponseDto {
  products: Product[];
}
