import ListadoPops from './componentes/listadoPops.vue'
import HomePops from './componentes/homePops.vue'
import NuevoPop from './componentes/nuevoPop.vue'
import modificarPop from './componentes/modificarPop.vue'
import avisoPop from './componentes/avisoPop.vue'
import pedidosPop from './componentes/pedidosPop.vue'

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
	},
	{
		path: '/avisoPop', component:  avisoPop, name: 'avisoPop'
	},
	{
		path: '/pedidosPop', component:  pedidosPop, name: 'pedidosPop'
	},
]