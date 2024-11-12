class LocalStorageService<T> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }


  ///// Can be used for any data type (T) without rewriting similar code for each use case!!!!
  save(data: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  get(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  add(item: T): void {
    const existingData = this.get();
    existingData.push(item);
    this.save(existingData);
  }

  delete(predicate: (item: T) => boolean): void {
    const existingData = this.get();
    const filteredData = existingData.filter((item) => !predicate(item));
    this.save(filteredData);
  }

  // Clear all data for the key

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export default LocalStorageService;
