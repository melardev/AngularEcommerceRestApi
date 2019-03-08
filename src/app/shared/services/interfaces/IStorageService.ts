interface IStorageService {
  get(key: string);

  set(key: string, value: string);

  clear(key: string);
}
