export interface IAuthService {
  register(key: string);

  login(key: string, value: string);

  logout(key: string);
}
