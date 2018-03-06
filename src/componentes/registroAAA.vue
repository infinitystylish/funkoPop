<template>
	<div class="internal-content">
		<div class="add-order-button-container">
			<button data-toggle="modal" data-target="#registroModal" class="btn btn-primary btn-lg btn-block" v-on:click="">Registrar Pedido</button>
		</div>
		

		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Registro de Pedidos de AAA</h1>
			</div>
			<div class="panel-body">
				<div class="table-responsive">
					<table class="table table-hover table-bordered table-funkopop">
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
									Costo Total Importacion
								</th>
								<th>
									Costo Envio MX
								</th>
								<th>
									Costo Total Figura
								</th>
							</tr>
						</thead>
						<tbody>
							<template v-for="(registro, indice) in registrosPedidosCompleto">
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
								</tr>
							</template>
							<tr >
								
								
							</tr>
						</tbody>
					</table>
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
					    <ul class="list-group">
						    <li class="list-group-item" v-for="(pedidoPop, index) in nuevoPedidoPop">
								<div class="figure-division">
									<div class="form-group">
								      	<label for="nombrePop">Nombre pop:</label>
								        <input type="text" v-model="pedidoPop.nombrePop" class="form-control">
								    </div>
								    <div class="form-group">
								      	<label for="cantidad">Cantidad:</label>
								        <input type="number" v-model="pedidoPop.cantidad" class="form-control">
								    </div>
								    <div class="form-group">
								      	<label for="costoDls">Costo USD:</label>
								        <input type="number" v-model="pedidoPop.costoDls" class="form-control">
								    </div>
								</div>
							</li>
						</ul>
						<button class="btn btn-primary" @click="agregarPopPedido">Agregar</button>
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
			     	</div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-default" v-on:click="" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarRegistroPedido">Guardar</button>
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
					cantidad: 6,
					costoDls: 6.6,
					nombrePop: "",
				}
			],
			registrosGuardados : [],
	    }
	},
	methods: {
		agregarPopPedido(){

			this.nuevoPedidoPop.push(
				{
					cantidad: 6,
					costoDls: 6.6,
					nombrePop: "",
				}		
			);

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
	    calcularTotalPedido(indice){
	    	var totalPedido = 0;
	    	totalPedido = parseFloat(this.registrosGuardados[indice].costoFigurasDls) + parseFloat(this.registrosGuardados[indice].costoEnvioEU);
	    	return totalPedido; 
	    },
	    calcularPrecioDolar(indice){
	    	var costoDolar = 0;
	    	costoDolar = parseFloat(this.registrosGuardados[indice].cobroBanco) / this.calcularTotalPedido(indice)
	    	return costoDolar;
	    },
	    calcularCuota(indice){
	    	var cantidadoPops = this.calcularTotal(indice);
	    	var precioDolar = this.calcularPrecioDolar(indice);
	    	var cuota = 0;

	    	//cuota = (precioDolar * this.registrosGuardados[indice].fee) / cantidadoPops;
	    	cuota = (precioDolar * this.registrosGuardados[indice].fee) / 30;
	    	return cuota;
	    },
	    calcularTotal(indice){
	    	//console.log(this.registrosGuardados[indice].pedidosPop);
	    	var cantidadTotal = 0;
	    	for(let registro in this.registrosGuardados[indice].pedidosPop){
	    		cantidadTotal += parseFloat(this.registrosGuardados[indice].pedidosPop[registro].cantidad);
	    	}
	    	return cantidadTotal;
	    },
	    calcularCostoFigura(indice,indiceP){
	    	var costoFigura = 0;
	    	var precioDolar = this.calcularPrecioDolar(indice);
	    	var cuota = this.calcularCuota(indice);
	    	var costoUsd = parseFloat(this.registrosGuardados[indice].pedidosPop[indiceP].costoDls);

	    	costoFigura = (costoUsd * precioDolar) + cuota;

	    	return costoFigura;
	    },
	    calcularCostoTotalFigura(indice,indiceP){
	    	var costoFigura = this.calcularCostoFigura(indice,indiceP);
	    	var costoTotalFigura = 0;
	    	costoTotalFigura = costoFigura *  parseFloat(this.registrosGuardados[indice].pedidosPop[indiceP].cantidad);
	    	return costoTotalFigura;
	    },
	    calcularCostoFiguraEnvioEU(indice,indiceP){
	    	var costoEnvioEU = parseFloat(this.registrosGuardados[indice].costoEnvioEU);
	    	var costoEnvioEUPesos = parseFloat(this.registrosGuardados[indice].costoEnvioEU) * this.calcularPrecioDolar(indice);
	    	var cantidadoPops = this.calcularTotal(indice);

	    	var costoEnvioXFigura = 0;
	    	//costoEnvioXFigura = costoEnvioEUPesos / cantidadoPops;
	    	costoEnvioXFigura = costoEnvioEUPesos / 30;
	    	return costoEnvioXFigura;
	    },
	    calcularCostoTotalFiguraEnvioEU(indice,indiceP){
	    	var costoEnvioXFigura  = this.calcularCostoFiguraEnvioEU(indice,indiceP);
	    	var cantidadoPops = this.registrosGuardados[indice].pedidosPop[indiceP].cantidad;
	    	var costoTotalEnvioXFigura = costoEnvioXFigura * cantidadoPops ;
	    	return costoTotalEnvioXFigura;
	    },
	    calcularCostoImportacion(indice,indiceP){
	    	var costoFigura = this.calcularCostoFigura(indice,indiceP);
	    	var costoImportacion = 0;
	    	costoImportacion = costoFigura * 0.15;
	    	return costoImportacion;
	    },
	    calcularCostoTotalImportacion(indice,indiceP){
	    	var costoImportacion = this.calcularCostoImportacion(indice,indiceP);
	    	var cantidadoPops = this.registrosGuardados[indice].pedidosPop[indiceP].cantidad;
	    	var calcularCostoTotalImportacion = cantidadoPops * costoImportacion;
	    	return calcularCostoTotalImportacion;
	    }

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
			var costoFigura = 0;
			var costoTotal = 0;
			var costoEnvioEU
			var costoEnvioEUPesos = 0;
			var costoEnvioXFiguraEU = 0;
			var costoTotalEnvioXFiguraEU = 0;
			var costoImportacion = 0;
			var costoTotalImportacion = 0;
			var costoEnvioMx = 0;
			var costoTotalFigura = 0;

			for(let val in this.registrosGuardados){
				for(let registro in this.registrosGuardados[val].pedidosPop){
					cantidadTotal += parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
				}
			}

			for(let val in this.registrosGuardados){
				totalPedido = parseFloat(this.registrosGuardados[val].costoFigurasDls) + parseFloat(this.registrosGuardados[val].costoEnvioEU);
				costoDolar = parseFloat(this.registrosGuardados[val].cobroBanco) / totalPedido;
				costoEnvioEU = parseFloat(this.registrosGuardados[val].costoEnvioEU);
				costoEnvioEUPesos = costoEnvioEU * costoDolar;
		    	for(let registro in this.registrosGuardados[val].pedidosPop){
		    		cuota = (costoDolar * this.registrosGuardados[val].fee) / cantidadTotal;
		    		costoFigura = (parseFloat(this.registrosGuardados[val].pedidosPop[registro].costoDls) * costoDolar) + cuota;
		    		costoTotal = costoFigura *  parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
		    		costoImportacion = costoFigura * 0.15;
		    		costoEnvioMx = parseFloat(this.registrosGuardados[val].costoEnvioMX) / cantidadTotal;
		    		costoEnvioXFiguraEU = costoEnvioEUPesos / cantidadTotal;
		    		costoTotalEnvioXFiguraEU = costoEnvioXFiguraEU * parseFloat(this.registrosGuardados[val].pedidosPop[registro].cantidad);
			    	costoTotalImportacion = cantidadTotal * costoImportacion
			    	costoTotalFigura = costoFigura + costoEnvioXFiguraEU + costoImportacion + costoEnvioMx;

			    	this.registrosGuardados[val].pedidosPop[registro].cuota = cuota;
			    	this.registrosGuardados[val].pedidosPop[registro].costoFigura = costoFigura;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotal = costoTotal;
			    	this.registrosGuardados[val].pedidosPop[registro].costoEnvioXFiguraEU = costoEnvioXFiguraEU;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalEnvioXFiguraEU = costoTotalEnvioXFiguraEU;
			    	this.registrosGuardados[val].pedidosPop[registro].costoImportacion = costoImportacion;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalImportacion = costoTotalImportacion;
			    	this.registrosGuardados[val].pedidosPop[registro].costoEnvioMx = costoEnvioMx;
			    	this.registrosGuardados[val].pedidosPop[registro].costoTotalFigura = costoTotalFigura;
		    	}
		    	this.registrosGuardados[val].totalPedido = totalPedido;
		    	this.registrosGuardados[val].costoDolar = costoDolar;
		    	this.registrosGuardados[val].costoEnvioEUPesos = costoEnvioEUPesos;
		    	this.registrosGuardados[val].cantidadTotal = cantidadTotal;
			}

			return this.registrosGuardados;
		}
	}
}

</script>

<style lang="scss">
	
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

</style>