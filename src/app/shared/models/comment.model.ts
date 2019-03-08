import {User} from './user';

export class Comment {
  constructor(params: any = {}) {
    this.id = params.id;
    this.user = params.user;
    this.username = params.username;
    this.productId = params.product_id;
    this.content = params.content;
    this.createdAt = params.created_at;
  }

  id: number;
  user?: User;
  username: string;
  productId?: number;
  content: string;
  createdAt: string;
}
