<template>
	<div class="internal-content">

		<div class="add-order-button-container">
			<button data-toggle="modal" data-target="#pedidoModal" class="btn btn-primary btn-lg btn-block">Agregar Pedido</button>
		</div>
		<div class="panel panel-default panel-pedidos">
			<div class="panel-heading">
				<h1>Pedidos AAA</h1>
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
								<table class="table table-bordered table-funkopop">
								  <thead>
								    <tr>
								      <th scope="col">Pop</th>
								      <th scope="col">Cantidad</th>
								      <th scope="col">Modificar/Borrar</th>
								    </tr>
								  </thead>
								  <tbody v-for="(pop, indice) in pedido.popsPedidos">
								    <tr>
								      <td>{{pop.nombrePop}}</td>
								      <td>
									    <input type="number" v-model="pop.cantidad" class="form-control">
								  	  </td>
								      <td>
								      	<div class="column-button">
									      	<button type="button" class="btn btn-warning" v-on:click="modificarCantidadApartadaPop(pedido.id,indice)">
									      		<span aria-hidden="true" class="glyphicon glyphicon-pencil"></span>
									      	</button>
									      	<button type="button" class="btn btn-danger" v-on:click="quitarPopApartado(pedido.id,indice)">
									      		<span aria-hidden="true" class="glyphicon glyphicon-remove"></span>
									      	</button>
									    </div>
								      </td>
								    </tr>
								  </tbody>
								</table>
							</div>
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
								</div>
						    </li>
						</ul>
						<div class="form-group">
					      	<label for="">$$ de Adelanto:</label>
					        <input type="number" v-model="pedidos[0].adelanto" class="form-control">
					    </div>
						<button class="btn btn-primary" @click="agregarPopPedido">Agregar</button>
			     	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarPedido()">Guardar</button>
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
							cantidad: 0
						}
					],
					adelanto: 0
				}	
			],
			pedidosGuardados : []
	    }
	},
	methods: {
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
					cantidad: 0	
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
		modificarCantidadApartadaPop(id,index){
			for (let pedido in this.pedidosGuardados){
				if(this.pedidosGuardados[pedido].id == id){
					let popPedidoCantidad = this.pedidosGuardados[pedido].popsPedidos[index].cantidad;
					this.axios.patch('https://funko-pop.firebaseio.com/pedidos/' + id + '/popsPedidos/' + index +'.json',{
						cantidad : popPedidoCantidad
					}).then(respuesta => {
						if(respuesta.status == 200){
							//this.apartados = "";
						}
					});
					return;
				}
			}
			
		},
		quitarPopApartado: function (id,index) {
			for (let pedido in this.pedidosGuardados){
				if(this.pedidosGuardados[pedido].id == id){
					this.pedidosGuardados[pedido].popsPedidos.splice(index, 1);
					this.axios.patch('https://funko-pop.firebaseio.com/pedidos/' + id +'.json',{
						cantidad : this.pedidosGuardados[pedido].cantidad,
						nombreCliente: this.pedidosGuardados[pedido].nombreCliente,
						popsPedidos: this.pedidosGuardados[pedido].popsPedidos
					}).then(respuesta => {
						if(respuesta.status == 200){
							//this.apartados = "";
						}
					});
					return;
				}

			}
			
			//this.pedidos[id].splice(index, 1);
		}
	},
	created(){
    	this.getDataOrder();
  	},
}

</script>

<style lang="scss">
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

</style>