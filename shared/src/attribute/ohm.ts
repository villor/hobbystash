import type { AValueType } from './';
import { NumberValue } from './number';
import { removeUnit } from '../util/unit';

export const OhmValueType: AValueType<OhmValue> = {
  id: 'e4d63822-832e-4294-b1ff-0d983364528e',
  parse: value => {
    const n = removeUnit(
      value,
      [/r|o(hms?)?|Ω/gi, 1],
      [/(kilo|k) ?(ohms?|Ω)?/gi, 1000],
      [/(mega|m) ?(ohms?|Ω)?/gi, 1000000],
    );
    return n === null ? null : new OhmValue(n);
  },
};

export class OhmValue extends NumberValue {
  type = OhmValueType;
  format(): string {
    if (this.value < 1000) {
      return this.value + 'Ω';
    } else if (this.value < 1000000) {
      return this.value / 1000 + 'KΩ';
    } else {
      return this.value / 1000000 + 'MΩ';
    }
  }
}
