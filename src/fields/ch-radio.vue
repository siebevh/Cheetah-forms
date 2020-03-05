<template>
  <v-radio-group v-model="value"
                 color="primary"
                 @blur="onBlur"
                 @change="onChange"
                 @focus="onFocus"
                 @input="onInput"
                 v-bind="schema.attributes"
  >
    <v-radio
      v-for="n in schema.options"
      :key="n.value"
      :label="n.label"
      :value="n.value"
    ></v-radio>
  </v-radio-group>
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
