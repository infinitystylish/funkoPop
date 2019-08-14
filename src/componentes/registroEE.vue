<template>
	<div class="internal-content controlEE">
		<div class="add-order-button-container">
			<button data-toggle="modal" data-target="#registroModal" class="btn btn-primary btn-lg btn-block" v-on:click="">Registrar Pedido</button>
		</div>

		
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Registro de Pedidos de EE</h1>
			</div>
			<div class="panel-body">
				<div class="table-responsive">
					<template v-for="(registro, indice) in registrosPedidosCompletoEE.slice().reverse()">
						<h1>{{registro.nombreRegistro}}</h1>
						<table class="table table-hover table-bordered table-funkopop controlEE">
							<thead>
								<tr>
									<th>
										Nombre pedido
									</th>
									<th>
										Cantidad
									</th>
									<th>
										Costo USD
									</th>
									<th>
										Costo Figura
									</th>
									<th>
										Costo Total
									</th>
									<th>
										Envio EU
									</th>
									<th>
										Costo Envio EU Total
									</th>
									<th>
										Comision Imp
									</th>
									<th>
										Costo Total Importacion
									</th>
									<th>
										Costo Envio MX
									</th>
									<th>
										Costo Total Figura
									</th>
									<th>
										Costo Total Figuras
									</th>
									<th>
										Costo Dolar
									</th>
								</tr>
							</thead>
							<tbody>
							
								<tr v-for="(pedidosPop, indiceP) in registro.pedidosPop">
									<td>
										{{ pedidosPop.nombrePop }}
									</td>
									<td>
										{{ pedidosPop.cantidad }}
									</td>
									<td>
										{{ pedidosPop.costoDls }}
									</td>
									<td>
										{{ pedidosPop.costoFigura.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoTotal.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoEnvioXFiguraEU.toFixed(2) }}
										
									</td>
									<td>
										{{ pedidosPop.costoTotalEnvioXFiguraEU.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoImportacion.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoTotalImportacion.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoEnvioMx.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoTotalFigura.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoTotalFiguras.toFixed(2) }}
									</td>
									<td>
										{{ pedidosPop.costoDolar.toFixed(2)}}
									</td>
								</tr>
								<tr>
									<td>
										<button data-toggle="modal" data-target="#agregarRegistroModal" class="btn btn-primary btn-small btn-block" v-on:click="guardarTemporalPedido(registro.id,indice)">Agregar Pop / Modificar Pedido</button>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										{{ registro.sumaCostoFigura.toFixed(2) }}
									</td>
									<td></td>
									<td>
										{{ registro.sumaCostoEnvioEU.toFixed(2) }}
									</td>
									<td></td>
									<td>
										{{ registro.sumaCostoImportacion.toFixed(2) }}
									</td>
									<td></td>
									<td></td>
									<td>
										{{ registro.sumaCostoTotalFiguras.toFixed(2) }}
									</td>
								</tr>
							</tbody>
						</table>
						<table class="table table-hover table-bordered table-funkopop controlAAA">
						<thead>
							<tr>
								<th>
									Costo Figura Pesos
								</th>
								<th>
									Envio EU Pesos
								</th>
								<th>
									Costo de importación
								</th>
								<th>
									Envio Mx
								</th>
								<th>
									Total
								</th>
								<th>
									Costo Dolar Promedio
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									{{ registro.sumaCostoFigura.toFixed(2) }}
								</td>
								<td>
									{{ registro.costoEnvioEU.toFixed(2) }}
								</td>
								<td>
									{{ registro.comprobacionCostoImportacion.toFixed(2) }}
								</td>
								<td>
									<!-- error -->
									{{ registro.costoEnvioMX }}
								</td>
								<td>
									{{ registro.sumaTotal.toFixed(2) }}
								</td>
								<td>
									{{ registro.sumaCostoDolar }}
								</td>
							</tr>
						</tbody>
					</table>
					</template>
				</div>
			</div>
		</div>


		<!-- Modal -->
		<div class="modal fade" id="registroModal" tabindex="-1" role="dialog" aria-labelledby="registroModal">
			<div class="modal-dialog" role="document">
		    	<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Agregar Registro</h4>
					</div>
			      	<div class="modal-body">
					    <div class="form-group">
					      	<label for="">Nombre de registro(#):</label>
					        <input type="text" v-model="nombreRegistro" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio EU [Mnx]:</label>
					        <input type="text" v-model="costoEnvioEU" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio MX [Mnx]:</label>
					        <input type="text" v-model="costoEnvioMX" class="form-control">
					    </div>
					    <ul class="list-group">
						    <li class="list-group-item" v-for="(pedidoPop, index) in nuevoPedidoPop">
								<div class="figure-division">
									<div class="row">
										<div class="col-sm-3">
											<div class="form-group">
										      	<label for="nombrePop">Nombre pop:</label>
										        <input type="text" v-model="pedidoPop.nombrePop" class="form-control">
										    </div>
										</div>
										<div class="col-sm-2">
										    <div class="form-group">
										      	<label for="cantidad">Cantidad:</label>
										        <input type="number" v-model="pedidoPop.cantidad" class="form-control">
										    </div>
										</div>
										<div class="col-sm-3">
										    <div class="form-group">
										      	<label for="costoDls">Costo USD:</label>
										        <input type="number" v-model="pedidoPop.costoDls" class="form-control">
										    </div>
									    </div>
									    <div class="col-sm-4">
										    <div class="form-group">
										      	<label for="costoDls">Cobro del banco:</label>
										        <input type="number" v-model="pedidoPop.cobroBanco" class="form-control">
										    </div>
									    </div>
									</div>
								</div>
							</li>
						</ul>
						<button class="btn btn-primary" @click="agregarPopPedido">Agregar</button>
						<button class="btn btn-primary btn-danger" @click="quitarPopPedido()">Quitar</button>
			     	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-default" v-on:click="" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarRegistroPedido">Guardar</button>
			      	</div>
			    </div>
		  	</div>
		</div>

		<!-- Modal Agregar Registro Modal -->
		<div class="modal fade" id="agregarRegistroModal" tabindex="-1" role="dialog" aria-labelledby="agregarRegistroModal">
			<div class="modal-dialog" role="document">
		    	<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Agregar Registro</h4>
					</div>
			      	<div class="modal-body">
					    <div class="form-group">
					      	<label for="">Nombre de registro</label>
					        <input type="text" v-model="registroTemporal.nombreRegistro" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio EU [Dls]:</label>
					        <input type="text" v-model="registroTemporal.costoEnvioEU" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio MX [Mnx]:</label>
					        <input type="text" v-model="registroTemporal.costoEnvioMX" class="form-control">
					    </div>
					    <ul class="list-group">
						    <li class="list-group-item" v-for="(pedidoPop, index) in registroTemporal.pedidosPop">
								<div class="figure-division">
									<div class="row">
										<div class="col-sm-3">
											<div class="form-group">
										      	<label for="nombrePop">Nombre pop:</label>
										        <input type="text" v-model="pedidoPop.nombrePop" class="form-control">
										    </div>
										</div>
										<div class="col-sm-2">
										    <div class="form-group">
										      	<label for="cantidad">Cantidad:</label>
										        <input type="number" v-model="pedidoPop.cantidad" class="form-control">
										    </div>
										</div>
										<div class="col-sm-3">
										    <div class="form-group">
										      	<label for="costoDls">Costo USD:</label>
										        <input type="number" v-model="pedidoPop.costoDls" class="form-control">
										    </div>
									    </div>
									     <div class="col-sm-4">
										    <div class="form-group">
										      	<label for="costoDls">Cobro del banco:</label>
										        <input type="number" v-model="pedidoPop.cobroBanco" class="form-control">
										    </div>
									    </div>
									</div>
								</div>
							</li>
						</ul>
						<button class="btn btn-primary" @click="agregarPopRegistroModificado(registroTemporal.id,registroTemporal.indice)">Agregar</button>
			     	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-default" v-on:click="" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="guardarRegistroModificado(registroTemporal.id,registroTemporal.indice)">Guardar</button>
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
	    	registroPedidos:[
				{
					pedidosPop:[
						{
							cantidad: 6,
							costoDls: 6.6,
							nombrePop: "",
							cobroBanco: 0,
						}
					],
					costoEnvioEU: '',
					costoEnvioMX: '',
					nombreRegistro: ''
				}	
			],
			nombreRegistro: "",
			costoEnvioEU: 0,
			costoEnvioMX: 0,
			nuevoPedidoPop:[
				{
					cantidad: 6,
					costoDls: 6.6,
					nombrePop: "",
					cobroBanco: 0,
				}
			],
			registrosGuardados : [],
			idPedido : "",
			indice : 0,
			registroTemporal : []
			
	    }
	},
	methods: {
		agregarPopPedido(){

			this.nuevoPedidoPop.push(
				{
					cantidad: 6,
					costoDls: 6.6,
					nombrePop: "",
					cobroBanco: 0,
				}		
			);

		},
		quitarPopPedido(){
			this.nuevoPedidoPop.pop();
		},
		agregarPopRegistroModificado(id,indice){
			this.registroTemporal.pedidosPop.push(
				{
					cantidad: 6,
					costoDls: 6.6,
					nombrePop: "",
					cobroBanco: 0,
				}		
			);
		},
		guardarRegistroModificado(id,indice){

			console.log(this.registroTemporal.costoEnvioMX);
			var nombreRegistro = this.registroTemporal.nombreRegistro.trim();
			var costoEnvioEU = parseFloat(this.registroTemporal.costoEnvioEU);
			var costoEnvioMX = parseFloat(this.registroTemporal.costoEnvioMX);
			var pedidosPop = this.registroTemporal.pedidosPop;

			var id = id;

			this.axios.patch('https://funko-pop.firebaseio.com/registrosEE/' + id + '.json', {
				nombreRegistro: nombreRegistro,
				costoEnvioEU: costoEnvioEU,
				costoEnvioMX: costoEnvioMX,
				pedidosPop: pedidosPop
			}).then(respuesta => { 
				setTimeout(function(){
					$('#agregarRegistroModal').modal('hide');
				},500);
				if(respuesta.status == 200){
					this.registroTemporal = [];
					//this.gananciaEmbalaje = 0;
				}
			})
		},
		agregarRegistroPedido(){
			var nombreRegistro = this.nombreRegistro.trim();
			var costoEnvioEU = parseFloat(this.costoEnvioEU);
			var costoEnvioMX = parseFloat(this.costoEnvioMX);
			var pedidosPop = this.nuevoPedidoPop;

			this.axios.post('https://funko-pop.firebaseio.com/registrosEE.json',{
			 	nombreRegistro: nombreRegistro,
			 	costoEnvioEU: costoEnvioEU,
			 	costoEnvioMX: costoEnvioMX,
			 	pedidosPop : pedidosPop,
			 }).then(respuesta => {
			 	setTimeout(function(){
			 		$('#registroModal').modal('hide');
			 	},500);
			 	if(respuesta.status == 200){

			 		let pedido = {
						nombreRegistro: nombreRegistro,
					 	costoEnvioEU: costoEnvioEU,
					 	costoEnvioMX: costoEnvioMX,
					 	pedidosPop : pedidosPop,
		            }

		            this.registrosGuardados.push(pedido);

					this.nombreRegistro = "";
					this.costoEnvioEU = 0;
					this.costoEnvioMX = 0;
					this.nuevoPedidoPop = [
						{
							cantidad: 6,
							costoDls: 6.6,
							nombrePop: "",
							cobroBanco: 0,
						}
					];
			 	}
			});

		},
		guardarTemporalPedido(id,indice){
			let totalRegistrosPedidosCompleto = (this.totalRegistrosPedidosCompleto - indice) - 1;
			this.registroTemporal = this.registrosGuardados[totalRegistrosPedidosCompleto];
			this.registroTemporal.indice = indice;
		},
		getDataRegister(){

	    	this.axios.get('https://funko-pop.firebaseio.com/registrosEE.json')
	        .then(respuesta => { 
	            return respuesta.data;
	        })
	        .then(respuestaJson => {
				this.registrosGuardados = [];

				for (let id in respuestaJson){
		            let registro = {
						id: id,
						nombreRegistro: respuestaJson[id].nombreRegistro,
						costoEnvioEU: respuestaJson[id].costoEnvioEU,
						costoEnvioMX: respuestaJson[id].costoEnvioMX,
						pedidosPop: respuestaJson[id].pedidosPop
		            }
		            this.registrosGuardados.push(registro);
	          	}

	          	//console.log(this.registrosGuardados);
	        });

	    },
	    
	},
	created(){
		this.getDataRegister();
	},
	computed:{
		registrosPedidosCompletoEE: function(){
			var costoPedidoDls = 0;
			var costoFigura = 0;
			var costoFigura = 0;
			var sumaCobroBanco = 0;
			var costoTotalFiguras = 0;

			var totalPedido = 0;
			var costoDolar = 0;
			var cantidadTotal = 0;
			var cuota = 0;
			var cuotaPesos = 0;
			var costoFigurasPesos = 0;
			var costoTotal = 0;
			var costoTotalPesos = 0;
			var costoEnvioEU
			var costoEnvioEUPesos = 0;
			var costoEnvioXFiguraEU = 0;
			var costoTotalEnvioXFiguraEU = 0;
			var costoImportacion = 0;
			var costoTotalImportacion = 0;
			var costoEnvioMx = 0;
			var costoTotalFigura = 0;

			var sumaCostoFigura = 0;
			var sumaCostoEnvioEU = 0;
			var sumaCostoImportacion = 0;
			var sumaCostoTotalFiguras = 0;
			var comprobacionCostoImportacion = 0;
			var sumaCostoDolar = 0;

			var noPedidos = 0;

			for(let val in this.registrosGuardados){
				cantidadTotal = 0;
				for(let registro in this.registrosGuardados[val].pedidosPop){
					cantidadTotal += parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
					this.registrosGuardados[val].cantidadTotal = cantidadTotal;
				}
			}

			for(let val in this.registrosGuardados){
				sumaCobroBanco = 0
				sumaCostoFigura = 0;
				sumaCostoEnvioEU = 0;
				sumaCostoImportacion = 0;
				sumaCostoTotalFiguras = 0;
				sumaCostoDolar = 0;
				noPedidos = 0;
		    	for(let registro in this.registrosGuardados[val].pedidosPop){
		    		noPedidos ++;
		    		costoPedidoDls = parseFloat(this.registrosGuardados[val].pedidosPop[registro].costoDls) * parseInt(this.registrosGuardados[val].pedidosPop[registro].cantidad);
		    		costoDolar = parseFloat(this.registrosGuardados[val].pedidosPop[registro].cobroBanco) / costoPedidoDls;
		    		costoFigura = parseFloat(this.registrosGuardados[val].pedidosPop[registro].costoDls) * costoDolar;
		    		costoTotal = costoFigura *  parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
		    		costoImportacion = costoFigura * 0.15;
		    		costoEnvioMx = parseFloat(this.registrosGuardados[val].costoEnvioMX) / parseInt(this.registrosGuardados[val].cantidadTotal);
		    		costoEnvioXFiguraEU = parseFloat(this.registrosGuardados[val].costoEnvioEU) / parseInt(this.registrosGuardados[val].cantidadTotal);
		    		costoTotalEnvioXFiguraEU = costoEnvioXFiguraEU * parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
			    	costoTotalImportacion = parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad) * costoImportacion;
			    	costoTotalFigura = costoFigura + costoEnvioXFiguraEU + costoImportacion + costoEnvioMx;
			    	costoTotalFiguras = costoTotalFigura * parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
			    	sumaCostoFigura = sumaCostoFigura + parseFloat(this.registrosGuardados[val].pedidosPop[registro].cobroBanco);
			    	sumaCostoEnvioEU = sumaCostoEnvioEU + costoTotalEnvioXFiguraEU;
			    	sumaCostoImportacion = sumaCostoImportacion + costoTotalImportacion;
			    	sumaCostoTotalFiguras = sumaCostoTotalFiguras + costoTotalFiguras;
			    	sumaCostoDolar = sumaCostoDolar + costoDolar;

			    	this.registrosGuardados[val].pedidosPop[registro].costoPedidoDls = costoPedidoDls;
			    	this.registrosGuardados[val].pedidosPop[registro].costoDolar = costoDolar;
			    	this.registrosGuardados[val].pedidosPop[registro].costoEnvioXFiguraEU = costoEnvioXFiguraEU;
			    	this.registrosGuardados[val].pedidosPop[registro].costoFigura = costoFigura;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotal = costoTotal;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalEnvioXFiguraEU = costoTotalEnvioXFiguraEU;
			    	this.registrosGuardados[val].pedidosPop[registro].costoImportacion = costoImportacion;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalImportacion = costoTotalImportacion;
			    	this.registrosGuardados[val].pedidosPop[registro].costoEnvioMx = costoEnvioMx;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalFigura = costoTotalFigura;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalFiguras = costoTotalFiguras;
		    	}
		    	sumaCostoDolar = sumaCostoDolar / noPedidos;
		    	this.registrosGuardados[val].sumaCostoDolar = sumaCostoDolar;
		    	this.registrosGuardados[val].sumaCostoImportacion = sumaCostoImportacion;
		    	this.registrosGuardados[val].sumaCostoEnvioEU = sumaCostoEnvioEU;
		    	this.registrosGuardados[val].sumaCostoFigura = sumaCostoFigura;
		    	this.registrosGuardados[val].comprobacionCostoImportacion = sumaCostoFigura * 0.15;
		    	this.registrosGuardados[val].sumaCostoTotalFiguras = sumaCostoTotalFiguras;
		    	this.registrosGuardados[val].sumaTotal = sumaCostoFigura + sumaCostoEnvioEU + sumaCostoImportacion + parseFloat(this.registrosGuardados[val].costoEnvioMX);
		    	
			}

			this.totalRegistrosPedidosCompleto = this.registrosGuardados.length;
			return this.registrosGuardados;
		}
	}
}

</script>



<style lang="scss">
	.internal-content{
		&.controlEE{
			margin-bottom: 80px;
		}
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

	.table-funkopop{
		&.controlEE{
			thead{
				tr{
					th{
						font-size: 12px;
					}
				}
			}
			tbody{
				tr{
					td{
						font-size: 12px;
						padding: 2px 6px;
					}
				}
			}
		}
	}

</style>