import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  constructor() {}

  async setItem(key, value) {
    await AsyncStorage.setItem(key, value);
  }

  async getItem(key) {
    const data = await AsyncStorage.getItem(key);
    return data;
  }

  async removeItem(key) {
    await AsyncStorage.removeItem(key);
  }

  async clear() {
    await AsyncStorage.clear();
  }
}

export const Storage = new StorageService();
