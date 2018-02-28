<template>
	<div class="internal-content">

		<div class="add-order-button-container">
			<button data-toggle="modal" data-target="#pedidoModal" class="btn btn-primary btn-lg btn-block">Agregar Pedido</button>
		</div>
		<div class="panel panel-default panel-pedidos">
			<div class="panel-heading">
				<h1>Pedidos clientes</h1>
			</div>
			<div class="panel-body">
				<div class="orders row">
					<div class="order col-sm-4" v-for="(pedido, indice) in pedidosGuardados">
						
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
								      <th scope="col">Modificar/Borrar</th>
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
								      	<div class="column-button">
									      	<button type="button" class="btn btn-warning" v-on:click="modificarCantidadApartadaPop(pedido.id,indice,indicePop)">
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
								
								{{pedido.total}}
								
							</div>
							<button type="button"  data-toggle="modal" data-target="#agregarPedidoModal" class="btn btn-success btn-block" v-on:click="guardarDatosApartado(indice)">
								Agregar / Modificar pedido
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
					        <input type="text" v-model="pedidos[0].nombreCliente" class="form-control">
					    </div>
				      	<ul class="list-group">
						    <li class="list-group-item" v-for="(pedido, index) in pedidos[0].popsPedidos">
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
					        <input type="number" v-model="pedidos[0].adelanto" class="form-control">
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
								</div>
						    </li>
						</ul>
						<button class="btn btn-primary" @click="agregarPopPedido()">Agregar</button>
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
							cantidad: 0,
							precio: 0
						}
					],
					adelanto: 0
				}	
			],
			pedidosGuardados : [],
			identificaPedido : 0,
			nombreCliente: '',
			popsPedidos: [],
			adelanto: 0,
	    }
	},
	methods: {
		sumTotalOrder: function(){
			let total = 0;
			let precio = 0;
			for(let val in this.pedidosGuardados){
				total = 0;
				for(let pop in this.pedidosGuardados[val].popsPedidos){
					precio = this.pedidosGuardados[val].popsPedidos[pop].precio;
					total = parseFloat(total) + parseFloat(precio);
					this.pedidosGuardados[val].total = total;
				}
			}
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
		            //this.pops.sort(this.compare)
	          	}
	        });
	    },
		agregarPopPedido(){
			this.pedidos[0].popsPedidos.push(
				{
					nombrePop: "",
					cantidad: 0,
					precio: 0
				}		
			);
		},
		agregarPedido(){

			var nombreCliente = this.pedidos[0].nombreCliente.trim();
			var popsPedidos = this.pedidos[0].popsPedidos;
			var adelanto = parseFloat(this.pedidos[0].adelanto);

			this.axios.post('https://funko-pop.firebaseio.com/pedidos.json',{
				nombreCliente: nombreCliente,
				popsPedidos: popsPedidos,
				adelanto: adelanto
			}).then(respuesta => {
				console.log(respuesta);
				setTimeout(function(){
					$('#pedidoModal').modal('hide');
				},500);
				if(respuesta.status == 200){
					this.pedidos[0].nombreCliente = "";
					this.pedidos[0].adelanto = "";
					this.pedidos[0].popsPedidos = [
						{
							nombrePop: "",
							cantidad: 0
						}
					]
				}
			});

		},
		agregarPedidoActualizado: function(identificaPedido){

			let nombreCliente = this.pedidosGuardados[identificaPedido].nombreCliente;
			let popsPedidos = this.pedidosGuardados[identificaPedido].popsPedidos;
			let adelanto = this.pedidosGuardados[identificaPedido].adelanto;
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
					//this.apartados = "";
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
					//this.apartados = "";
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
					//this.apartados = "";
				}
			});

			if ( this.pedidosGuardados[indice].popsPedidos.length <= 0 ) { 
				this.pedidosGuardados.splice(indice,1);
				console.log(id);
				console.log(this.pedidosGuardados);
				this.axios.delete('https://funko-pop.firebaseio.com/pedidos/' + id +'.json')
					.then(respuesta => {
					if(respuesta.status == 200){
						//this.apartados = "";
					}
				});
			}
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
	},
	watch: {
		"pedidosGuardados": function(){
			this.sumTotalOrder();
		}
	}
}

</script>

<style lang="scss">

	.table-funkopop.orders{
		margin-bottom: 0;
	}
	.add-order-button-container{
		max-width: 450px;
		margin-left: auto;
		margin-right: auto;
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

	.order{
		margin-top: 30px;
	}

	.panel-pedidos{
		margin-top: 50px;
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

</style>