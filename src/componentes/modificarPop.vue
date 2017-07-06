<template>
	<div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Modificar Funko Pop</h1>
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
									Precio	a público
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
									
								</th>
								
							</tr>
						</thead>
						<tbody>
							<tr v-for="(pop, indice) of pops">
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
									{{ pop.precioPublico }}
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
								<td class="column-button">
									<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-success" v-on:click="popVenta(indice,pop.id,pop.vendidos,pop.cantidadComprada,pop.precioPublico)">
										<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
									</button>
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


		
		<!-- Modal -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">Registrar venta</h4>
		      </div>
		      <div class="modal-body">
		      	<label for="">Cantidad vendida:</label>
		        <input type="text" v-model="vendido">

				<label for="">Precio público:</label>
		        <input type="text" v-model="precioPublico">

		        <input type="hidden" v-model="idPop">
		        <input type="hidden" v-model="id">
		        <input type="hidden" v-model="comprado">
		        <div class="alert alert-danger my-alert" v-if="validacionCantidad" role="alert">
				  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				  <span class="sr-only">Error:</span>
				  {{mensajeError}}
				</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
		        <button type="button" class="btn btn-primary" v-bind:class="{ hidden: validacionCantidad }" v-on:click="registrarVenta(idPop,id,vendido,comprado,precioPublico)">Guardar</button>
		      </div>
		    </div>
		  </div>
		</div>


	</div>
</template>

<script>
	export default{
		props: ['pops'],
		data() {
		    return {
		    	id: 0,
		    	idPop: 0,
		    	vendido: 0,
		    	comprado: 0,
		    	precioPublico: 0,
		    	validacionCantidad: true,
		    	mensajeError: ''
		    }
		},
		methods:{
			volver(){
				this.$router.push({ name: 'homePops' });
			},
			popVenta(id,indice,popVendido,cantidadComprada, precioPublico){
				this.idPop = id;
				this.id = indice;
				this.vendido = popVendido;
				this.comprado = cantidadComprada;
				this.precioPublico = precioPublico;
			},
			registrarVenta(indice,id){
				let vendidos = this.pops[indice].vendidos = this.vendido;
				let comprados = this.pops[indice].cantidadDisponible = this.comprado -  this.vendido;
				let precioPublico = this.pops[indice].precioPublico = this.precioPublico;
				this.$http.patch('https://funkopop-e84d7.firebaseio.com/pops/' + id + '.json', {
					vendidos: vendidos,
					cantidadDisponible: comprados
				}).then(respuesta => { console.log(respuesta);})
			}
		},
		watch:{
			'vendido': function(val, oldVal){
				if(val > this.comprado){
					this.validacionCantidad = true;
					this.mensajeError = "No puedes vender mas de lo que tienes";
				}else{
					this.validacionCantidad = false;
					this.mensajeError = "";
				}
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
					&.column-button{
						text-align: center;
					}				

				}
				
			}
		}
	}

	.my-alert{
		margin-top: 20px;
	}
</style>