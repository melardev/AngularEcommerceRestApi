
import {User} from '../../../models/user';
import {BaseAppDtoResponse} from '../shared/base.dto';


export class CommentSubmittedResponse extends BaseAppDtoResponse {
  id: number;
  username: string;
  created_at: string;
  content: string;
  user?: User;
}
