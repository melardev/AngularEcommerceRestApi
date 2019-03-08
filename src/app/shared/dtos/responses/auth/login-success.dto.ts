import {BaseAppDtoResponse} from '../shared/base.dto';


export class UserData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
  expiry: number;
}

export class LoginSuccessDto extends BaseAppDtoResponse {
  token: string;
  scheme: string;
  user: UserData;
}
