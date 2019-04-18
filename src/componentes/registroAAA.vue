<template>
	<div class="internal-content controlAAA">
		<div class="add-order-button-container">
			<button data-toggle="modal" data-target="#registroModal" class="btn btn-primary btn-lg btn-block" v-on:click="">Registrar Pedido</button>
		</div>
		

		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Registro de Pedidos de AAA</h1>
			</div>
			<div class="panel-body">
				<div class="table-responsive">
					<template v-for="(registro, indice) in registrosPedidosCompleto.slice().reverse()">
						<h1>{{registro.nombreRegistro}}</h1>
						<table class="table table-hover table-bordered table-funkopop controlAAA">
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
										Cuota
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
										Costo T. Imp
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
										{{ pedidosPop.cuota.toFixed(2) }}
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
								</tr>
								<tr>
									<td>
										<button data-toggle="modal" data-target="#agregarRegistroModal" class="btn btn-primary btn-small btn-block" v-on:click="guardarTemporalPedido(registro.id,indice)">Agregar Pop / Modificar Pedido</button>
									</td>
									<td></td>
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
									Fee Dls(Impuesto)
								</th>
								<th>
									Fee Pesos(Impuesto)
								</th>
								<th>
									Costo Figura Dls
								</th>
								<th>
									Costo Figura Pesos
								</th>
								<th>
									Envio EU Dls
								</th>
								<th>
									Envio EU Pesos
								</th>
								<th>
									Total Dls
								</th>
								<th>
									Total Pesos
								</th>
								<th>
									Envio Mx
								</th>
								<th>
									Cobro Banco Pesos
								</th>
								<th>
									
								</th>
								<th>
									Costo Dólar
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									{{ registro.fee }}
								</td>
								<td>
									{{ registro.cuotaPesos.toFixed(2) }}
								</td>
								<td>
									{{ registro.costoFigurasDls }}
								</td>
								<td>
									{{ registro.costoFigurasPesos.toFixed(2) }}
								</td>
								<td>
									{{ registro.costoEnvioEU }}
								</td>
								<td>
									{{ registro.costoEnvioEUPesos.toFixed(2) }}
								</td>
								<td>
									{{ registro.totalPedido.toFixed(2) }}
									
								</td>
								<td>
									{{ registro.costoTotalPesos }}
								</td>
								<td>
									{{ registro.costoEnvioMX }}
								</td>
								<td>
									{{ registro.cobroBanco }}
								</td>
								<td>
									{{  }}
								</td>
								<td>
									{{ registro.costoDolar }}
								</td>
							</tr>
						</tbody>
					</table>
					</template>
				</div>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="registroModal" tabindex="-1" role="dialog" aria-labelledby="pedidoModal">
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
					      	<label for="costoDls">Costo Figuras [Dls]:</label>
					        <input type="number" v-model="costoFigurasDls" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="costoDls">Fee [Dls]:</label>
					        <input type="number" v-model="fee" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio EU [Dls]:</label>
					        <input type="text" v-model="costoEnvioEU" class="form-control">
					    </div>
						<div class="form-group">
					      	<label for="costoDls">Cobro Banco [Mnx]:</label>
					        <input type="number" v-model="cobroBanco" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio MX [Mnx]:</label>
					        <input type="text" v-model="costoEnvioMX" class="form-control">
					    </div>
					    <ul class="list-group">
						    <li class="list-group-item" v-for="(pedidoPop, index) in nuevoPedidoPop">
								<div class="figure-division">
									<div class="row">
										<div class="col-sm-4">
											<div class="form-group">
										      	<label for="nombrePop">Nombre pop:</label>
										        <input type="text" v-model="pedidoPop.nombrePop" class="form-control">
										    </div>
										</div>
										<div class="col-sm-4">
										    <div class="form-group">
										      	<label for="cantidad">Cantidad:</label>
										        <input type="number" v-model="pedidoPop.cantidad" class="form-control">
										    </div>
										</div>
										<div class="col-sm-4">
										    <div class="form-group">
										      	<label for="costoDls">Costo USD:</label>
										        <input type="number" v-model="pedidoPop.costoDls" class="form-control">
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
					      	<label for="costoDls">Costo Figuras [Dls]:</label>
					        <input type="number" v-model="registroTemporal.costoFigurasDls" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="costoDls">Fee [Dls]:</label>
					        <input type="number" v-model="registroTemporal.fee" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio EU [Dls]:</label>
					        <input type="text" v-model="registroTemporal.costoEnvioEU" class="form-control">
					    </div>
						<div class="form-group">
					      	<label for="costoDls">Cobro Banco [Mnx]:</label>
					        <input type="number" v-model="registroTemporal.cobroBanco" class="form-control">
					    </div>
					    <div class="form-group">
					      	<label for="">Costo Envio MX [Mnx]:</label>
					        <input type="text" v-model="registroTemporal.costoEnvioMX" class="form-control">
					    </div>
					    <ul class="list-group">
						    <li class="list-group-item" v-for="(pedidoPop, index) in registroTemporal.pedidosPop">
								<div class="figure-division">
									<div class="row">
										<div class="col-sm-4">
											<div class="form-group">
										      	<label for="nombrePop">Nombre pop:</label>
										        <input type="text" v-model="pedidoPop.nombrePop" class="form-control">
										    </div>
										</div>
										<div class="col-sm-4">
										    <div class="form-group">
										      	<label for="cantidad">Cantidad:</label>
										        <input type="number" v-model="pedidoPop.cantidad" class="form-control">
										    </div>
										</div>
										<div class="col-sm-4">
										    <div class="form-group">
										      	<label for="costoDls">Costo USD:</label>
										        <input type="number" v-model="pedidoPop.costoDls" class="form-control">
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
							cantidad: 1,
							costoDls: 6.35,
							nombrePop: "",
						}
					],
					costoEnvioEU: '',
					costoEnvioMX: '',
					nombreRegistro: ''
				}	
			],
			nombreRegistro: "",
			costoFigurasDls: 0,
			costoEnvioEU: 0,
			costoEnvioMX: 0,
			fee: 0,
			cobroBanco: 0,
			nuevoPedidoPop:[
				{
					cantidad: 1,
					costoDls: 6.35,
					nombrePop: "",
				}
			],
			registrosGuardados : [],
			idPedido : "",
			indice : 0,
			registroTemporal : [],
			totalRegistrosPedidosCompleto: 0
			
	    }
	},
	methods: {
		agregarPopPedido(){

			this.nuevoPedidoPop.push(
				{
					cantidad: 1,
					costoDls: 6.35,
					nombrePop: "",
				}		
			);

		},
		quitarPopPedido(){
			this.nuevoPedidoPop.pop();
		},
		agregarPopRegistroModificado(id,indice){
			this.registroTemporal.pedidosPop.push(
				{
					cantidad: 1,
					costoDls: 6.35,
					nombrePop: "",
				}		
			);
		},
		guardarRegistroModificado(id,indice){

			var nombreRegistro = this.registroTemporal.nombreRegistro;
			var costoFigurasDls = this.registroTemporal.costoFigurasDls;
			var fee = this.registroTemporal.fee;
			var costoEnvioEU = this.registroTemporal.costoEnvioEU;
			var cobroBanco = this.registroTemporal.cobroBanco;
			var costoEnvioMX = this.registroTemporal.costoEnvioMX;
			var pedidosPop = this.registroTemporal.pedidosPop;

			var id = id;

			this.axios.patch('https://funko-pop.firebaseio.com/registrosAAA/' + id + '.json', {
				nombreRegistro: nombreRegistro,
				costoFigurasDls: costoFigurasDls,
				fee: fee,
				costoEnvioEU: costoEnvioEU,
				cobroBanco: cobroBanco,
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
			var costoFigurasDls = parseFloat(this.costoFigurasDls);
			var fee = parseFloat(this.fee);
			var cobroBanco = parseFloat(this.cobroBanco);
			var pedidosPop = this.nuevoPedidoPop;

			this.axios.post('https://funko-pop.firebaseio.com/registrosAAA.json',{
			 	nombreRegistro: nombreRegistro,
			 	costoEnvioEU: costoEnvioEU,
			 	costoEnvioMX: costoEnvioMX,
			 	costoFigurasDls: costoFigurasDls,
			 	fee: fee,
			 	pedidosPop : pedidosPop,
			 	cobroBanco : cobroBanco
			 }).then(respuesta => {
			 	setTimeout(function(){
			 		$('#registroModal').modal('hide');
			 	},500);
			 	if(respuesta.status == 200){

			 		let pedido = {
						nombreRegistro: nombreRegistro,
			 			costoEnvioEU: costoEnvioEU,
					 	costoEnvioMX: costoEnvioMX,
					 	costoFigurasDls: costoFigurasDls,
					 	fee: fee,
					 	pedidosPop : pedidosPop,
					 	cobroBanco : cobroBanco
		            }

		            this.registrosGuardados.push(pedido);

					this.nombreRegistro = "";
					this.costoEnvioEU = 0;
					this.costoEnvioMX = 0;
					this.fee = 0;
					this.costoFigurasDls = 0;
					this.cobroBanco = 0,
					this.nuevoPedidoPop = [
						{
							cantidad: 6,
							costoDls: 6.6,
							nombrePop: "",
						}
					];
			 	}
			});

		},
		guardarTemporalPedido(id,indice){
			let totalRegistrosPedidosCompleto = (this.totalRegistrosPedidosCompleto - indice) - 1;
			this.registroTemporal = this.registrosGuardados[totalRegistrosPedidosCompleto];
			this.registroTemporal.indice = totalRegistrosPedidosCompleto;
		},
		getDataRegister(){

	    	this.axios.get('https://funko-pop.firebaseio.com/registrosAAA.json')
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
						fee: respuestaJson[id].fee,
						costoFigurasDls: respuestaJson[id].costoFigurasDls,
						cobroBanco: respuestaJson[id].cobroBanco,
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
		registrosPedidosCompleto: function(){
			var totalPedido = 0;
			var costoDolar = 0;
			var cantidadTotal = 0;
			var cuota = 0;
			var cuotaPesos = 0;
			var costoFigura = 0;
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

			var costoTotalFiguras = 0;
			var sumaCostoTotalFiguras = 0;

			var sumaCostoFigura = 0;
			var sumaCostoEnvioEU = 0;
			var sumaCostoImportacion = 0;

			for(let val in this.registrosGuardados){
				cantidadTotal = 0;
				for(let registro in this.registrosGuardados[val].pedidosPop){
					cantidadTotal += parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
					this.registrosGuardados[val].cantidadTotal = cantidadTotal;
				}
			}

			for(let val in this.registrosGuardados){
				sumaCostoFigura = 0;
				sumaCostoEnvioEU = 0;
				sumaCostoImportacion = 0;
				sumaCostoTotalFiguras = 0;
				totalPedido = parseFloat(this.registrosGuardados[val].costoFigurasDls) + parseFloat(this.registrosGuardados[val].costoEnvioEU);
				costoDolar = parseFloat(this.registrosGuardados[val].cobroBanco) / totalPedido;
				costoEnvioEU = parseFloat(this.registrosGuardados[val].costoEnvioEU);
				costoEnvioEUPesos = costoEnvioEU * costoDolar;
				cuotaPesos = costoDolar * this.registrosGuardados[val].fee;
				costoFigurasPesos = costoDolar * this.registrosGuardados[val].costoFigurasDls;
				costoTotalPesos = costoEnvioEUPesos + costoFigurasPesos
		    	for(let registro in this.registrosGuardados[val].pedidosPop){
		    		cuota = (costoDolar * this.registrosGuardados[val].fee) / parseInt(this.registrosGuardados[val].cantidadTotal);
		    		costoFigura = (parseFloat(this.registrosGuardados[val].pedidosPop[registro].costoDls) * costoDolar) + cuota;
		    		costoTotal = costoFigura *  parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
		    		costoImportacion = costoFigura * 0.15;
		    		costoEnvioMx = parseFloat(this.registrosGuardados[val].costoEnvioMX) / parseInt(this.registrosGuardados[val].cantidadTotal);
		    		costoEnvioXFiguraEU = costoEnvioEUPesos / parseInt(this.registrosGuardados[val].cantidadTotal);
		    		costoTotalEnvioXFiguraEU = costoEnvioXFiguraEU * parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
			    	costoTotalImportacion = parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad) * costoImportacion;
			    	costoTotalFigura = costoFigura + costoEnvioXFiguraEU + costoImportacion + costoEnvioMx;

			    	costoTotalFiguras = costoTotalFigura * parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
			    	sumaCostoTotalFiguras = sumaCostoTotalFiguras + costoTotalFiguras;

			    	sumaCostoFigura = sumaCostoFigura + costoTotal;
			    	sumaCostoEnvioEU = sumaCostoEnvioEU + costoTotalEnvioXFiguraEU;
			    	sumaCostoImportacion = sumaCostoImportacion + costoTotalImportacion;

			    	this.registrosGuardados[val].pedidosPop[registro].cuota = cuota;
			    	this.registrosGuardados[val].pedidosPop[registro].costoFigura = costoFigura;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotal = costoTotal;
			    	this.registrosGuardados[val].pedidosPop[registro].costoEnvioXFiguraEU = costoEnvioXFiguraEU;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalEnvioXFiguraEU = costoTotalEnvioXFiguraEU;
			    	this.registrosGuardados[val].pedidosPop[registro].costoImportacion = costoImportacion;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalImportacion = costoTotalImportacion;
			    	this.registrosGuardados[val].pedidosPop[registro].costoEnvioMx = costoEnvioMx;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalFigura = costoTotalFigura;

			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalFiguras = costoTotalFiguras;
		    	}
		    	this.registrosGuardados[val].sumaCostoImportacion = sumaCostoImportacion;
		    	this.registrosGuardados[val].sumaCostoEnvioEU = sumaCostoEnvioEU;
		    	this.registrosGuardados[val].sumaCostoFigura = sumaCostoFigura;
		    	this.registrosGuardados[val].costoTotalPesos = costoTotalPesos;
		    	this.registrosGuardados[val].costoFigurasPesos = costoFigurasPesos;
		    	this.registrosGuardados[val].cuotaPesos = cuotaPesos;
		    	this.registrosGuardados[val].totalPedido = totalPedido;
		    	this.registrosGuardados[val].costoDolar = costoDolar;
		    	this.registrosGuardados[val].costoEnvioEUPesos = costoEnvioEUPesos;

		    	this.registrosGuardados[val].sumaCostoTotalFiguras = sumaCostoTotalFiguras;
			}
			this.totalRegistrosPedidosCompleto = this.registrosGuardados.length;
			return this.registrosGuardados;
		}
	}
}

</script>

<style lang="scss">
	.internal-content{
		&.controlAAA{
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
		&.controlAAA{
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