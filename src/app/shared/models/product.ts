import {Category} from './category.model';
import {Tag} from './tag.model';
import {Comment} from './comment.model';

export class Product {
  constructor(params: any = {}) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.price = params.price;
    this.description = params.description;
    this.image_urls = params.image_urls;
    this.quantity = params.stock;
    this.isInCart = params.isInCart;
    this.tags = params.tags;
    this.categories = params.categories;
    this.comments = params.comments;
  }

  id: string;
  name: string;
  slug: string;
//  productCategory: string;
  price: number;
  description: string;
  stock: number;
  image_urls: string[];
  isInCart: boolean;
  quantity: number;

  productSeller: string;
  created_at: string;
  publish_on: string;
  categories?: Category[];
  tags?: Tag[];
  comments?: Comment[];
}
