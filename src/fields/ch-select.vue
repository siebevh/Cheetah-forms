<template>
  <v-select
    bottom
    light
    box
    auto
    :value="value"
    :items="schema.items"
    :label="schema.name"
    :required="schema.required"
    :readonly="schema.readonly"
    :disabled="schema.disabled"
    :item-text="schema.itemText"
    :item-value="schema.itemValue"
    v-bind="schema.attributes"
    :rules="rules"
    @input="setValue"
  ></v-select>
</template>

<script>
import { getRules } from './composistions/get-rules';
import { getFieldFromModel } from './composistions/get-field-from-model';

export default {
  props: {
    model: Object,
    schema: Object,
  },
  setup(props, context) {
    const { rules } = getRules(props.schema, props.model);
    const { value, setValue, visible } = getFieldFromModel(props.schema, props.model, context);

    return {
      visible: visible.boolValue,
      rules,
      value,
      setValue,
    };
  },
};
</script>
