import type { PartType } from './part-type';
import type { AttributeValue } from './attribute';

export type PartDescription = {
  partType: PartType;
  attributes: AttributeValue[];
  count: number;
};
