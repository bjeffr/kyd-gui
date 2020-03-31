export class Key {
  purpose: number;
  keyType: number;
  key: string;

  constructor(purpose: number, keyType: number, key: string) {
    this.purpose = purpose;
    this.keyType = keyType;
    this.key = key;
  }
}
