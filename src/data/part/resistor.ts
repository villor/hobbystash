import { PartTypeCustomization } from '.';
import { BuiltInAttributeIds, OhmValue } from '../attribute';

const resistor: PartTypeCustomization = {
  icon: part => {
    let resistance = part.getValue<OhmValue>(BuiltInAttributeIds.resistance);
    if (resistance !== null && resistance.value > 1000000) {
      return 'big-resistor.png';
    }

    return part.type.icon;
  },
};

export default resistor;
