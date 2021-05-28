import type { PartType } from './part-type';
import type { Attribute, AValue } from './attribute';

export type PartAttribute<T extends AValue = AValue> = {
  attribute: Attribute<T>;
  value: T;
}

export type PartDescription = {
  partType: PartType;
  attributes: PartAttribute;
  count: number;
}
