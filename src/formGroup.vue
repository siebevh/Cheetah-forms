<template>
  <div class="form-group" :class="getFieldRowClasses">
    <div class="field-wrap dense-inputs">
      <component ref="child" :is="getFieldType(field)" :disabled="getFieldRowClasses.disabled" :model="model"
                 :schema="field" @model-updated="onModelUpdated">
      </component>
    </div>
  </div>
</template>
<script>
  import components from './utils/fieldsLoader.js'

  export default {
    name: 'form-group',
    components,
    props: {
      model: Object,
      field: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        classFields: ['required', 'disabled']
      }
    },
    computed: {
      getFieldRowClasses() {
        const fieldClasses = {};
        this.classFields.forEach(prop =>{
          const propField = this.field[prop];
          switch (typeof propField) {
            case 'function':
              fieldClasses[prop] = propField.call(this, this.model, this.field, this);
            default:
              fieldClasses[prop] = propField;
          }});
        return fieldClasses;
      }
    },
    methods: {
      getFieldType(fieldSchema) {
        return `cheetah-${fieldSchema.type}`;
      },
      onModelUpdated(newVal, schema) {
        this.$emit('model-updated', newVal, schema);
      },
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


<style lang="scss">
  .required label::after {
    color: darkred;
    content: " *";
  }
</style>
