import type { Attribute, AValue } from './attribute';
import { ATTRIBUTES, GENERIC_ATTRIBUTES } from './attribute';

export interface PartType {
  id: string;
  name: string;
  attributes: Attribute<AValue>[];
}

export const PART_TYPES: PartType[] = [
  {
    id: '8910ac8c-c816-4450-990c-5b60160a5459',
    name: 'Resistor',
    attributes: [
      ATTRIBUTES.resistance,
      ATTRIBUTES.tolerance,
      ATTRIBUTES.mount,
      ...GENERIC_ATTRIBUTES
    ],
  },
  {
    id: '06aea61c-cc47-4884-bbd1-8c10d50817dc',
    name: 'Capacitor',
    attributes: [
      ATTRIBUTES.capacitance,
      ATTRIBUTES.mount,
      ...GENERIC_ATTRIBUTES
    ],
  },
];
