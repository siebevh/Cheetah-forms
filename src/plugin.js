import fromGenerator from './formGenerator.vue';

module.exports = {
  install(Vue) {
    Vue.component('cheetah-form', fromGenerator);
  },
};
