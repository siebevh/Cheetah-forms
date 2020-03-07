<template>
    <v-select
            v-model="value"
            :items="items"
            :label="schema.name"
            :required="schema.required"
            :readonly="schema.readonly"
            :disabled="schema.disabled"
            :item-text="schema.itemText"
            :item-value="schema.itemValue"
            v-bind="schema.attributes"
            :rules="rules"
            bottom
            light
            box
            auto
    ></v-select>
</template>

<script>
  import { mixins } from './abstractField.js';

  export default {
    name: 'ch-select',
    mixins: [mixins],
    computed: {
      items() {
        if (this.schema.realtimeOptions && this.schema.realtimeKey) {
          const temp = this.extraOptions[this.schema.realtimeOptions].find(e => e.key === this.model[this.schema.realtimeKey]);
          return temp ? temp[this.schema.realtimeItems] : [];
        }
        return this.schema.realtimeOptions && this.extraOptions ? this.extraOptions[this.schema.realtimeOptions] : this.schema.items;
      }
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
