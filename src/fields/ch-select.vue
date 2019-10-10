<template>
  <v-select
    bottom
    light
    box
    auto
    :value="value"
    :items="items"
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
  import { computed } from '@vue/composition-api';
  import { getRules } from './composistions/get-rules';
  import { getFieldFromModel } from './composistions/get-field-from-model';

  export default {
    props: {
      model: Object,
      schema: Object,
      extraOptions: Object,
    },
    setup(props, context) {
      const { rules } = getRules(props.schema, props.model);
      const { value, setValue, visible } = getFieldFromModel(props.schema, props.model, context);
      const items = computed(() => {
        if (props.schema.realtimeOptions && props.schema.realtimeKey) {
          const temp = props.extraOptions[props.schema.realtimeOptions].find(e => e.key === props.model[props.schema.realtimeKey]);
          return temp ? temp[props.schema.realtimeItems] : [];
        }
        return props.schema.realtimeOptions && props.extraOptions ? props.extraOptions[props.schema.realtimeOptions] : props.schema.items;
      })


      return {
        visible: visible.boolValue,
        rules,
        value,
        items,
        setValue,
      };
    },
  };
</script>
