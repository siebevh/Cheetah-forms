<template>
  <v-text-field
    light
    lazy
    box
    v-if="visible"
    v-bind="schema.attributes"
    v-model="value"
    :prefix="schema.prefix"
    :label="schema.name"
    :readonly="schema.readonly"
    :required="schema.required"
    :disabled="schema.disabled"
    :placeholder="schema.placeholder"
    :rules="rules"
    :hint="schema.hint"
    @blur="onBlur"
    @change="onChange"
    @focus="onFocus"
    @input="onInput"
  >
  </v-text-field>
</template>

<script>
  import { mixins } from './abstractField';

  export default {
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

<style lang="scss" scoped>
  .required label::after {
    color: darkred;
    content: " *";
  }
</style>
