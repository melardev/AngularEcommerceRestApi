import {Product} from '../../models/product';
import {ContactInfo} from '../../models/contact_info.model';

export class CreateOrderDto {
  products: Product[];
  contactInfo: ContactInfo;
}
