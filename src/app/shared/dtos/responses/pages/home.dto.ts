import {BaseAppDtoResponse} from '../shared/base.dto';
import {Tag} from '../../../models/tag.model';
import {Category} from '../../../models/category.model';

export class HomeResponseDto extends BaseAppDtoResponse {
  tags: Tag[];
  categories: Category[];
}
