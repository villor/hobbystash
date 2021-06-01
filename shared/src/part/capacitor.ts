import { PartTypeCustomization } from '.';
import { BuiltInAttributeIds, FaradValue } from '../attribute';

const capacitor: PartTypeCustomization = {
  icon: part => {
    let capacitance = part.getValue<FaradValue>(BuiltInAttributeIds.capacitance);
    if (capacitance !== null && capacitance.value > 4700) {
      return 'big-capacitor.png';
    }

    return part.type.icon;
  },
};

export default capacitor;
