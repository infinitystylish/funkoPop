<template>
	<div>
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
					<tr v-for="pop of pops">
						<td>
							
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
							{{ pop.precioPublico }}
						</td>
						<td>
							{{ pop.margenGanancia }}
						</td>
						<td>
							{{ pop.descuentos }}
						</td>
						<td>
							{{ pop.ganancia }}
						</td>
						<td>
							{{ pop.recuperacionDinero }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<button class="btn btn-primary" @click="volver">Volver</button>
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
			}
		},
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
</style>