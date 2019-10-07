import fromGenerator from './formGenerator.vue';

module.exports = {
	install: function (Vue, options) {
		Vue.component('cheetah-form', fromGenerator);
	}
};
