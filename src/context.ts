import { createContext } from 'react';
import {
  Attribute,
  BuiltInAttributeIds,
  AValueTypeMap,
  FaradValueType,
  OhmValueType,
  StringValueType,
  AValueType,
  OhmValue,
} from './data/attribute';
import { PartType, BuiltInPartTypeIds } from './data/part';

// Temporary seed data until we have a backend
// TODO: Move to api stubs instead

const partTypes: PartType[] = [];

const partNumber = new Attribute(
  BuiltInAttributeIds.partNumber,
  AValueTypeMap.get(StringValueType.id) as AValueType,
  'Part Number',
);

const manufacturer = new Attribute(
  BuiltInAttributeIds.manufacturer,
  AValueTypeMap.get(StringValueType.id) as AValueType,
  'Manufacturer',
);

const GENERIC = [partNumber, manufacturer];

const resistance = new Attribute(
  BuiltInAttributeIds.resistance,
  AValueTypeMap.get(OhmValueType.id) as AValueType,
  'Resistance',
  [1, 10, 100, 1000, 1000000].map(x => new OhmValue(x))
);

partTypes.push({
  id: BuiltInPartTypeIds.resistor,
  name: 'Resistor',
  icon: 'logo192.png',
  attributes: [resistance, ...GENERIC],
});

const capacitance = new Attribute(
  BuiltInAttributeIds.capacitance,
  AValueTypeMap.get(FaradValueType.id) as AValueType,
  'Capacitance',
);

partTypes.push({
  id: BuiltInPartTypeIds.capacitor,
  name: 'Capacitor',
  icon: 'logo192.png',
  attributes: [capacitance, ...GENERIC],
});

export const AppContext = createContext({
  partTypes,
});

export default AppContext;
