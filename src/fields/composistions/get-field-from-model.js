import { computed } from '@vue/composition-api';
import { getFieldPropBooleanValue } from './get-field-prop-boolean';

export const getFieldFromModel = (schema, model, context) => {
  const visible = getFieldPropBooleanValue(schema, model, 'visible');

  const functions = {
    getValueByPath: path => schema[path].split('.').reduce((prev, key) => (prev && prev.hasOwnProperty(key) ? prev[key] : null), model),
  };

  function setModelValue(value) {
    const pathSplitted = schema.model.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
    let subPath;

    let xmodel = model;
    if (xmodel === undefined) {
      xmodel = {};
    }
    const { length } = pathSplitted;
    let i;
    for (i = 0; i < length - 1; i++) {
      subPath = pathSplitted[i];
      if (xmodel[subPath] === undefined) {
        xmodel[subPath] = {};
      }
      xmodel = xmodel[subPath];
    }
    xmodel[pathSplitted[length - 1]] = value;
    context.emit('model-updated', model, value, schema.model);
  }


  const actions = {
    setValue: (val) => {
      setModelValue(val);
    },
  };

  const getters = {
    value: computed(() => {
      if (typeof schema.get === 'function') {
        return schema.get(model);
      }
      return functions.getValueByPath('model');
    }),
  };

  return {
    visible,
    ...actions,
    ...getters,
    ...functions,
  };
};
