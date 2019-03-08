export class NotificationsDto {
  constructor(public type: string, public message: string) {
  }
}

export class NotificationTypes {
  public static SUCCESS_TYPE = 'success';
  public static ERROR_TYPE = 'error';
}

// export type NotificationType = 'success' | 'error';
