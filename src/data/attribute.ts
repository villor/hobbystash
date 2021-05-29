import { round } from 'lodash';

export interface AValueType<T extends AValue = AValue> {
  id: string;
  parse: (value: string) => T | null;
}

export interface AValue {
  type: AValueType;
  format: () => string;
}

export const StringValueType: AValueType<StringValue> = {
  id: 'c9672aa7-6628-4188-b870-4d2154282430',
  parse: (value) => new StringValue(value),
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

export const NumberValueType: AValueType<NumberValue> = {
  id: '99fc6f57-8a0d-4e25-84e3-92a4d6d1ddeb',
  parse: (value) => {
    const n = Number(value);
    return isNaN(n) ? null : new NumberValue(n);
  }
}

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

export const ChoiceValueType: AValueType<ChoiceValue> = {
  id: 'cc49ac28-002a-4ddf-b70c-2e511e1bccc5',
  parse: _ => null, // don't need to parse anything, all possible values are already in suggestions
}

export class ChoiceValue implements AValue {
  type = ChoiceValueType;
  choiceId: string;
  label: string;

  constructor(choiceId: string, label: string) {
    this.choiceId = choiceId;
    this.label = label;
  }

  format(): string {
    return this.label;
  }
}

export const PercentValueType: AValueType<PercentValue> = {
  id: 'ce3076d5-6ba9-4612-b936-9447852aa8f1',
  parse: value => {
    const n = Number(value.replace('%', ''));
    return isNaN(n) ? null : new PercentValue(n);
  }
}

export class PercentValue extends NumberValue {
  type = PercentValueType;
  format(): string {
    return super.format() + '%';
  }
}

function removeUnit(value: string, ...args: [pattern: RegExp, factor: number][]): number | null {
  for (let arg of args) {
    if (value.search(arg[0]) >= 0) {
      const n = Number(value.replace(arg[0], ''))
      if (!isNaN(n))
        return n * arg[1];
    }
  }
  return null;
}

export const ResistanceValueType: AValueType<ResistanceValue> = {
  id: 'e4d63822-832e-4294-b1ff-0d983364528e',
  parse: value => {
    const n = removeUnit(value,
      [/r|o(hms?)?|Ω/gi, 1],
      [/(kilo|k) ?(ohms?|Ω)?/gi, 1000],
      [/(mega|m) ?(ohms?|Ω)?/gi, 1000000],
    );
    return n === null ? n : new ResistanceValue(n);
  },
}

export class ResistanceValue extends NumberValue {
  type = ResistanceValueType;
  format(): string {
    if (this.value < 1000) {
      return this.value + 'Ω';
    } else if (this.value < 1000000) {
      return (this.value / 1000) + 'KΩ';
    } else {
      return (this.value / 1000000) + 'MΩ';
    }
  }
}

export const CapacitanceValueType: AValueType<CapacitanceValue> = {
  id: 'f2f071a6-bdf7-40d0-a472-1351c5cd8609',
  parse: value => {
    const n = removeUnit(value,
      [/p|(ico)? ?f(arads?)?/gi, 1e-12],
      [/n|(ano)? ?f(arads?)?/gi, 1e-9],
      [/(u|µ|micro)? ?f(arads?)?/gi, 1e-6],
      [/m|(illi)? ?f(arads?)?/gi, 1e-3],
    )
    return n === null ? n : new CapacitanceValue(n);
  },
}

export class CapacitanceValue extends NumberValue {
  type = CapacitanceValueType;
  format(): string {
    if (this.value < 1e-9) {
      return this.value / 1e-12 + "pF";
    } else if (this.value < 1e-6) {
      return this.value / 1e-9 + "nF";
    } else if (this.value < 1e-3) {
      return this.value / 1e-6 + "µF";
    } else {
      return this.value / 1e-3 + "mF";
    }
  }
}

export const AValueTypeMap = new Map([
  [StringValueType.id, StringValueType as AValueType<AValue>],
  [NumberValueType.id, NumberValueType],
  [ChoiceValueType.id, ChoiceValueType],
  [PercentValueType.id, PercentValueType],
  [ResistanceValueType.id, ResistanceValueType],
  [CapacitanceValueType.id, CapacitanceValueType],
]);

export class Attribute<TValue extends AValue = AValue> {
  id: string;
  type: AValueType<TValue>;
  name: string;
  suggestions: TValue[];

  constructor(id: string, type: AValueType<TValue>, name: string, suggestions?: TValue[]) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.suggestions = suggestions ?? [];
  }
}

export const ATTRIBUTES = {
  resistance: new Attribute('4bea39b1-ee2f-41ae-bcb3-da80c704f6c4', ResistanceValueType, 'Resistance', [0, 1, 5.6, 240, 680, 1000, 1500, 30000, 270000, 1000000].map(r => new ResistanceValue(r))),
  tolerance: new Attribute('11caa502-0b76-4326-9ad5-3dbfbb5ac038', PercentValueType, 'Tolerance', [1, 2, 5, 10, 20].map(t => new PercentValue(t))),
  capacitance: new Attribute('6c5f6fd6-8988-4ae7-b28c-8d8bb03721d3', CapacitanceValueType, 'Capacitance', [1e-12, 1e-9, 0.000001, 0.001].map(c => new CapacitanceValue(c))),
  partNumber: new Attribute('41aa1373-17e9-404b-af7b-0098440d0956', StringValueType, 'Part Number'),
  mount: new Attribute('0cbcb921-8580-4fec-92b9-562fe9c05f01', ChoiceValueType, 'Mount', [
    new ChoiceValue('5760712b-261a-4af4-a20d-3a0394119ded', 'Through-hole'),
    new ChoiceValue('aad87960-169f-4af0-9095-137510db7823', 'SMD'),
  ])
};

export const GENERIC_ATTRIBUTES = [
  ATTRIBUTES.partNumber,
];
