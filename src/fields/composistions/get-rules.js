import { watch, ref } from '@vue/composition-api';
import { getFieldPropBooleanValue } from './get-field-prop-boolean';

export const getRules = (schema, model) => {
  const rules = ref([]);

  watch(() => schema, () => {
    if (schema) {
      rules.value = [];
      if (schema.required) {
        rules.value.push(v => !!v || `${schema.name} is a required field`);
      }
      if (schema.requiredIf) {
        if (!getFieldPropBooleanValue(schema, model, 'visibleIf')) {
          rules.value.push(v => !!v || `${$schema.name} is a required field`);
        }
      }
    }
  });
  return { rules };
};
