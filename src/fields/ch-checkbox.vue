<template>
    <v-checkbox
            :label="schema.name"
            v-model="value"
            color="primary"
            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="onInput"
            v-bind="schema.attributes"
    ></v-checkbox>
</template>

<script>
  import { mixins } from './abstractField.js';

  export default {
    name: 'zk-checkbox',
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
