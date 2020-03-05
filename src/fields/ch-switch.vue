<template>
  <v-switch
    color="primary"
    box
    v-bind="schema"
    v-model="value"
    :label="schema.name"
    :readonly="schema.readonly"
    :disabled="schema.disabled"
    :placeholder="schema.placeholder"
    :hint="schema.hint"
    @change="onChange"
  ></v-switch>
</template>

<script>
  import { mixins } from './abstractField.js';

  export default {
    name: 'zk-text-field',
    mixins: [mixins],
    methods: {
      onBlur() {
        this.$emit('blur');
      },
      onChange() {
        this.$emit('change');
      },
      onFocus() {
        this.$emit('focus');
      },
      onInput() {
        this.$emit('input');
      },
    },
  };
</script>
