import type { AValue, AValueType } from './';

export const StringValueType: AValueType<StringValue> = {
  id: 'c9672aa7-6628-4188-b870-4d2154282430',
  parse: value => new StringValue(value),
};

export class StringValue implements AValue {
  type = StringValueType;
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  format(): string {
    return this.value;
  }
}
