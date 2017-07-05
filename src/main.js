import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { rutas } from './rutas.js'
import VeeValidate, { Validator } from 'vee-validate';
import messages from 'vee-validate/dist/locale/es';

Validator.addLocale(messages);

const config = {
   locale: 'es',
   strict: true
};

Vue.use(VeeValidate, config);
Vue.use(VueRouter);
Vue.use(VueResource);

const enrutador = new VueRouter({
	routes: rutas,
	mode: 'history'
})

new Vue({
  el: '#app',
  router: enrutador,
  render: h => h(App)
})