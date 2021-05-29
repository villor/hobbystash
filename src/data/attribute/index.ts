import { ChoiceValueType } from './choice';
import { FaradValueType } from './farad';
import { NumberValueType } from './number';
import { OhmValueType } from './ohm';
import { PercentValueType } from './percent';
import { StringValueType } from './string';

export interface AValueType<T extends AValue = AValue> {
  id: string;
  parse: (value: string) => T | null;
}

export interface AValue {
  type: AValueType;
  format: () => string;
}

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

export type AttributeValue<T extends AValue = AValue> = {
  attribute: Attribute<T>;
  value: T;
};

export const AValueTypeMap = new Map([
  [StringValueType.id, StringValueType as AValueType<AValue>],
  [NumberValueType.id, NumberValueType],
  [ChoiceValueType.id, ChoiceValueType],
  [PercentValueType.id, PercentValueType],
  [OhmValueType.id, OhmValueType],
  [FaradValueType.id, FaradValueType],
]);

export * from './choice';
export * from './farad';
export * from './number';
export * from './ohm';
export * from './percent';
export * from './string';

export const GenericAttributes = [
  new Attribute('41aa1373-17e9-404b-af7b-0098440d0956', StringValueType, 'Part Number'),
];
