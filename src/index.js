import cheetahForm from './formGenerator.vue';
import formGroup from './formGroup.vue';

const components = {
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
