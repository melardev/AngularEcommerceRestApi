
import {Address} from '../../../models/address.model';
import {OrderItemDto} from '../order_items/order-item.dto';
import {BaseAppDtoResponse} from '../shared/base.dto';

export enum OrderStatus {
  Processing, Processed, Delivered, Shipped
}

export class OrderDetailsDto extends BaseAppDtoResponse {
  id: number;
  order_status: string;
  tracking_number: string;
  order_items: OrderItemDto[];
  address: Address;

  total: number;
  totlalAmount: number;
  createdAt: string;
  updatedAt: string;
}
