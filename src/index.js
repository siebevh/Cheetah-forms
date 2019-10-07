import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import cheetahForm from './formGenerator.vue';

const components = {
  cheetahForm,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

Vue.use(VueCompositionApi);

export default components;
