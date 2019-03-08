import {BaseAppDtoResponse} from './base.dto';


export class PageMeta {
  has_prev_page: boolean;
  has_next_page: boolean;
  current_page_number: number;

  next_page_number: number;
  prev_page_number: number;

  next_page_url: string;
  prev_page_url: string;

  offset: number;
  requested_page_size: number;
  current_items_count: number;

  number_of_pages: number;
  total_items_count: number;
}

export class PagedResponseDto extends BaseAppDtoResponse {
  page_meta: PageMeta;
}
