<template>
  <div id="cheetah-form" v-if="schema && model" :key="key">
    <div class="header" v-if="schema.title">
      <h3 class="primary--text text-lg-left mb-2 header-title">{{schema.title}}
        <small>{{schema.subtitle}}
          <slot name="subtitle"></slot>
        </small>
      </h3>
    </div>

    <v-container grid-list-md text-xs-right>
      <v-form ref="form" class="xs12"
              v-model="schema.valid"
              v-if="schema.fields"
              :aria-label="schema.title">
        <v-layout row wrap>
          <template v-for="field in schema.fields">
            <v-flex :[dynamicFlex(field)]="true" :key="field.model">
              <form-group
                      :extra-options="extraOptions"
                      :field="field"
                      :model="model"
                      @model-updated="onModelUpdated">
              </form-group>
            </v-flex>
          </template>
        </v-layout>
      </v-form>
      <template>
        <v-stepper class="elevation-0 no-transition" v-model="stage" vertical v-if="groups.length">
          <template v-for="(group, index) in groups" >
            <v-stepper-step :step="index + 1" :complete="stage > index" editable
                            :rules="[() => !erroredGroupsArray[index]]"
                            :color="(stage === index ? 'secondary' : 'primary')"
                            :key="'s' + index"
            >
              {{group.title}}
              <small v-if="group.description">{{group.description}}</small>
            </v-stepper-step>

            <v-stepper-content :step="index + 1"  :key="'sc' + index">
              <v-form ref="form" v-model="group.valid" :aria-label="group.title">
                <v-layout row wrap>

                  <template v-for="field in group.fields">
                    <v-flex :[dynamicFlex(field)]="true" :key="'flex' + field">

                      <form-group :field="field" :model="model" :extra-option="extraOptions"
                                  @model-updated="onModelUpdated"></form-group>

                    </v-flex>
                  </template>

                </v-layout>
              </v-form>
              <v-layout row wrap>
                <v-spacer/>
                <v-btn color="primary"
                       v-if="index < schema.groups.length - 1 "
                       @click="nextStage">
                  Next
                </v-btn>
              </v-layout>
            </v-stepper-content>
          </template>
        </v-stepper>
      </template>
      <v-btn color="primary"
             v-if="showSaveButton"
             @click="save()">
        Save
      </v-btn>
    </v-container>
  </div>
</template>


<script>
export default {
  name: 'formGenerator',
  props: {
    formCode: {
      type: String,
    },
    schema: Object,
    extraOptions: Object,
    model: Object,
    showSaveButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      editedModel: this.model,
      stage: 0,
      key: new Date().getTime(),
      erroredGroupsArray: [], // Validation errors
    };
  },
  computed: {
    fields() {
      return this.schema.fields;
    },
    groups() {
      const res = [];
      if (this.schema && this.schema.groups) {
        this.schema.groups.slice(0).forEach((group) => {
          res.push(group);
        });
      }
      return res;
    },
  },
  methods: {
    dynamicFlex(field) {
      return field.cols ? `md${field.cols}` : 'md12';
    },
    onModelUpdated(model, newVal, schema) {
      this.editedModel = model;
      this.key = new Date().getTime();
      this.$emit('model-updated', this.editedModel);
    },
    nextStage() {
      if (this.stage <= this.groups.length) {
        this.stage += 1;
      }
    },
    previousStage() {
      if (this.stage >= 0) {
        this.stage -= 1;
      }
    },
    // Validating the model properties
    save() {
      let valid = false;
      if (this.schema.groups.length) {
        this.erroredGroupsArray = this.$refs.form.reduce((erroredArray, form) => {
          erroredArray.push(!form.validate());
          return erroredArray;
        }, []);
        valid = this.erroredGroupsArray.every(val => !val);
      } else {
        valid = this.$refs.form.validate();
      }
      if (valid) {
        this.$emit('save', this.model);
      }
    },
  },
};
</script>

<style lang="scss">
  @import "styles";

  #cheetah-form {
    padding: 10px;

    * {
      box-sizing: border-box;
    }

    .v-input__slot {
      margin-bottom: 0px;
    }

    .v-input__slot:before {
      border-style: none !important;
    }

    .v-input__slot {
      margin-bottom: 0;
    }

    .container {
      max-width: 100%;
    }

    .form-group, .flex, .v-text-field__details {
      margin: 0 !important;
      padding: 0 5px !important;
    }

    .v-badge__badge {
      height: 18px;
      width: 18px;
      font-size: 10px;
    }

    .v-stepper__content {
      transition: .3ms cubic-bezier(0.4, 0, 1, 1);
    }

    .primary {
      background-color: #11324b;
    }
  }
</style>
