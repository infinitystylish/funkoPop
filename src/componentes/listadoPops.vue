<template>
	<div class="internal-content">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado de Funko Pop</h1>
			</div>
			<div class="panel-body">
				<div class="table-responsive">
					<table class="table table-hover table-bordered table-funkopop">
						<thead>
							<tr>
								<th>
									ID
								</th>
								<th>
									Licencia
								</th>
								<th>
									Nombre
								</th>
								<th>
									Número de pop
								</th>
								<th>
									Cantidad comprada
								</th>
								<th>
									Cantidad disponible
								</th>
								<th>
									Vendidos
								</th>
								<th>
									Costo
								</th>
								<th>
									Costo total
								</th>
								<th>
									Precio a público
								</th>
								<th>
									Margen de ganancia
								</th>
								<th>
									Descuentos
								</th>
								<th>
									Ganancia
								</th>
								<th>
									Recuperación de dinero
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(pop, indice) of pops" v-bind:class="{ 'table-danger' : disponibilidadFunko(pop)}">

								<td>
									{{indice + 1}} 
								</td>
								<td>
									{{ pop.licencia }}
								</td>
								<td>
									{{ pop.nombre }}
								</td>
								<td>
									{{ pop.numeroPop }}
								</td>
								<td>
									{{ pop.cantidadComprada }}
								</td>
								<td>
									{{ pop.cantidadDisponible }}
								</td>
								<td>
									{{ pop.vendidos }}
								</td>
								<td>
									{{ pop.costo }}
								</td>
								<td>
									{{ costoTotal(pop) }}
								</td>
								<td>
									{{ pop.precioPublico }}
								</td>
								<td>
									{{ margenGanancia(pop) }}
								</td>
								<td>
									{{ pop.descuentos }}
								</td>
								<td>
									{{ ganancia(pop) }}
								</td>
								<td>
									{{ vendidos(pop) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="button-list-container pull-right">
			<button class="btn btn-primary" @click="volver">Volver</button>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['pops'],
		data() {
		    return {
		      
		    }
		},
		methods:{
			volver(){
				this.$router.push({ name: 'homePops' });
			},
			disponibilidadFunko(pop){
				if(pop.cantidadDisponible > 0){
					return false;
				}
				else{
					return true;
				}
			},
			costoTotal(pop){
				return pop.costo * pop.cantidadComprada;
			},
			margenGanancia(pop){
				return Math.ceil((pop.precioPublico - pop.costo) * 10) / 10;
			},
			ganancia(pop){
				return (pop.vendidos * (Math.ceil((pop.precioPublico - pop.costo) * 10) / 10)) - pop.descuentos;
			},
			vendidos(pop){
				return pop.vendidos * pop.costo;
			}
		}
	}
</script>

<style lang="scss">
	.table-funkopop{
		thead{
			th{
				font-size: 12px;
				min-width: 100px;
			}
		}
		tbody{
			tr{
				td{
					font-size: 12px;
					min-width: 100px;
				}
				
			}
		}
	}	

	.table-danger{	    	
		background-color: #f2dede;
	}

</style>