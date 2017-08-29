<template>
	<div class="internal-content">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado de Funko Pop</h1>
			</div>
			<div class="panel-body">
				<div class="form-group">
				    <input type="text" class="form-control" placeholder="Buscar Pop" v-model="buscar">
				</div>
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
							<th>
									
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-show="buscar" v-for="(pop, indice) in buscarPop" class="table-info">
							<td v-if="disponibilidadFunko(pop)">
								 No hay disponibles  
							</td>
							<td v-else>
								Hay {{pop.cantidadDisponible}} 
								<span v-if="pop.cantidadDisponible > 1"> disponibles</span>
								<span v-else> disponible</span>
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
								{{ recuperacionDinero(pop) }}
							</td>
						</tr>

						<tr v-for="(pop, indice) of ordenarPops" v-bind:class="{ 'table-danger' : disponibilidadFunko(pop)}">

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
								{{ recuperacionDinero(pop) }}
							</td>
							<td class="column-button">
								<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-success" v-on:click="popVenta(indice,pop.id,pop.vendidos,pop.cantidadComprada,pop.precioPublico)">
									<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
								</button>

								<button type="button" data-toggle="modal" data-target="#apartadoModal" class="btn btn-warning btn-apartado" v-on:click="popApartado(pop.id)">
									<span class="glyphicon glyphicon-hand-up" aria-hidden="true"></span>
								</button>

							</td>
						</tr>
					</tbody>
				</table>
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
		        <h4 class="modal-title" id="myModalLabel">Modificar Funko Pop</h4>
		      </div>
		      <div class="modal-body">
		      	<div class="form-group">
			      	<label for="">Cantidad vendida:</label>
			        <input type="text" v-model="nuevaVenta" class="form-control">
			    </div>
				<div class="form-group">
					<label for="">Precio público:</label>
			        <input type="text" v-model="precioPublico" class="form-control">
			    </div>
		        <input type="hidden" v-model="idPop">
		        <input type="hidden" v-model="id">
		        <input type="hidden" v-model="comprado">
		        <input type="hidden" v-model="vendidos">

		        <div class="alert alert-danger my-alert" v-if="validacionCantidad" role="alert">
				  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				  <span class="sr-only">Error:</span>
				  {{mensajeError}}
				</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
		        <button type="button" class="btn btn-primary" v-bind:class="{ hidden: validacionCantidad }" v-on:click="registrarVenta(idPop,id)">Guardar</button>
		      </div>
		    </div>
		  </div>
		</div>


		<!-- Modal -->
		<div class="modal fade" id="apartadoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog modal-lg" role="document">
		    <div class="modal-content">
		      	<div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 class="modal-title" id="myModalLabel">Apartados Funko Pop</h4>
		      	</div>
		      	<div class="modal-body">
		      		<ul class="list-group">

					    <li class="list-group-item" v-for="(apartado, index) in apartados">
					    	<div class="figure-division">
						      	<div class="form-group">
							      	<label for="nombrePop">Nombre cliente:</label>
							        <input type="text" v-model="apartado.nombreCliente" class="form-control">
							    </div>
							    <div class="form-group">
							      	<label for="cantidad">Cantidad:</label>
							        <input type="number" v-model="apartado.cantidadApartada" class="form-control">
							    </div>
							</div>
					    </li>
					</ul>
					<input type="hidden" v-model="idPop">
					<button class="btn btn-primary" @click="agregarApartado">Agregar</button>
				</div>
			    <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			        <button type="button" class="btn btn-primary" v-on:click="agregarApartados(idPop)">Guardar</button>
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
		    	buscar: '',
		    	id: 0,
		    	idPop: 0,
		    	nuevaVenta: 0,
		    	comprado: 0,
		    	vendidos: 0,
		    	precioPublico: 0,
		    	validacionCantidad: false,
		    	mensajeError: '',
				apartados:[
					{
						nombreCliente: "",
						cantidadApartada: 0,
					}	
				]
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
			recuperacionDinero(pop){
				return pop.vendidos * pop.costo;
			},
			popVenta(id,indice,vendidos,cantidadComprada, precioPublico){
				this.idPop = id;
				this.id = indice;
				this.comprado = cantidadComprada;
				this.precioPublico = precioPublico;
				this.vendidos = parseInt(vendidos);
				this.nuevaVenta = 0;
			},
			registrarVenta(indice,id){
				let vendidos = parseInt(this.pops[indice].vendidos) + parseInt(this.nuevaVenta);
				let comprados = this.pops[indice].cantidadDisponible = this.comprado -  vendidos;
				let precioPublico = this.pops[indice].precioPublico = this.precioPublico;
				this.axios.patch('https://funkopop-e84d7.firebaseio.com/pops/' + id + '.json', {
					vendidos: vendidos,
					cantidadDisponible: comprados
				}).then(respuesta => { 
					setTimeout(function(){
						$('#myModal').modal('hide');
					},500);
					if(respuesta.status == 200){
						this.pops[indice].vendidos = vendidos;
						this.pops[indice].cantidadDisponible = comprados;
					}
				})
			},
			popApartado(id){
				this.idPop = id;
			},
			agregarApartado(){
				this.apartados.push(
					{
						nombreCliente: '',
						cantidadApartada: 0,
					}
				);
			},
			agregarApartados(id){
				console.log(id);
				console.log(this.apartados);

				for (let apartado in this.apartados) {
					this.apartados[apartado].nombreCliente = this.apartados[apartado].nombreCliente.trim();
				}
				
				 var apartados = this.apartados;

				this.axios.patch('https://funkopop-e84d7.firebaseio.com/pops/' + id + '.json',{
					apartados
				}).then(respuesta => {
					setTimeout(function(){
						$('#apartadosModal').modal('hide');
					},500);
					if(respuesta.status == 200){
						// this.pedidoD.nombrePedido = "";
						// this.pedidoD.funkoPop = [
						// 	{
						// 		nombrePop: "",
						// 		cantidad: 0,
						// 		costoFigura: 0,
						// 		costoEnvioFigura: 0,
						// 		status: 0,
						// 		pago: 0,
						// 		pagoFaltante: 0,
						// 		preventa: false,
						// 		estado: ""
						// 	}
						// ];
						// this.getPedidos();
					}
				});
			},
		},
		computed:{
			buscarPop(){
				return this.pops.filter((pop) => pop.nombre.toLowerCase().includes(this.buscar));
			},
			ordenarPops: function () {
				return _.orderBy(this.pops, 'cantidadDisponible')
			}
		},
		watch: {
			'nuevaVenta': function(val, oldVal){
				let totalVenta = parseInt(this.vendidos) + parseInt(val);
				if(totalVenta > this.comprado){
					this.validacionCantidad = true;
					this.mensajeError = "No puedes vender mas de lo que tienes";
				}else if(totalVenta <= this.comprado){
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
				}
				
			}
		}
	}	

	.table-danger{	    	
		background-color: #f2dede;
	}

	.table-info{	    	
		background-color: #d9edf7;
	}

	.column-button{
		display: flex;
		justify-content: center;
	}
	.btn-apartado{
		margin-left: 20px;
	}

</style>