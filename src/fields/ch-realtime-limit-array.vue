<template>
  <div>
    <h2 class="primary--text text-sm-left mb-2 header-title">
      <small>{{schema.name}}
      </small>
    </h2>
    <template v-if="value" v-for="(arrayModel, index) in value">
      <v-divider class="mt-0 mb-2"></v-divider>
      <v-layout row wrap :key="index">
        <template v-for="Arrayfield in schema.fields">
          <v-flex :key="Arrayfield.id" :[dynamicFlex(Arrayfield)]="true">
            <form-group :extra-options="options" :field="Arrayfield" :model="arrayModel"
                        @model-updated="onModelUpdated"></form-group>
          </v-flex>
        </template>
      </v-layout>
    </template>
    <v-btn v-if="canAdd" @click="addObject()">{{schema.addText || 'add item' }}</v-btn>
    <v-btn v-if="value && value.length" @click="removeLastObject()">{{schema.removeText || 'remove last item' }}</v-btn>

  </div>

</template>
<script>
  import { computed } from '@vue/composition-api';
  import { getRules } from './composistions/get-rules';
  import { getFieldFromModel } from './composistions/get-field-from-model';

  export default {
    props: {
      extraOptions: Object,
      model: Object,
      schema: Object,
    },
    setup(props, context) {
      const { rules } = getRules(props.schema, props.model);
      const { value, setValue, visible } = getFieldFromModel(props.schema, props.model, context);

      function getFieldType(fieldSchema) {
        return `st-${fieldSchema.type}`;
      }

      function onModelUpdated(model, newVal, schema) {
        context.emit('model-updated', newVal, schema);
      }

      function addObject() {
        let objectToUpdate = value.value;
        if (objectToUpdate && objectToUpdate.length) {
          objectToUpdate.push({})
        } else {
          objectToUpdate = [{ index: 1 }];
        }
        setValue(objectToUpdate)
      }

      function removeLastObject() {
        let objectToUpdate = value.value;
        if (objectToUpdate) {
          objectToUpdate.pop();
        }
        setValue(objectToUpdate)
      }

      function dynamicFlex(field) {
        return field.cols ? `md${field.cols}` : 'md12';
      }

      const options = computed(() => {
        const selectedOptions = props.model[props.schema.model] ? props.model[props.schema.model].map(e => e[props.schema.uniqueKey]) : [];
        return {
          ...props.extraOptions,
          [props.schema.realtimeOptions]: props.extraOptions[props.schema.realtimeOptions].map(e => ({
            ...e,
            disabled: selectedOptions.includes(e.key)
          }))
        }
      })

      const canAdd = computed(() => {
        return options.value[props.schema.realtimeOptions].filter(e => !e.disabled).length > 0;
      })

      return {
        visible: visible.boolValue,
        rules,
        options,
        value,
        canAdd,
        setValue,
        addObject,
        removeLastObject,
        dynamicFlex,
        onModelUpdated,
        getFieldType
      };
    },
  };
</script>
<style lang="scss" scoped>
  .form-group:not([class*=" col-"]) {
    width: 100%;
    padding-right: 10px;
  }

  .form-group {
    display: inline-block;
    vertical-align: top;
    // width: 100%;
    // margin: 0.5rem 0.26rem;
    margin-bottom: 1rem;
  }

  /deep/ .dense-inputs {
    .v-input {
      font-size: 14px;

      &.v-text-field input {
        padding: 4px 0 2px 0;
        line-height: 1em;
      }

      .v-input__slot {
        margin-bottom: 4px;
      }

      &.v-input--hide-details {
        .v-input__slot {
          margin-bottom: 0
        }
      }
    }

    .v-text-field.v-text-field--solo {
      .v-input__control {
        min-height: 36px
      }
    }
  }
</style>
