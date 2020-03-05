import cheetahForm from './formGenerator.vue';
import formGroup from './formGroup.vue';
import fields from './utils/fieldsLoader';

const components = {
  ...fields,
  cheetahForm,
  formGroup,
};

const cheetahForms = {
  install(Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });
  }
};

export default cheetahForms;
