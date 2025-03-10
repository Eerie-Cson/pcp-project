import { v4 as uuidv4 } from 'uuid';

export class ObjectId {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static generate(type: string) {
    const id = uuidv4();

    const ids = id.split('-');

    ids[0] = type;

    return new ObjectId(ids.join(''));
  }

  public static from(type: string) {
    return new ObjectId(type);
  }

  public toString() {
    return this.value;
  }

  private get value() {
    return this._value;
  }
}