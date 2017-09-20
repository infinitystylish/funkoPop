import ListadoPops from './componentes/listadoPops.vue'
import HomePops from './componentes/homePops.vue'
import NuevoPop from './componentes/nuevoPop.vue'
import avisoPop from './componentes/avisoPop.vue'
import pedidosPop from './componentes/pedidosPop.vue'

export const rutas = [
	{ 
		path: '/FunkoPop', component: HomePops, name: 'homePops'
	},
	{
		path: '/FunkoPop/listadoPops', component:  ListadoPops, name: 'listadoPops'
	},
	{
		path: '/FunkoPop/nuevoPop', component:  NuevoPop, name: 'nuevoPop'
	},
	{
		path: '/FunkoPop/avisoPop', component:  avisoPop, name: 'avisoPop'
	},
	{
		path: '/FunkoPop/pedidosPop', component:  pedidosPop, name: 'pedidosPop'
	},
]