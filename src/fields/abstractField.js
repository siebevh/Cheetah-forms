export const mixins = {
  props: ['model', 'schema', 'formOptions', 'disabled', 'extraOptions'],
  data() {
    return {
      commentBoxOpen: false,
    };
  },
  computed: {
    value: {
      cache: false,
      get() {
        let val;
        if (typeof this.schema.get === 'function') {
          val = this.schema.get(this.model);
        } else {
          val = this.schema.model.split('.').reduce((prev, key) => prev && prev.hasOwnProperty(key) ? prev[key] : null, this.model);
        }

        return this.formatValueToField(val);
      },

      set(newValue) {
        const oldValue = this.value;
        newValue = this.formatValueToModel(newValue);

        if (typeof newValue === 'function') {
          newValue(newValue, oldValue);
        } else {
          this.updateModelValue(newValue, oldValue);
        }
      },
    },
    rules() {
      const rules = [];
      if (this.schema.required) {
        rules.push(v => !!v || `${this.schema.name} is a required field`);
      }
      if (this.schema.requiredIf) {
        if (!this.schema.visibleIf.split('.').reduce((prev, key) => prev && prev.hasOwnProperty(key) ? prev[key] : null, this.model)) {
          rules.push(v => !!v || `${this.schema.name} is a required field`);
        }
      }
      return rules;
    },
    visible() {
      if (this.schema.visibleIf) {
        if (!this.schema.visibleIf.split('.').reduce((prev, key) => prev && prev.hasOwnProperty(key) ? prev[key] : null, this.model)) {
          return false;
        }
      }
      return true;
    },
  },

  methods: {
    changeCommentBox() {
      if (this.schema.attributes && this.schema.attributes.canComment) {
        this.commentBoxOpen = true;
      }
    },
    updateModelValue(newValue, oldValue) {
      let changed = false;
      if (typeof this.schema.set === 'function') {
        this.schema[this.model] = newValue;
        changed = true;
      } else if (this.schema.model) {
        this.setModelValueByPath(this.schema.model, newValue);
        changed = true;
      }

      if (changed) {
        this.$emit('model-updated', this.model);

        if (typeof this.schema.onChanged === 'function') {
          this.schema.onChanged.call(this, this.model, newValue, oldValue, this.schema);
        }
      }
    },

    setModelValueByPath(path, value) {
      // convert array indexes to properties
      let transformedPath = path.replace(/\[(\w+)\]/g, '.$1');

      // strip a leading dot
      transformedPath = transformedPath.replace(/^\./, '');

      let model = this.model;
      const splitedPath = transformedPath.split('.');
      let i = 0;
      const length = splitedPath.length;
      while (i < length) {
        const subPath = splitedPath[i];
        if (i < length - 1) {
          if (model[subPath] !== undefined) {
            // Found parent property. Step in
            model = model[subPath];
          } else {
            // Create missing property (new level)
            this.$root.$set(model, subPath, {});
            model = model[subPath];
          }
        } else {
          // Set final property value
          this.$root.$set(model, subPath, value);
          return;
        }

        i += 1;
      }
    },

    formatValueToField(value) {
      return value;
    },

    formatValueToModel(value) {
      return value;
    },
  },
};
