import ListadoPops from './componentes/listadoPops.vue'
import HomePops from './componentes/homePops.vue'
import NuevoPop from './componentes/nuevoPop.vue'

export const rutas = [
	{ 
		path: '/', component: HomePops, name: 'homePops'
	},
	{
		path: '/listadoPops', component:  ListadoPops, name: 'listadoPops'
	},
	{
		path: '/nuevoPop', component:  NuevoPop, name: 'nuevoPop'
	}
]