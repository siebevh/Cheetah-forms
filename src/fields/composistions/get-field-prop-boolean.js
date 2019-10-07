import { watch, ref } from '@vue/composition-api';
import { getFieldFromModel } from './get-field-from-model';

export const getFieldPropBooleanValue = (schema, model, prop) => {
  const boolValue = ref(false);

  watch(() => schema, () => {
    if (schema && schema[prop]) {
      let path = schema[prop];
      let reverse = false;
      if (path.startsWith('!')) {
        reverse = true;
        path = path.slice(1);
      }
      const fieldValue = getFieldFromModel(schema, model, prop).getValueByPath(path);

      boolValue.value = reverse ? fieldValue : !fieldValue;
    } else {
      boolValue.value = true;
    }
  });
  return { boolValue };
};
