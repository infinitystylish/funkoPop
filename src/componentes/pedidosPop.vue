<template>
	<div class="internal-content">

		<div class="new-announcement">
			<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#pedidosModal">Nuevo pedido</button>
			<button class="btn btn-success btn-lg" data-toggle="modal" data-target="#costoFiguraModal">Agregar costo figura</button>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado de pedidos</h1>
			</div>
			<div class="panel-body">
				 <template v-for="(pedido, indiceP) in pedidos"> 
					<h1>{{ pedido.nombrePedido }}</h1>					
					<table class="table table-hover table-bordered table-funkopop">
						<thead>
							<tr>
								<th>
									Nombre
								</th>
								<th>
									Cantidad
								</th>
								<th>
									Costo Figura
								</th>
								<th>
									Pago
								</th>
								<th>
									Pago Faltante
								</th>
								<th>
									Estado de pago
								</th>
								<th>
									Estado de entrega
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(pop, indice) in pedido.funkoPop" v-bind:class="{ 'table-success' : disponibilidadPedido(pop)}">
								<td >
									{{ pop.nombrePop  }}
								</td>
								<td >
									{{ pop.cantidad  }}
								</td>
								<td >
									{{ pop.costoFigura  }}
								</td>
								<td >
									{{ pop.pago  }}
								</td>
								<td >
									{{ pop.pagoFaltante  }}
								</td>
								<td >
									{{ pop.estado  }}
									<button class="btn btn-success" v-if="checarPago(pop)" @click="registrarPago(pedido.id ,indice,pop.costoFigura,indiceP)">
										Pagado
									</button>
								</td>
								<td >
									{{ pop.estadoEntrega }}
									<button class="btn btn-success" v-if="checarEntrega(pop)" @click="registrarEntrega(pedido.id ,indice,pop.costoFigura,indiceP)">
										Entregado
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</template>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="pedidosModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-lg" role="document">
			    <div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Pedidos Funko Pop</h4>
					</div>
					<div class="modal-body">
				      	<div class="form-inline">
							<div class="form-group">
						      	<label for="">Nombre de pedido:</label>
						        <input type="text" v-model="pedidoD.nombrePedido" class="form-control">
						    </div>
				      		<ul class="list-group">
			
							    <li class="list-group-item" v-for="(funkoPop, index) in pedidoD.funkoPop">
							    	<div class="figure-division">
								      	<div class="form-group">
									      	<label for="nombrePop">Nombre Funko Pop:</label>
									        <input type="text" v-model="funkoPop.nombrePop" class="form-control">
									    </div>
									    <div class="form-group">
									      	<label for="cantidad">Cantidad:</label>
									        <input type="number" v-model="funkoPop.cantidad" class="form-control">
									    </div>
										<div class="form-group">
											<label for="costoFigura">Costo Figura:</label>
											<select v-model="funkoPop.costoFigura">
											  <option disabled value="">Selecciona un costo</option>
											  <option v-for="costo in costoFigura">{{ costo }}</option>
											</select>
										</div>
									</div>
							    </li>
							</ul>

							<button class="btn btn-primary" @click="agregarFunkoPop">Agregar</button>

							<div class="align-right">
								<div class="checkbox">
								    <label>
								      <input type="checkbox" v-model="preventa"> Preventa
								    </label>
								</div>
							</div>

					    </div>
					</div>
				    <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarPedido()">Guardar</button>
				    </div>
				</div>
		  	</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="costoFiguraModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-lg" role="document">
			    <div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Agregar costo figura Funko Pop</h4>
					</div>
			      	<div class="modal-body">
			      		<div class="form-group">
							<label for="">Costo figura:</label>
					        <input type="number" v-model="costoFigura" class="form-control">
					    </div>
			    	</div>
				    <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarCostoFigura()">Guardar</button>
				    </div>
				</div>
	  		</div>
		</div>

	</div>
</template>

<script>
	

	export default {
		data (){
			return{
				pedidos: [
					{
						nombrePedido: "",
						funkoPop:[
							{
								nombrePop: "",
								cantidad: 0,
								costoFigura: 0,
								costoEnvioFigura: 0,
								status: 0,
								pago: 0,
								pagoFaltante: 0,
								preventa: false,
								estado: "",
								estadoEntrega: ""
							}	
						]
						
					}
				],
				pedido: {
					nombrePedido: "",
					funkoPop:[
						{
							nombrePop: "",
							cantidad: 0,
							costoFigura: 0,
							costoEnvioFigura: 0,
							status: 0,
							pago: 0,
							pagoFaltante: 0,
							preventa: false,
							estado: "",
							estadoEntrega: ""
						}	
					]
				},
				pedidoD: {
					nombrePedido: "",
					funkoPop:[
						{
							nombrePop: "",
							cantidad: 0,
							costoFigura: 0,
							costoEnvioFigura: 0,
							status: 0,
							pago: 0,
							pagoFaltante: 0,
							preventa: false,
							estado: "",
							estadoEntrega: ""
						}	
					]
				},
				preventa: false,
				costoFigura: []
			}
		},
	  	methods:{
	  		agregarFunkoPop(){
				this.pedidoD.funkoPop.push(
					{
						nombrePop: '',
						cantidad: 0,
						costoFigura: 0,
						costoEnvioFigura: 0,
						status: 0,
						pago: 0,
						pagoFaltante: 0,
						preventa: false,
						estado: ""
					}
				);
			},
			agregarPedido(){

				var preventa = this.preventa;
				var nombrePedido = this.pedidoD.nombrePedido.trim();

				for (let pedido in this.pedidoD.funkoPop) {
					this.pedidoD.funkoPop[pedido].nombrePop = this.pedidoD.funkoPop[pedido].nombrePop.trim();
					this.pedidoD.funkoPop[pedido].costoFigura = parseFloat(this.pedidoD.funkoPop[pedido].costoFigura);
					this.pedidoD.funkoPop[pedido].preventa = preventa;
					this.pedidoD.funkoPop[pedido].estadoEntrega = "Pendiente envio";

					if(preventa){
						this.pedidoD.funkoPop[pedido].pago = this.pedidoD.funkoPop[pedido].costoFigura * .10;
						this.pedidoD.funkoPop[pedido].pagoFaltante = this.pedidoD.funkoPop[pedido].costoFigura * .90;
						this.pedidoD.funkoPop[pedido].estado = "Falta pago restante";
					}
					else{
						this.pedidoD.funkoPop[pedido].pago = 0;
						this.pedidoD.funkoPop[pedido].pagoFaltante = this.pedidoD.funkoPop[pedido].costoFigura;
						this.pedidoD.funkoPop[pedido].estado = "Falta de pago";
					}

				}
				
				var pedido = this.pedidoD.funkoPop;

				this.axios.post('https://funkopop-e84d7.firebaseio.com/pedidos.json',{
					nombrePedido,
					pedido
				}).then(respuesta => {
					setTimeout(function(){
						$('#pedidosModal').modal('hide');
					},500);
					if(respuesta.status == 200){
						this.pedidoD.nombrePedido = "";
						this.pedidoD.funkoPop = [
							{
								nombrePop: "",
								cantidad: 0,
								costoFigura: 0,
								costoEnvioFigura: 0,
								status: 0,
								pago: 0,
								pagoFaltante: 0,
								preventa: false,
								estado: ""
							}
						];
						this.getPedidos();
					}
				});
			},
			getPedidos(){
		    	this.axios.get('https://funkopop-e84d7.firebaseio.com/pedidos.json')
		        .then(respuesta => { 
		            return respuesta.data;
		        })
		        .then(respuestaJson => {
					this.pedido.nombrePedido = "";
					this.pedidos = [];
					for (let id in respuestaJson){
						this.pedido.nombrePedido = respuestaJson[id].nombrePedido;
						this.pedido.funkoPop = [];
						for (let pedido in respuestaJson[id].pedido) {
							this.pedido.funkoPop.push(respuestaJson[id].pedido[pedido]);
						}
						let pedido = {
						id: id,
						nombrePedido: this.pedido.nombrePedido,
						funkoPop : this.pedido.funkoPop
					}
					this.pedidos.push(pedido);
					}
		        });
		        
		    },
		    agregarCostoFigura(){
		    	var costoFigura = this.costoFigura;
		    	this.axios.post('https://funkopop-e84d7.firebaseio.com/costoFigura.json',{
					costoFigura
				}).then(respuesta => {
					setTimeout(function(){
						$('#costoFiguraModal').modal('hide');
					},500);
					if(respuesta.status == 200){
						this.costoFigura = [];
						this.getCostoFigura();
					}
				});
		    },
		    getCostoFigura(){
		    	 this.axios.get('https://funkopop-e84d7.firebaseio.com/costoFigura.json')
		        .then(respuesta => { 
		            return respuesta.data;
		        })
		        .then(respuestaJson => {
		          this.costoFigura = [];
		          for (let id in respuestaJson){
		         	this.costoFigura.push(respuestaJson[id].costoFigura);
		         	}
		       
		        });
			        
		    },
		    checarPago(pedido){
		    	if(pedido.estado == "Falta pago restante" || pedido.estado == "Falta de pago" ){
		    		return true;
		    	}
		    	else{
		    		return false;
		    	}
		    },
		    registrarPago(pedidoId,indice,costoFigura,indiceP){
		    	this.axios.patch('https://funkopop-e84d7.firebaseio.com/pedidos/' + pedidoId + '/pedido/' + indice + '.json', {
					pago : costoFigura,
					pagoFaltante: 0,
					estado : "Pagado"
				}).then(respuesta => { 
					if(respuesta.status == 200){
						this.pedidos[indiceP].funkoPop[indice].pago = costoFigura;
						this.pedidos[indiceP].funkoPop[indice].pagoFaltante = 0;
						this.pedidos[indiceP].funkoPop[indice].estado = "Pagado";
						
					}
				})
		    },
		    registrarEntrega(pedidoId,indice,costoFigura,indiceP){
		    	this.axios.patch('https://funkopop-e84d7.firebaseio.com/pedidos/' + pedidoId + '/pedido/' + indice + '.json', {
					estadoEntrega : "Entregado"
				}).then(respuesta => { 
					if(respuesta.status == 200){
						this.pedidos[indiceP].funkoPop[indice].estadoEntrega = "Entregado";
					}
				})
		    },
		    checarEntrega(pedido){
		    	if(pedido.estadoEntrega == "Pendiente envio"){
		    		return true;
		    	}
		    	else{
		    		return false;
		    	}
		    },
		    disponibilidadPedido(pop){
				if(pop.estadoEntrega == "Entregado" && pop.estado == "Pagado"){
					return true;
				}
				else{
					return false;
				}
			},

	  	},
	  	created(){
			this.getPedidos();
			this.getCostoFigura();
		},
		watch: {
		    '$route': 'getCostoFigura',
		  },
	  }


</script>

<style lang="scss">
	.align-right{
		display: flex;
		justify-content: flex-end;
	}

	.new-announcement{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 30px;
		.btn{
			&:first-child{
				margin-right: 20px;
			}
			
		}
	}
	.table-success{
		background-color: #d6e9c6;
	}
</style>
