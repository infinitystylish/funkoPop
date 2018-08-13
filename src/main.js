import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import { rutas } from './rutas.js'
import VeeValidate, { Validator } from 'vee-validate';
import messages from 'vee-validate/dist/locale/es';
import Lodash from 'lodash';

Validator.addLocale(messages);

const config = {
   locale: 'es',
   strict: true
};

Vue.use(VeeValidate, config);
Vue.use(VueRouter);
Vue.use(VueAxios, Axios)


const enrutador = new VueRouter({
	routes: rutas,
	mode: 'history',
	base: 'index'
})

new Vue({
	el: '#app',
	router: enrutador,
	render: h => h(App),
})

