import {PagedResponseDto} from '../shared/page-meta.dto';

export class AddressDto {
  id: string;
  first_name: string;
  last_name: string;
  street_address: string;
  city: string;
  country: string;
  zip_code: string;
}

export class AddressListResponseDto extends PagedResponseDto {
  addresses: AddressDto[];
}
