<template>
    <v-text-field
            box
            v-model="value"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="rules"
            :type="show ? 'text' : 'password'"
            :label="schema.name"
            v-on:click:append="show = !show"
            v-bind="schema"
            @blur="onBlur"
            @change="onChange"
            @focus="onFocus"
            @input="onInput"
    ></v-text-field>
</template>

<script>
  import { mixins } from './abstractField.js';

  export default {
    name: 'ch-password',
    mixins: [mixins],
    data() {
      return {
        show: false,
      };
    },
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
