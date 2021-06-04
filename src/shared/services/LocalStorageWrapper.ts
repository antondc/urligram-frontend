export class LocalStorageWrapper {
  getValue<T>(key: string): T {
    if (typeof window === 'undefined') return;

    const valueString = window.localStorage.getItem(key);
    if (!valueString) return;

    const { expires = 0, ...parsedValue } = JSON.parse(valueString);

    const nowMs = Date.now();

    if (nowMs > expires) {
      this.removeValue(key);

      return;
    }

    return parsedValue;
  }

  setValue<T>(key: string, value: T, expires?: number /* Ms since UNIX epoch */): { key: T } {
    if (typeof window === 'undefined') return;

    const stringifiedValue = JSON.stringify({ ...value, expires: expires });

    window.localStorage.setItem(key, stringifiedValue);

    const valueSet = this.getValue(key);

    if (!valueSet) return;

    return { key: value };
  }

  removeValue(key: string): void {
    if (typeof window === 'undefined') return;

    window.localStorage.removeItem(key);
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    window.localStorage.clear();
  }
}
