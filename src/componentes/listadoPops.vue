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
				<!-- 
				<div class="abbreviations">
					<div>Identificador: ID</div>
					<div>Licencia: L</div>
					<div>#Pop: Número de pop</div>
					<div>CC: Cantidad comprada</div>
					<div>V: Vendidos</div>
					<div>A: Apartados</div>
					<div>CD: Cantidad Disponible</div>
					<div>C: Costo</div>
					<div>CT: Costo Total</div>
					<div>PP: Precio Público</div>
					<div>GE: Ganancia Embalaje</div>
					<div>MG: Margen Ganancia</div>
					<div>D: Descuentos</div>
					<div>G: Ganancia</div>
					<div>Recuperación dinero: R$</div>
				</div> 
				-->
				<div class="table-responsive">
					<table class="table table-hover table-bordered table-funkopop">
						<thead>
							<tr>
								<th data-toggle="tooltip" title="Identificador">
									ID
								</th>
								<th>
									Licencia
								</th>
								<th>
									Nombre
								</th>
								<th data-toggle="tooltip" title="Número pop">
									#Pop
								</th>
								<th data-toggle="tooltip" title="Cantidad comprada">
									CC
								</th>
								<th data-toggle="tooltip" title="Vendidos">
									V
								</th>
								<th data-toggle="tooltip" title="Apartados">
									A
								</th>
								<th data-toggle="tooltip" title="cantidad Disponible">
									CD
								</th>
								<th data-toggle="tooltip" title="Costo">
									C
								</th>
								<th data-toggle="tooltip" title="Costo Total">
									CT
								</th>
								<th data-toggle="tooltip" title="Precio Público">
									PP
								</th>
								<th data-toggle="tooltip" title="ganancia Embalaje">
									GE
								</th>
								<th data-toggle="tooltip" title="Margen Ganancia">
									MG
								</th>
								<th data-toggle="tooltip" title="Descuentos">
									D
								</th>
								<th data-toggle="tooltip" title="Ganancias">
									G
								</th>
								<th data-toggle="tooltip" title="recuperacion Dinero">
									R$
								</th>
								<th data-toggle="tooltip" title="Apartados/Ventas">
									A/V	
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-show="buscar" v-for="(pop, indice) in buscarPop" class="table-info">
								<td v-if="calcularCantidadDisponible(pop) == 0">
									 No hay disponibles  
								</td>
								<td v-else>
									Hay {{calcularCantidadDisponible(pop)}} 
									<span v-if="calcularCantidadDisponible(pop) > 1"> disponibles</span>
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
									{{ pop.vendidos }}
								</td>
								<td>
									{{ calcularApartados(pop) }}
								</td>
								<td>
									{{ calcularCantidadDisponible(pop) }}
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
									{{ pop.gananciaEmbalaje }}
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
									<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-success" v-on:click="popVenta(pop.originalIndex,pop.id,pop.nombre,pop.licencia,pop.vendidos,pop.cantidadComprada,pop.precioPublico,pop.apartados,pop.descuentos)">
										<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
									</button>
									<button type="button" data-toggle="modal" data-target="#apartadoModal" class="btn btn-warning btn-apartado" v-on:click="popApartado(pop.originalIndex,pop.id,pop.cantidadDisponible,pop.apartados)">
										<span class="glyphicon glyphicon-hand-up" aria-hidden="true"></span>
									</button>
								</td>
							</tr>

							<tr v-for="(pop, indice) of ordenarPops" v-bind:class="{'table-warning': disponibilidadApartadoFunko(pop), 'table-danger' : disponibilidadFunko(pop)}">	
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
									{{ pop.vendidos }}
								</td>
								<td>
									{{ calcularApartados(pop) }}
								</td>
								<td>
									{{ calcularCantidadDisponible(pop) }}
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
									{{ pop.gananciaEmbalaje }}
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
									<button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-success" v-on:click="popVenta(pop.originalIndex,pop.id,pop.nombre,pop.licencia,pop.vendidos,pop.cantidadComprada,pop.precioPublico,pop.apartados,pop.descuentos)">
										<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
									</button>
									<button type="button" data-toggle="modal" data-target="#apartadoModal" class="btn btn-warning btn-apartado" v-on:click="popApartado(pop.originalIndex,pop.id,pop.cantidadDisponible,pop.apartados)">
										<span class="glyphicon glyphicon-hand-up" aria-hidden="true"></span>
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
						<h4 class="modal-title" id="myModalLabel">Modificar Funko Pop</h4>
					</div>
			      	<div class="modal-body">
			      		<div class="form-group">
					      	<label for="">Licencia:</label>
					        <input type="text" v-model="licencia" class="form-control">
					    </div>

					    <div class="form-group">
					      	<label for="">Nombre:</label>
					        <input type="text" v-model="nombrePop" class="form-control">
					    </div>

				      	<div class="form-group">
					      	<label for="">Cantidad vendida:</label>
					        <input type="text" v-model="nuevaVenta" class="form-control">
					    </div>
						<div class="form-group">
							<label for="">Precio público:</label>
					        <input type="text" v-model="precioPublico" class="form-control">
					    </div>
					    <div class="form-group">
							<label for="">Descuentos:</label>
					        <input type="text" v-model="descuentos" class="form-control">
					    </div>
					     <div class="form-group">
							<label for="">Ganancia Embalaje:</label>
					        <input type="text" v-model="gananciaEmbalaje" class="form-control">
					    </div>
						<div class="label">Apartados</div>
					    <div v-for="(apartado, index) in apartados"> 
					    	<div class="row">
					    		<div class="col-sm-4">
					    			<div class="form-group">
								    	<label>Nombre Cliente</label>
								    	<input type="text" v-model="apartado.nombreCliente" class="form-control" disabled>
								    </div>
							    </div>
							    <div class="col-sm-4">
							    	<div class="form-group">
								    	<label>Cantidad Apartada</label>
								    	<input type="number" v-model="apartado.cantidadApartada" class="form-control" disabled>
								    </div>   
							    </div>
								<div class="col-sm-4">
									<div class="register-buttons">
										<button type="button" class="btn btn-success" v-on:click="registrarVentaApartado(idPop,id,index)">
									    	<span class="glyphicon glyphicon-ok" aria-hidden="true">Vendido</span>
									    </button>
								     	<button type="button" class="btn btn-danger" v-on:click="removeElement(index)">
									    	<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
									    </button>
									</div>
								</div>
						    </div>
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
						 <input type="hidden" v-model="id">
						<input type="hidden" v-model="vendidos">
						
						<div class="alert alert-danger my-alert" v-if="validacionApartados" role="alert">
						  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
						  <span class="sr-only">Error:</span>
						  {{mensajeError}}
						</div>

						<button class="btn btn-primary" @click="agregarApartado">Agregar</button>
					</div>
				    <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-bind:class="{ hidden: validacionApartados }" v-on:click="agregarApartados(idPop,id)">Guardar</button>
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
		    	nombrePop: '',
		    	licencia: '',
		    	nuevaVenta: 0,
		    	comprado: 0,
		    	vendidos: 0,
		    	cantidadDisponible: 0,
		    	precioPublico: 0,
		    	descuentos: 0,
		    	validacionCantidad: false,
		    	gananciaEmbalaje: 0,
		    	mensajeError: '',
				apartados:[
					{
						nombreCliente: "",
						cantidadApartada: 0,
					}	
				],
				apartar : {},
				validacionApartados: false
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
			disponibilidadApartadoFunko(pop){
				let totalApartados = 0;
				let cantidadApartada = 0;
				let cantidadTotal = 0;
				for (let apartado in pop.apartados) {
					cantidadApartada = parseInt(pop.apartados[apartado].cantidadApartada)
					totalApartados += cantidadApartada;
				}

				if(totalApartados > 0){
					return true;
				}
				else{
					return false;
				}
			},
			costoTotal(pop){
				return Math.round((pop.costo * pop.cantidadComprada)* 100) / 100;
			},
			calcularApartados(pop){
				let totalApartados = 0;
				let cantidadApartada = 0;
				let cantidadTotal = 0;
				for (let apartado in pop.apartados) {
					cantidadApartada = parseInt(pop.apartados[apartado].cantidadApartada)
					totalApartados += cantidadApartada;
				}
				return totalApartados;
			},
			calcularCantidadDisponible(pop){
				let totalApartados = 0;
				let cantidadApartada = 0;
				let cantidadTotal = 0;
				let vendidos = pop.vendidos;
				for (let apartado in pop.apartados) {
					cantidadApartada = parseInt(pop.apartados[apartado].cantidadApartada)
					totalApartados += cantidadApartada;
				}
				cantidadTotal = pop.cantidadDisponible - totalApartados;
				return cantidadTotal;
			},
			margenGanancia(pop){
				return Math.round((pop.precioPublico - pop.costo)* 100) / 100;
			},
			ganancia(pop){
				return Math.round(( (pop.vendidos *  Math.round((pop.precioPublico - pop.costo)* 100) / 100) - parseInt(pop.descuentos) ) * 100) / 100;
			},
			recuperacionDinero(pop){
				return Math.round((pop.vendidos * pop.costo)* 100) / 100;
			},
			popVenta(id,indice,nombre,licencia,vendidos,cantidadComprada, precioPublico, apartados, descuentos){
				this.idPop = id;
				this.id = indice;
				this.nombrePop = nombre;
				this.licencia = licencia;
				this.comprado = cantidadComprada;
				this.precioPublico = precioPublico;
				this.vendidos = parseInt(vendidos);
				this.nuevaVenta = 0;
				this.apartados = apartados;
				this.descuentos =  parseInt(descuentos);
			},
			registrarVenta(indiceOriginal,id){
				let licencia = this.licencia;
				let nombre = this.nombre;
				let vendidos = parseInt(this.pops[indiceOriginal].vendidos) + parseInt(this.nuevaVenta);
				let comprados = this.pops[indiceOriginal].cantidadDisponible = this.comprado -  vendidos;
				let precioPublico = this.pops[indiceOriginal].precioPublico = this.precioPublico;
				let apartados = this.pops[indiceOriginal].apartados = this.apartados;
				let descuentos = this.pops[indiceOriginal].descuentos = this.descuentos;
				let gananciaEmbalaje = this.pops[indiceOriginal].gananciaEmbalaje = this.gananciaEmbalaje;
				this.axios.patch('https://funko-pop.firebaseio.com/pops/' + id + '.json', {
					nombre: nombre,
					licencia: licencia,
					vendidos: vendidos,
					cantidadDisponible: comprados,
					apartados: apartados,
					descuentos: descuentos,
					gananciaEmbalaje: gananciaEmbalaje
				}).then(respuesta => { 
					setTimeout(function(){
						$('#myModal').modal('hide');
					},500);
					if(respuesta.status == 200){
						this.pops[indiceOriginal].vendidos = vendidos;
						this.pops[indiceOriginal].cantidadDisponible = comprados;
						this.pops[indiceOriginal].apartados = apartados;
						this.gananciaEmbalaje = 0;
					}
				})
			},
			registrarVentaApartado(indiceOriginal,id,indexApartado){
				let vendidos = parseInt(this.pops[indiceOriginal].vendidos) + parseInt(this.pops[indiceOriginal].apartados[indexApartado].cantidadApartada);
				this.pops[indiceOriginal].apartados.splice(indexApartado, 1); 
				let comprados = this.pops[indiceOriginal].cantidadDisponible = this.comprado -  vendidos;
				this.pops[indiceOriginal].vendidos = vendidos;
				this.pops[indiceOriginal].cantidadDisponible = comprados;
			},
			popApartado(id,indice,cantidadDisponible,apartados){
			
				if(apartados === undefined || apartados === ""){
					
					this.apartados = [
						{
							nombreCliente: "",
							cantidadApartada: 1,
						}	
					];
					
				}
				else{
					this.apartados = apartados;
				}
				
				this.idPop = id;
				this.id = indice;
				this.cantidadDisponible = parseInt(cantidadDisponible);
				

			},
			agregarApartado(){
				this.apartados.push(
					{
						nombreCliente: '',
						cantidadApartada: 0,
					}
				);
			},
			agregarApartados(indiceOriginal,id){

				var noCero = false;

				for (let apartado in this.apartados) {
					this.apartados[apartado].nombreCliente = this.apartados[apartado].nombreCliente.trim();
					if(this.apartados[apartado].cantidadApartada == 0){
						noCero = true;
						break;
					}
				}

				if(noCero === true){
					this.validacionApartados = true;
					this.mensajeError = "No hay nada que apartar";
					return;
				}

				let apartados = this.pops[indiceOriginal].apartados = this.apartados;
				let vendidos = parseInt(this.pops[indiceOriginal].vendidos) + parseInt(this.nuevaVenta);

				let cantidadApartada = 0;
				for(let val in this.apartados){
					cantidadApartada += parseInt(this.apartados[val].cantidadApartada);
				}

				let cantidadDisponible = this.pops[indiceOriginal].cantidadDisponible - vendidos - cantidadApartada;

				this.axios.patch('https://funko-pop.firebaseio.com/pops/' + id + '.json',{
					apartados
				}).then(respuesta => {
					setTimeout(function(){
						$('#apartadoModal').modal('hide');
					},500);
					if(respuesta.status == 200){
						this.apartados = "";
						//this.pops[indiceOriginal].vendidos = vendidos;
						//this.pops[indiceOriginal].cantidadDisponible = cantidadDisponible ;
						//this.pops[indiceOriginal].apartados = cantidadApartada;
					}
				});

			},
			removeElement: function (index) {
				this.apartados.splice(index, 1);
			}
		},
		computed:{
			buscarPop(){
				return this.pops.filter((pop) => pop.nombre.toLowerCase().includes(this.buscar));
			},
			ordenarPops: function () {
				var originalIndex = 0;
				for(let val in this.pops){
					this.pops[val].originalIndex = originalIndex;
					originalIndex++;
				}
				return _.orderBy(this.pops, 'cantidadDisponible','desc');
				//return _.orderBy(this.pops, 'nombre');
			},
		},
		watch: {
			'nuevaVenta': function(val, oldVal){
				let totalVenta = parseInt(this.vendidos) + parseInt(val);
				var cantidadApartada = 0;
				for(let val in this.apartados){
					cantidadApartada += parseInt(this.apartados[val].cantidadApartada);
				}
				//console.log(this.apartados);
				if( (cantidadApartada + totalVenta) > this.comprado){
					this.validacionCantidad = true;
					this.mensajeError = "No puedes vender mas de lo que tienes";
				}else if(totalVenta <= this.comprado){
					this.validacionCantidad = false;
					this.mensajeError = "";
				}
			},
			apartados: {
				handler: function(val, oldVal){
					let totalApartados = 0;
					var noCero = false;
					for (let apartado in val){
						totalApartados += parseInt(val[apartado].cantidadApartada);
					}
					if(totalApartados > parseInt(this.cantidadDisponible)){
						this.validacionApartados = true;
						this.mensajeError = "No puedes apartar mas de lo que tienes";
						return;
					}
					else if(totalApartados <= parseInt(this.cantidadDisponible)){
						this.validacionApartados = false;
						this.mensajeError = "";
					}
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss">
	.table-funkopop{
		thead{
			th{
				font-size: 12px;
				white-space: nowrap;
			}
		}
		tbody{
			tr{
				td{
					font-size: 12px;
					//min-width: 100px;
				}
				
			}
		}
	}	
	.table-warning{
		background-color: #fcf8e3;
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
	.register-buttons{
		height: 60px;
		display: flex;
		align-items: flex-end;
		button{
			&:nth-child(2){
				margin-left: 10px;
			}
		}
	}

</style>