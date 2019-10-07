<template>
    <v-dialog
            ref="dialog"
            v-model="modal"
            persistent
            lazy
            full-width
            width="290px"
    >
        <v-text-field
                box
                slot="activator"
                :value="formatDate(date)"
                readonly
                :label="schema.name"
                :disabled="schema.disabled"
                :placeholder="schema.placeholder"
                :hint="schema.hint"
                width="100%"
        >
        </v-text-field>
        <v-date-picker :value="date"
                       ref="picker"
                       scrollable
                       :max="today.toISOString()"
                       v-bind="schema.attributes"
                       :readonly="schema.readonly"
                       @input="setDate"
        >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(value)">OK</v-btn>
        </v-date-picker>
    </v-dialog>

</template>

<script>
  /* eslint-disable no-unused-expressions,no-return-assign */
  import { watch, ref, computed, onMounted } from '@vue/composition-api';
  import { getRules } from './composistions/get-rules';
  import { getFieldFromModel } from './composistions/get-field-from-model';

  export default {
    props: {
      model: Object,
      schema: Object,
    },
    setup: function (props, context) {
      const modal = ref(false);
      const today = new Date();
      const { rules } = getRules(props.schema, props.model);

      const { value, setValue, visible } = getFieldFromModel(props.schema, props.model, context);

     watch(() => modal, (val, old) => {
        if (modal) {
          //TODO: fix the timout
          setTimeout(() => {
            context.refs.picker.activePicker = 'YEAR'}, 1000);
        }
      });

      function formatDate(date) {
        if (!date || typeof date === 'object') return null;
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      }

      function setDate(date) {
        setValue(new Date(date));
        modal.value = false;
      }

      const date = computed(() => {
        if (value) {
          return new Date(value.value).toISOString().substr(0, 10);
        }
        return new Date().toISOString().substr(0, 10);
      });

      return {
        modal,
        today,
        visible: visible.boolValue,
        rules,
        date,
        setValue,
        formatDate,
        setDate,
      };
    }
  };
</script>
<style>
  .v-dialog__container {
    width: 100%;
  }
</style>
