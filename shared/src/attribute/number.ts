import { round } from 'lodash';
import type { AValue, AValueType } from './';

export const NumberValueType: AValueType<NumberValue> = {
  id: '99fc6f57-8a0d-4e25-84e3-92a4d6d1ddeb',
  parse: value => {
    const n = Number(value);
    return isNaN(n) ? null : new NumberValue(n);
  },
};

export class NumberValue implements AValue {
  type = NumberValueType;
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  format(): string {
    return this.round(2).toString();
  }

  round(decimals: number): number {
    return round(this.value, decimals);
  }
}
