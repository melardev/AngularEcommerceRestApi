import {BaseAppDtoResponse} from '../shared/base.dto';
import {User} from '../../../models/user';

export class LoginDtoResponse extends BaseAppDtoResponse {
  token: string;
  scheme: string;
  user: User;
}
