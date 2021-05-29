import type { Attribute, AttributeValue } from '../attribute';
import capacitor from './capacitor';
import resistor from './resistor';

export interface PartType {
  id: string;
  name: string;
  attributes: Attribute[];
  icon: (values?: AttributeValue[]) => string;
}

export const PartTypeMap = new Map([
  [capacitor.id, capacitor],
  [resistor.id, resistor],
]);

export const PartTypes = Array.from(PartTypeMap.values());
