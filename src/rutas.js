import ListadoPops from './componentes/listadoPops.vue'
import HomePops from './componentes/homePops.vue'
import NuevoPop from './componentes/nuevoPop.vue'
import avisoPop from './componentes/avisoPop.vue'
import pedidosPop from './componentes/pedidosPop.vue'
import pedidosAAA from './componentes/pedidosAAA.vue'
import registroAAA from './componentes/registroAAA.vue'
import registroEE from './componentes/registroEE.vue'
import resurtido from './componentes/resurtido.vue'

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
	{
		path: '/FunkoPop/pedidosAAA', component:  pedidosAAA, name: 'pedidosAAA'
	},
	{
		path: '/FunkoPop/registroAAA', component:  registroAAA, name: 'registroAAA'
	},
	{
		path: '/FunkoPop/registroEE', component:  registroEE, name: 'registroEE'
	},
	{
		path: '/FunkoPop/resurtido', component:  resurtido, name: 'resurtido'
	},
]