<template>
  <v-textarea
    light
    lazy
    box
    v-bind="schema.attributes"
    v-model="value"
    :label="schema.name"
    :readonly="schema.readonly"
    :required="schema.required"
    :disabled="schema.disabled"
    :placeholder="schema.placeholder"
    @blur="onBlur"
    @change="onChange"
    @focus="onFocus"
    @input="onInput"
  ></v-textarea>
</template>

<script>
  import { mixins } from './abstractField.js';

  export default {
    name: 'ch-text-area',
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
