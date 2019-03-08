import {Order} from '../../../models/order.model';
import {PagedResponseDto} from '../shared/page-meta.dto';


export class OrderListDto extends PagedResponseDto {
  orders: Order[];
}
