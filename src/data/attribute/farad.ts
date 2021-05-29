import type { AValueType } from './';
import { NumberValue } from './number';
import { removeUnit } from '../../util/unit';

export const FaradValueType: AValueType<FaradValue> = {
  id: 'f2f071a6-bdf7-40d0-a472-1351c5cd8609',
  parse: value => {
    const n = removeUnit(
      value,
      [/p(ico)? ?f(arads?)?/gi, 1e-12],
      [/n(ano)? ?f(arads?)?/gi, 1e-9],
      [/(u|µ|micro)? ?f(arads?)?/gi, 1e-6],
      [/m(illi)? ?f(arads?)?/gi, 1e-3],
    );
    return n === null ? n : new FaradValue(n);
  },
};

export class FaradValue extends NumberValue {
  type = FaradValueType;
  format(): string {
    if (this.value < 1e-9) {
      return this.value / 1e-12 + 'pF';
    } else if (this.value < 1e-6) {
      return this.value / 1e-9 + 'nF';
    } else if (this.value < 1e-3) {
      return this.value / 1e-6 + 'µF';
    } else {
      return this.value / 1e-3 + 'mF';
    }
  }
}
