import secureLocalStorage from 'react-secure-storage';

export class StorageService {
  set(key: string, value: string | object | number | boolean) {
    secureLocalStorage.setItem(key, value);
  }

  get(key: string) {
    return secureLocalStorage.getItem(key);
  }

  destroy(key: string) {
    secureLocalStorage.removeItem(key);
  }

  drop() {
    console.log('drop')
    secureLocalStorage.clear();
  }
}
