import ListadoPops from './componentes/listadoPops.vue'
import HomePops from './componentes/homePops.vue'
import NuevoPop from './componentes/nuevoPop.vue'
import modificarPop from './componentes/modificarPop.vue'

export const rutas = [
	{ 
		path: '/', component: HomePops, name: 'homePops'
	},
	{
		path: '/listadoPops', component:  ListadoPops, name: 'listadoPops'
	},
	{
		path: '/nuevoPop', component:  NuevoPop, name: 'nuevoPop'
	},
	{
		path: '/modificarPop', component:  modificarPop, name: 'modificarPop'
	}
]