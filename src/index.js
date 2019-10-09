import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import cheetahForm from './formGenerator.vue';
import formGroup from './formGroup.vue';

const components = {
  cheetahForm,
  formGroup,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

Vue.use(VueCompositionApi);

export default components;
