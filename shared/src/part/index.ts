import type { Attribute, AttributeValue, AValue } from '../attribute';
import capacitor from './capacitor';
import resistor from './resistor';

export interface PartType {
  id: string;
  name: string;
  attributes: Attribute[];
  icon: string;
}

export interface PartTypeCustomization {
  icon: (part: Part) => string;
}

export class Part {
  id: string;
  type: PartType;
  attributeValues: AttributeValue[];
  count: number;

  constructor(id: string, type: PartType) {
    this.id = id;
    this.type = type;
    this.attributeValues = [];
    this.count = 0;
  }

  getValue<T extends AValue>(attributeId: string): T | null {
    return this.attributeValues.find(av => av.attribute.id === attributeId)?.value as T;
  }

  icon(): string {
    return PartTypeCustomizations.get(this.type.id)?.icon(this) || this.type.icon;
  }
}

export const BuiltInPartTypeIds = {
  resistor: 'df2afc9b-5c03-4513-996c-7f6d8cc11928',
  capacitor: 'e1307c80-375b-4f93-b5f7-2f5388d81c00',
};

const PartTypeCustomizations = new Map<string, PartTypeCustomization>([
  [BuiltInPartTypeIds.resistor, capacitor],
  [BuiltInPartTypeIds.capacitor, resistor],
]);
