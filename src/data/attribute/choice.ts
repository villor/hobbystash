import type { AValue, AValueType } from './';

export const ChoiceValueType: AValueType<ChoiceValue> = {
  id: 'cc49ac28-002a-4ddf-b70c-2e511e1bccc5',
  parse: _ => null, // don't need to parse anything, all possible values are already in suggestions
};

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
