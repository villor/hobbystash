import type { AValueType } from './';
import { NumberValue } from './number';

export const PercentValueType: AValueType<PercentValue> = {
  id: 'ce3076d5-6ba9-4612-b936-9447852aa8f1',
  parse: value => {
    const n = Number(value.replace('%', ''));
    return isNaN(n) ? null : new PercentValue(n);
  },
};

export class PercentValue extends NumberValue {
  type = PercentValueType;
  format(): string {
    return super.format() + '%';
  }
}
