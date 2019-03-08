export class BaseAppDtoResponse {
  success: boolean;
  full_messages: string[];
}

export class ErrorAppDtoResponse extends BaseAppDtoResponse {
  success = false;
}

export class SuccessAppDtoResponse extends BaseAppDtoResponse {
  success = true;
}
