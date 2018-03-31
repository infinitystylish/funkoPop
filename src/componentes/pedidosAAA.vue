<template>
	<div class="internal-content order">
		
		<div class="alert alert-success" role="alert"v-bind:class="{ active: datosGuardados }">
			Los datos han sido guardados
		</div>
		
		<div class="alert alert-success" role="alert" v-bind:class="{ active: datosActualizados }">
			Los datos han sido actualizados
		</div>

		<div class="alert alert-success" role="alert" v-bind:class="{ active: datosModificados }">
			Los datos han sido modificados
		</div>

		<div class="alert alert-success" role="alert" v-bind:class="{ active: datosBorrados }">
			El pedido ha sido eliminado
		</div>
		
		<div class="alert alert-success" role="alert" v-bind:class="{ active: datosQuitados}">
			Se ha quitado el pop del pedido
		</div>

		<div class="add-order-button-container">
			<button data-toggle="modal" data-target="#pedidoModal" class="btn btn-primary btn-lg btn-block" v-on:click="clearPedido()">Agregar Pedido</button>
		</div>

		<div class="panel panel-default panel-pedidos">
			<div class="panel-heading">
				<h1>Pedidos clientes</h1>
			</div>
			<div class="panel-body">
				<div class="orders">
					<div class="order col-md-6" v-for="(pedido, indice) in pedidosGuardados">
						
						<div class="order-container">
							<div class="card-header">
						    	<div class="name-order">{{pedido.nombreCliente}}</div>
						    	<button type="button" class="btn btn-success">
								  Adelanto <span class="badge badge-light"> {{pedido.adelanto}} </span>
								</button>
						  	</div>
							<div class="table-responsive">
								<table class="table table-bordered table-funkopop orders">
								  <thead>
								    <tr>
								      <th scope="col">Pop</th>
								      <th scope="col">Cantidad</th>
								       <th scope="col">Precio</th>
								       <th scope="col">Total</th>
								      <th scope="col">Guardar/Borrar</th>
								    </tr>
								  </thead>
								  <tbody v-for="(pop, indicePop) in pedido.popsPedidos">
								    <tr>
								      <td>{{pop.nombrePop}}</td>
								      <td>
									    <input type="number" v-model="pop.cantidad" class="form-control">
								  	  </td>
								  	  <td>
									    <input type="number" v-model="pop.precio" class="form-control">
								  	  </td>
								  	  <td>
									    {{pop.precio * pop.cantidad}}
								  	  </td>
								      <td>
								      	<div class="column-button">
									      	<button type="button" class="btn btn-success" v-on:click="modificarCantidadApartadaPop(pedido.id,indice,indicePop)">
									      		<span aria-hidden="true" class="glyphicon glyphicon-pencil"></span>
									      	</button>
									      	<button type="button" class="btn btn-danger" v-on:click="quitarPopApartado(pedido.id,indice,indicePop)">
									      		<span aria-hidden="true" class="glyphicon glyphicon-remove"></span>
									      	</button>
									    </div>
								      </td>
								    </tr>
								  </tbody>
								</table>
							</div>
							<div class="card-footer">
								Monto Total: {{pedido.total}}
							</div>
							<button type="button"  data-toggle="modal" data-target="#agregarPedidoModal" class="btn btn-success btn-block" v-on:click="guardarDatosApartado(indice)">
								Agregar / Modificar pedido
							</button>
							<button type="button"  data-toggle="modal" class="btn btn-danger btn-block" v-on:click="quitarPedido(pedido.id,indice)">
								Quitar pedido
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="pedidoModal" tabindex="-1" role="dialog" aria-labelledby="pedidoModal">
			<div class="modal-dialog" role="document">
		    	<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Agregar Pedido</h4>
					</div>
			      	<div class="modal-body">
					    <div class="form-group">
					      	<label for="">Nombre:</label>
					        <input type="text" v-model="nombreCliente" class="form-control">
					    </div>
				      	<ul class="list-group">
						    <li class="list-group-item" v-for="(pedido, index) in popsPedidos">

						    	<div class="figure-division">
							      	<div class="form-group">
								      	<label for="nombrePop">Nombre pop:</label>
								        <input type="text" v-model="pedido.nombrePop" class="form-control">
								    </div>
								    <div class="form-group">
								      	<label for="cantidad">Cantidad:</label>
								        <input type="number" v-model="pedido.cantidad" class="form-control">
								    </div>
								    <div class="form-group">
								      	<label for="precio">Precio:</label>
								        <input type="number" v-model="pedido.precio" class="form-control">
								    </div>
								</div>
						    </li>
						</ul>
						<button class="btn btn-primary" @click="agregarPopPedido">Agregar</button>
						<div class="form-group advance">
					      	<label for="">$$ de Adelanto:</label>
					        <input type="number" v-model="adelanto" class="form-control">
					    </div>
			     	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-default" v-on:click="initPedido()" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarPedido()">Guardar</button>
			      	</div>
			    </div>
		  	</div>
		</div>

		<!-- Modal -->

		<div class="modal fade" id="agregarPedidoModal" tabindex="-1" role="dialog" aria-labelledby="agregarPedidoModal">
			<div class="modal-dialog" role="document">
		    	<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Agregar mas pops al Pedido</h4>
					</div>
			      	<div class="modal-body">
					    <div class="form-group">
					        <h2>{{nombreCliente}}</h2>
					    </div>
				      	 <ul class="list-group">
						    <li class="list-group-item" v-for="(pedido, index) in popsPedidos">
						    	<div class="figure-division">
							      	<div class="form-group">
								      	<label for="nombrePop">Nombre pop:</label>
								        <input type="text" v-model="pedido.nombrePop" class="form-control">
								    </div>
								    <div class="form-group">
								      	<label for="cantidad">Cantidad:</label>
								        <input type="number" v-model="pedido.cantidad" class="form-control">
								    </div>
								    <div class="form-group">
								      	<label for="precio">Precio:</label>
								        <input type="number" v-model="pedido.precio" class="form-control">
								    </div>
								</div>
						    </li>
						</ul>
						<button class="btn btn-primary" @click="agregarPopPedido()">Agregar</button>
						<button class="btn btn-primary btn-danger" @click="quitarPopPedido()">Quitar</button>
						<div class="form-group advance">
					      	<label for="">$$ de Adelanto:</label>
					        <input type="number" v-model="adelanto" class="form-control">
					    </div>
			     	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarPedidoActualizado(identificaPedido)">Guardar</button>
			      	</div>
			    </div>
		  	</div>
		</div>


	</div>
</template>

<script>

export default {
	props: ['pops'],
	data() {
	    return {
	    	pedidos:[
				{
					nombreCliente: "",
					popsPedidos: [
						{
							nombrePop: "",
							cantidad: 1,
							precio: 280
						}
					],
					adelanto: 0
				}	
			],
			pedidosGuardados : [],
			identificaPedido : 0,
			nombreCliente: '',
			popsPedidos: [
				{
					nombrePop: "",
					cantidad: 1,
					precio: 280
				}
			],
			adelanto: 0,
			datosGuardados: false,
			datosActualizados: false,
			datosModificados: false,
			datosBorrados: false,
			datosQuitados: false
	    }
	},
	methods: {
		hideNotification(){
			setTimeout(() => {
				this.datosGuardados = false,
				this.datosActualizados = false,
				this.datosModificados = false,
				this.datosBorrados = false,
				this.datosQuitados = false
			},3000);
		},
		getDataOrder(){

	    	this.axios.get('https://funko-pop.firebaseio.com/pedidos.json')
	        .then(respuesta => { 
	            return respuesta.data;
	        })
	        .then(respuestaJson => {
				this.pedidosGuardados = [];

				for (let id in respuestaJson){
		            let pedido = {
						id: id,
						nombreCliente: respuestaJson[id].nombreCliente,
						popsPedidos: respuestaJson[id].popsPedidos,
						adelanto: respuestaJson[id].adelanto
		            }
		            this.pedidosGuardados.push(pedido);
	          	}
	        });

	    },
		agregarPopPedido(){

			this.popsPedidos.push(
				{
					nombrePop: "",
					cantidad: 1,
					precio: 280
				}		
			);

		},
		quitarPopPedido(){
			this.popsPedidos.pop();
		},
		clearPedido(){
			this.nombreCliente = "";
			this.adelanto = 0;
			this.popsPedidos = [
				{
					nombrePop: "",
					cantidad: 1,
					precio: 280
				}
			];
		},
		initPedido(){

			this.pedidos = [
				{
					nombreCliente: "",
					popsPedidos: [
						{
							nombrePop: "",
							cantidad: 0,
							precio: 0
						}
					],
					adelanto: 0
				}	
			]

		},
		agregarPedido(){

			var nombreCliente = this.nombreCliente.trim();
			var popsPedidos = this.popsPedidos;
			var adelanto = parseFloat(this.adelanto);

			this.axios.post('https://funko-pop.firebaseio.com/pedidos.json',{
				nombreCliente: nombreCliente,
				popsPedidos: popsPedidos,
				adelanto: adelanto
			}).then(respuesta => {
				setTimeout(function(){
					$('#pedidoModal').modal('hide');
				},500);
				if(respuesta.status == 200){
					let pedido = {
						nombreCliente: nombreCliente,
						popsPedidos: popsPedidos,
						adelanto: adelanto
		            }
		            this.pedidosGuardados.push(pedido);

					this.nombreCliente = "";
					this.adelanto = 0;
					this.popsPedidos = [
						{
							nombrePop: "",
							cantidad: 1,
							precio: 280
						}
					]

					this.datosGuardados = true;
					this.hideNotification();
				}
			});

		},
		agregarPedidoActualizado: function(identificaPedido){

			let nombreCliente = this.pedidosGuardados[identificaPedido].nombreCliente;
			let popsPedidos = this.pedidosGuardados[identificaPedido].popsPedidos;
			let adelanto = this.adelanto;
			let id = this.pedidosGuardados[identificaPedido].id;
			this.axios.patch('https://funko-pop.firebaseio.com/pedidos/' + id + '.json',{
				nombreCliente: nombreCliente,
				popsPedidos: popsPedidos,
				adelanto: adelanto
			}).then(respuesta => {
				setTimeout(function(){
					$('#agregarPedidoModal').modal('hide');
				},500);
				if(respuesta.status == 200){
					this.pedidosGuardados[identificaPedido].adelanto = adelanto;

					this.nombreCliente = "";
					this.adelanto = 0;
					this.popsPedidos = [
						{
							nombrePop: "",
							cantidad: 1,
							precio: 280
						}
					]

					this.datosActualizados = true;
					this.hideNotification();
				}
			});

		},
		modificarCantidadApartadaPop(id,indice,indicePop){

			let popPedidoCantidad = this.pedidosGuardados[indice].popsPedidos[indicePop].cantidad;
			let popPedidoPrecio = this.pedidosGuardados[indice].popsPedidos[indicePop].precio;
			this.axios.patch('https://funko-pop.firebaseio.com/pedidos/' + id + '/popsPedidos/' + indicePop +'.json',{
				cantidad : popPedidoCantidad,
				precio : popPedidoPrecio
			}).then(respuesta => {
				if(respuesta.status == 200){
					this.datosModificados = true;
					this.hideNotification();
				}
			});
			
		},
		quitarPopApartado: function (id,indice,indicePop) {

			this.pedidosGuardados[indice].popsPedidos.splice(indicePop,1);
			let popsPedidos = this.pedidosGuardados[indice].popsPedidos;

			this.axios.patch('https://funko-pop.firebaseio.com/pedidos/' + id +'.json',{
				popsPedidos: popsPedidos
			}).then(respuesta => {
				if(respuesta.status == 200){
					this.datosQuitados = true;
					this.hideNotification();
				}
			});

			if ( this.pedidosGuardados[indice].popsPedidos.length <= 0 ) { 
				this.pedidosGuardados.splice(indice,1);
				this.axios.delete('https://funko-pop.firebaseio.com/pedidos/' + id +'.json')
					.then(respuesta => {
					if(respuesta.status == 200){
						
					}
				});
			}
		},
		quitarPedido: function(id,indice){
			this.pedidosGuardados.splice(indice,1);
			this.axios.delete('https://funko-pop.firebaseio.com/pedidos/' + id +'.json')
				.then(respuesta => {
				if(respuesta.status == 200){
					this.datosBorrados = true;
					this.hideNotification();
				}
			});
		},
		guardarDatosApartado: function(indice){
			this.identificaPedido = indice;
			this.nombreCliente = this.pedidosGuardados[indice].nombreCliente;
			this.popsPedidos = this.pedidosGuardados[indice].popsPedidos;
			this.adelanto = this.pedidosGuardados[indice].adelanto;
		}
	},
	created(){
		this.getDataOrder();
	},
  	computed:{
		setIndex: function () {
			var originalIndex = 0;
			for(let val in this.pedidosGuardados){
				this.pedidosGuardados[val].originalIndex = originalIndex;
				originalIndex++;
			}
		},
		sumTotalOrder: function(){
			let total = 0;
			let precio = 0;
			for(let val in this.pedidosGuardados){
				total = 0;
				for(let pop in this.pedidosGuardados[val].popsPedidos){
					precio = this.pedidosGuardados[val].popsPedidos[pop].precio * this.pedidosGuardados[val].popsPedidos[pop].cantidad;
					total = parseFloat(total) + parseFloat(precio);
					this.pedidosGuardados[val].total = total;
				}
			}
		}
	},
	watch: {
		sumTotalOrder(){}
	}
}

</script>

<style lang="scss">

	.internal-content.order{
		margin-bottom: 60px;
		margin-top: 65px;
	}

	.table-funkopop.orders{
		margin-bottom: 0;
		tbody{
			td{
				vertical-align: middle;
    			input{
    				width: 70px;
				    padding: 5px 10px;
				    text-align: center;
    			}
			}
		}
	}
	.table-dark {
	    color: #fff;
	    background-color: #212529;
	}

	.table-dark.table-hover tbody tr:hover {
	    background-color: rgba(255,255,255,.075);
	}

	.card-header:first-child {
    	border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
	}

	.card-header {
	    padding: .75rem;
	    margin-bottom: 0;
	    background-color: rgba(0,0,0,.03);
	    border: 1px solid rgba(0,0,0,.125);
		display: flex;
    	justify-content: space-between;
	    .name-order{
	    	font-size: 24px;
	    }
	}

	.card-footer {
	    padding: .75rem;
	    margin-bottom: 30px;
	    background-color: rgba(0,0,0,.03);
	    border: 1px solid rgba(0,0,0,.125);
		display: flex;
    	justify-content: flex-end;
	    .name-order{
	    	font-size: 24px;
	    }
	}

	.panel-pedidos{
		margin-top: 30px;
	}

	.column-button{
		display: flex;
		justify-content: center;
		.btn{
			&:nth-child(2){
				margin-left: 20px;
			}
		}
	}

	.advance{
		margin-top: 30px;
	}

	.order{
		margin-bottom: 30px;
	}

	.add-order-button-container{
		background-color: white;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		height: 80px;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		button{
			max-width: 450px;
			margin-left: auto;
			margin-right: auto;
		}
	}

	.alert {
		position: fixed;
		z-index: 1031;
		visibility: hidden;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 0;
		transition: all 0.5s ease-in 1s; 
	    &.active{
			opacity: 1;
			visibility: visible;
	    }
	}
	

	@media (max-width: 767px){
		.form-control{
			padding: 6px;
		}
	}

</style>