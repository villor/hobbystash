import type { PartType } from './';
import {
  Attribute,
  GenericAttributes,
  FaradValueType,
  FaradValue,
  ChoiceValueType,
  ChoiceValue,
} from '../attribute';

const capacitor: PartType = {
  id: '9ee9ea1b-2478-4624-a3c7-8744d211e5a2',
  name: 'Capacitor',
  attributes: [
    new Attribute(
      '6c5f6fd6-8988-4ae7-b28c-8d8bb03721d3',
      FaradValueType,
      'Capacitance',
      [1e-12, 1e-9, 0.000001, 0.001].map(c => new FaradValue(c)),
    ),
    new Attribute('6553a061-6e34-4242-92b6-bee89828acaf', ChoiceValueType, 'Mount', [
      new ChoiceValue('5760712b-261a-4af4-a20d-3a0394119ded', 'Through-hole'),
      new ChoiceValue('aad87960-169f-4af0-9095-137510db7823', 'SMD'),
    ]),
    ...GenericAttributes,
  ],
  icon: () => 'capacitor.png',
};

export default capacitor;
