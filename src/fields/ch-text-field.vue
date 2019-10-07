<template>
  <v-text-field
    light
    lazy
    box
    v-if="visible"
    :value="value"
    :rules="rules"
    :prefix="schema.prefix"
    :label="schema.name"
    :hint="schema.hint"
    :readonly="schema.readonly"
    :required="schema.required"
    :disabled="schema.disabled"
    :placeholder="schema.placeholder"
    v-bind="schema.attributes"
    @input="setValue"
  >
    <template slot="append" v-if="schema && schema.canComment" @click="changeCommentBox">
      <st-comment-box :commentBoxOpen="commentBoxOpen"></st-comment-box>
    </template>
  </v-text-field>
</template>

<script>
import { getRules } from './composistions/get-rules';
import { getFieldFromModel } from './composistions/get-field-from-model';

export default {
  props: {
    model: Object,
    schema: Object,
  },
  setup(props, context) {
    const { rules } = getRules(props.schema, props.model);
    const { value, setValue, visible } = getFieldFromModel(props.schema, props.model, context);

    return {
      visible: visible.boolValue,
      rules,
      value,
      setValue,
    };
  },
};
</script>
