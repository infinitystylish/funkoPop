<template>
	<div class="internal-content">

		<div class="new-announcement">
			<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#pedidosModal">Nuevo pedido</button>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado de pedidos</h1>
			</div>
			<div class="panel-body">
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
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="(pedido, indice) in pedido.funkoPop">
							<tr v-for="(funkoPop, indice) in pedido">
								<td >
									{{ funkoPop.nombrePop  }}
								</td>
								<td >
									{{ funkoPop.cantidad  }}
								</td>
								<td >
									{{ funkoPop.costoFigura  }}
								</td>
								<td >
									{{ funkoPop.pago  }}
								</td>
								<td >
									{{ funkoPop.pagoFaltante  }}
								</td>
								<td >
									{{ funkoPop.status  }}
								</td>
							</tr>
						</template>
					</tbody>
				</table>
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
									  <option>200</option>
									  <option>300</option>
									  <option>225</option>
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

	</div>
</template>

<script>
	

	export default {
		data (){
			return{
				pedidoD: {
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
							estado: "Pedido / No pagado"
						}	
					]
					
				},
				pedido: {
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
							estado: "Pedido / No pagado"
						}	
					]
					
				},
				preventa: false
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
						estado: "Pedido / No pagado"
					}
				);
			},
			agregarPedido(){

				var preventa = this.preventa;

				for (let pedido in this.pedidoD.funkoPop) {
					this.pedidoD.funkoPop[pedido].nombrePop = this.pedidoD.funkoPop[pedido].nombrePop.trim();
					this.pedidoD.funkoPop[pedido].costoFigura = parseFloat(this.pedidoD.funkoPop[pedido].costoFigura);
					this.pedidoD.funkoPop[pedido].preventa = preventa;

					if(preventa){
						this.pedidoD.funkoPop[pedido].pago = this.pedidoD.funkoPop[pedido].costoFigura * .10;
						this.pedidoD.funkoPop[pedido].pagoFaltante = this.pedidoD.funkoPop[pedido].costoFigura * .90;
					}
					else{
						this.pedidoD.funkoPop[pedido].pago = 0;
						this.pedidoD.funkoPop[pedido].pagoFaltante = this.pedidoD.funkoPop[pedido].costoFigura;
					}
				}
				
				var pedido = this.pedidoD.funkoPop;

				this.axios.post('https://funkopop-e84d7.firebaseio.com/pedidos.json',{
					pedido
				}).then(respuesta => {
					setTimeout(function(){
						$('#pedidosModal').modal('hide');
					},500);
					if(respuesta.status == 200){
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
								estado: "Pedido / No pagado"
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
		          this.pedido.funkoPop = [];
		          for (let id in respuestaJson){
		          	for (let pedido in respuestaJson[id]) {
		          		this.pedido.funkoPop.push( respuestaJson[id][pedido]);
		          	}

		          }
		        });
		    },
	  	},
	  	created(){
			this.getPedidos();
		},
	  }


</script>

<style lang="scss">
	.align-right{
		display: flex;
		justify-content: flex-end;
	}
</style>
