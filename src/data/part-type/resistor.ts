import type { PartType } from './';
import {
  Attribute,
  GenericAttributes,
  OhmValueType,
  OhmValue,
  PercentValueType,
  PercentValue,
  ChoiceValueType,
  ChoiceValue,
} from '../attribute';

const resistor: PartType = {
  id: '9540d6a2-d178-45a9-bd1d-6f8863c56cbc',
  name: 'Resistor',
  attributes: [
    new Attribute(
      '4bea39b1-ee2f-41ae-bcb3-da80c704f6c4',
      OhmValueType,
      'Resistance',
      [0, 1, 5.6, 240, 680, 1000, 1500, 30000, 270000, 1000000].map(r => new OhmValue(r)),
    ),
    new Attribute(
      '11caa502-0b76-4326-9ad5-3dbfbb5ac038',
      PercentValueType,
      'Tolerance',
      [1, 2, 5, 10, 20].map(t => new PercentValue(t)),
    ),
    new Attribute('e2378eb2-d053-45fa-b925-22b10311889a', ChoiceValueType, 'Mount', [
      new ChoiceValue('11757515-2ae6-424b-bcb5-78a4953e07a1', 'Through-hole'),
      new ChoiceValue('0fb7a915-bdd2-4855-bf89-db813e08ada7', 'SMD'),
    ]),
    ...GenericAttributes,
  ],
  icon: () => 'resistor.png',
};

export default resistor;
