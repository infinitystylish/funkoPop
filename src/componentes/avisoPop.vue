<template>
	<div class="internal-content">

		<div class="new-announcement">
			<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#avisoModal">Nuevo aviso</button>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado de avisos</h1>
			</div>
			<div class="panel-body">
				<table class="table table-hover table-bordered table-funkopop">
					<thead>
						<tr>
							<th>
								Nombre
							</th>
							<th>
								Nombre Funko Pop
							</th>
							<th>
								Tipo de aviso
							</th>
							<th>
								Anotaciones
							</th>
							<th>
								Hecho
							</th>
							<th>
								Modificar
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(aviso, indice) in filtroAvisos" v-bind:class="{ 'table-success' : aviso.avisoEstado}">
							<td>
								{{ aviso.nombre }}
							</td>
							<td>
								<span v-for="nombreIndividual in aviso.nombreFunkoPop">
									{{ nombreIndividual.nombre }}
								</span>
								
							</td>
							<td>
								{{ aviso.avisoTipo }}
							</td>
							<td>
								{{ aviso.anotaciones }}	
							</td>
							<td>
								<label class="aviso-checkbox" for="avisoEstado">
									<input type="checkbox" id="avisoEstado" v-model="aviso.avisoEstado" @click="changeStatus(indice,aviso.id, aviso.avisoEstado)">
								</label>
							</td>
							<td>
								<div class="button-container-table">
									<button class="btn btn-primary" data-toggle="modal" data-target="#modificarAvisoModal" @click="setAviso(indice,aviso.id, aviso.avisoTipo, aviso.anotaciones, aviso.adelanto, aviso.fechaEntrega)">Modificar aviso</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>


		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado de apartados</h1>
			</div>
			<div class="panel-body">
				<table class="table table-hover table-bordered table-funkopop">
					<thead>
						<tr>
							<th>
								Nombre
							</th>
							<th>
								Nombre Funko Pop
							</th>
							<th>
								Tipo de aviso
							</th>
							<th>
								Anotaciones
							</th>
							<th>
								Adelanto
							</th>
							<th>
								Fecha de entrega
							</th>
							<th>
								Hecho
							</th>
							<th>
								Modificar
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(aviso, indice) in filtroApartados" v-bind:class="{ 'table-success' : aviso.avisoEstado}">
							<td>
								{{ aviso.nombre }}
							</td>
							<td>
								<span v-for="nombreIndividual in aviso.nombreFunkoPop">
									{{ nombreIndividual.nombre }}
								</span>
								
							</td>
							<td>
								{{ aviso.avisoTipo }}
							</td>
							<td>
								{{ aviso.anotaciones }}	
							</td>
							<td>
								{{ aviso.adelanto }}
							</td>
							<td>
								{{ aviso.fechaEntrega }}
							</td>
							<td>
								<label class="aviso-checkbox" for="avisoEstado">
									<input type="checkbox" id="avisoEstado" v-model="aviso.avisoEstado" @click="changeStatus(indice,aviso.id, aviso.avisoEstado)">
								</label>
							</td>
							<td>
								<div class="button-container-table">
									<button class="btn btn-primary" data-toggle="modal" data-target="#modificarAvisoModal" @click="setAviso(indice,aviso.id, aviso.avisoTipo, aviso.anotaciones, aviso.adelanto, aviso.fechaEntrega)">Modificar aviso</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado a conseguir</h1>
			</div>
			<div class="panel-body">
				<table class="table table-hover table-bordered table-funkopop">
					<thead>
						<tr>
							<th>
								Nombre
							</th>
							<th>
								Nombre Funko Pop
							</th>
							<th>
								Tipo de aviso
							</th>
							<th>
								Anotaciones
							</th>
							<th>
								Adelanto
							</th>
							<th>
								Fecha de entrega
							</th>
							<th>
								Hecho
							</th>
							<th>
								Modificar
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(aviso, indice) in filtroConseguir" v-bind:class="{ 'table-success' : aviso.avisoEstado}">
							<td>
								{{ aviso.nombre }}
							</td>
							<td>
								<span v-for="nombreIndividual in aviso.nombreFunkoPop">
									{{ nombreIndividual.nombre }}
								</span>
								
							</td>
							<td>
								{{ aviso.avisoTipo }}
							</td>
							<td>
								{{ aviso.anotaciones }}	
							</td>
							<td>
								{{ aviso.adelanto }}
							</td>
							<td>
								{{ aviso.fechaEntrega }}
							</td>
							<td>
								<label class="aviso-checkbox" for="avisoEstado">
									<input type="checkbox" id="avisoEstado" v-model="aviso.avisoEstado" @click="changeStatus(indice,aviso.id, aviso.avisoEstado)">
								</label>
							</td>
							<td>
								<div class="button-container-table">
									<button class="btn btn-primary" data-toggle="modal" data-target="#modificarAvisoModal" @click="setAviso(indice,aviso.id, aviso.avisoTipo, aviso.anotaciones, aviso.adelanto, aviso.fechaEntrega)">Modificar aviso</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="modificarAvisoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  	<div class="modal-dialog" role="document">
			    <div class="modal-content">
			      	<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title" id="myModalLabel">AvisoFunko Pop</h4>
			      	</div>
			      	<div class="modal-body">
				      	<input type="hidden" v-model="avisoM.indice">
				      	<input type="hidden" v-model="avisoM.id">
					    <div class="form-group">
					    	<label for="aviso" class="radio-inline">
								<input type="radio" id="aviso" value="aviso" v-model="avisoM.avisoTipo"> Aviso
							</label>
							<label for="apartado" class="radio-inline">
								<input type="radio" id="apartado" value="apartado" v-model="avisoM.avisoTipo"> Apartado
							</label>
							<label for="conseguir" class="radio-inline">
								<input type="radio" id="conseguir" value="conseguir" v-model="avisoM.avisoTipo"> Conseguir
							</label>
							<label for="pendienteEntrega" class="radio-inline">
								<input type="radio" id="pendienteEntrega" value="pendienteEntrega" v-model="avisoM.avisoTipo"> Pendiente de entrega
							</label>
					    </div>
					    <div class="form-group">
							<label for="">Anotaciones:</label>
					        <input type="text" v-model="avisoM.anotaciones" class="form-control">
					    </div>
					    <div class="form-group" v-if="avisoM.avisoTipo == 'apartado'">
							<label for="">Adelanto:</label>
					        <input type="number" v-model="avisoM.adelanto" class="form-control">
					    </div>
					    <div class="form-group" v-if="avisoM.avisoTipo == 'pendienteEntrega'">
							<label for="">Fecha Entrega:</label>
					        <input type="text" v-model="avisoM.fechaEntrega" class="form-control">
					    </div>
				    </div>
			      	<div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="modificarAviso(avisoM.indice,avisoM.id, avisoM.avisoTipo, avisoM.anotaciones, avisoM.adelanto, avisoM.fechaEntrega)">Guardar</button>
				    </div>
			    </div>
		  	</div>
		</div>


		<!-- Modal -->
		<div class="modal fade" id="avisoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  	<div class="modal-dialog" role="document">
			    <div class="modal-content">
			    	<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title" id="myModalLabel">AvisoFunko Pop</h4>
				    </div>
			      	<div class="modal-body">
				      	<div class="form-group has-feedback">
					      	<label for="">Nombre:</label>
					        <input type="text" v-model="aviso.nombre" class="form-control">
					    </div>

					   	<div class="form-group" v-for="(nombreFunkoPop, index) in aviso.nombreFunkoPop">
							<label for="">Nombre Funko Pop:</label>
							<input type="text" v-model="nombreFunkoPop.nombre" class="form-control">
					   	</div>

					    <button class="btn btn-primary" @click="agregarNombreFunko">Agregar</button>
						
						<br />
						<br />

					    <div class="form-group">
					    	<label for="aviso" class="radio-inline">
								<input type="radio" id="aviso" value="aviso" v-model="aviso.avisoTipo"> Aviso
							</label>
							<label for="apartado" class="radio-inline">
								<input type="radio" id="apartado" value="apartado" v-model="aviso.avisoTipo"> Apartado
							</label>
							<label for="conseguir" class="radio-inline">
								<input type="radio" id="conseguir" value="conseguir" v-model="aviso.avisoTipo"> Conseguir
							</label>
							<label for="conseguir" class="radio-inline">
								<input type="radio" id="pendienteEntrega" value="pendienteEntrega" v-model="aviso.avisoTipo"> Pendiente de entrega
							</label>
					    </div>
					    <div class="form-group">
							<label for="">Anotaciones:</label>
					        <input type="text" v-model="aviso.anotaciones" class="form-control">
					    </div>
					    <div class="form-group" v-if="aviso.avisoTipo == 'apartado'">
							<label for="">Adelanto:</label>
					        <input type="number" v-model="aviso.adelanto" class="form-control">
					    </div>
					    <div class="form-group" v-if="aviso.avisoTipo == 'pendienteEntrega'">
							<label for="">Fecha Entrega:</label>
					        <input type="text" v-model="aviso.fechaEntrega" class="form-control">
					    </div>
				    </div>
			     	<div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				        <button type="button" class="btn btn-primary" v-on:click="agregarAviso()">Guardar</button>
			      	</div>
			    </div>
		  	</div>
		</div>
	</div>
</template>


<script>

export default {
	data() {
	    return {
	    	aviso: {
		        nombre: '',
		        nombreFunkoPop: [
			        {
			        	nombre: ''
			        }
		        ],
		        avisoEstado: false,
		       	avisoTipo: '',
		       	adelanto: '',
		       	fechaEntrega: '',
		       	anotaciones: ''
			},
			avisosPop : [],
			avisoM: {
				indice: 0,
				id: '',
				avisoEstado: false,
		       	avisoTipo: '',
		       	adelanto: '',
		       	fechaEntrega: '',
		       	anotaciones: ''
			}
	    }
	},
	methods: {
		agregarNombreFunko(){
			this.aviso.nombreFunkoPop.push(
				{
					nombre: ''
				}
			);
		},
		agregarAviso(){
			var nombre = this.aviso.nombre.trim();
			var nombreFunkoPop = this.aviso.nombreFunkoPop;
			var avisoTipo = this.aviso.avisoTipo;
			var avisoEstado = this.aviso.avisoEstado;
			var adelanto = parseFloat(this.aviso.adelanto);
			var fechaEntrega = this.aviso.fechaEntrega.trim();
			var anotaciones = this.aviso.anotaciones.trim();
			
			this.axios.post('https://funkopop-e84d7.firebaseio.com/avisos.json',{
				nombre: nombre,
				nombreFunkoPop: nombreFunkoPop,
				avisoTipo: avisoTipo,
				avisoEstado: avisoEstado,
				adelanto: adelanto,
				fechaEntrega: fechaEntrega,
				anotaciones: anotaciones
				
			}).then(respuesta => {
				setTimeout(function(){
					$('#avisoModal').modal('hide');
				},500);
				if(respuesta.status == 200){
					this.avisosPop = [];
					this.getAvisos();
				}
			});
		},
		getAvisos(){
	    	this.axios.get('https://funkopop-e84d7.firebaseio.com/avisos.json')
	        .then(respuesta => { 
	            return respuesta.data;
	        })
	        .then(respuestaJson => {
	          this.avisos = [];
	          for (let id in respuestaJson){
	            let aviso = {
					id: id,
					nombre: respuestaJson[id].nombre,
					nombreFunkoPop: respuestaJson[id].nombreFunkoPop,
					avisoTipo: respuestaJson[id].avisoTipo,
					adelanto: respuestaJson[id].adelanto,
					avisoEstado: respuestaJson[id].avisoEstado,
					fechaEntrega: respuestaJson[id].fechaEntrega,
					anotaciones: respuestaJson[id].anotaciones
	            }
	            this.avisosPop.push(aviso);
	          }
	        });
	    },
		changeStatus(indice,avisoId, avisoEstado){
			this.axios.patch('https://funkopop-e84d7.firebaseio.com/avisos/' + avisoId + '.json', {
					avisoEstado: avisoEstado
			}).then(respuesta => { 
				if(respuesta.status == 200){
					this.avisosPop[indice].avisoEstado = avisoEstado;
				}
			})

		},
		setAviso(indice,id, avisoTipo, anotaciones, adelanto, fechaEntrega){
			this.avisoM.indice = indice;
			this.avisoM.id = id;
			this.avisoM.avisoTipo = avisoTipo;
			this.avisoM.anotaciones = anotaciones || '';
			this.avisoM.adelanto = adelanto || '' ;
			this.avisoM.fechaEntrega = fechaEntrega;
		},
		modificarAviso(indice,avisoId, avisoTipo, anotaciones, adelanto, fechaEntrega){
			this.axios.patch('https://funkopop-e84d7.firebaseio.com/avisos/' + avisoId + '.json', {
				avisoTipo: avisoTipo,
				anotaciones: anotaciones,
				adelanto: adelanto,
				fechaEntrega: fechaEntrega,
			}).then(respuesta => { 
				setTimeout(function(){
					$('#modificarAvisoModal').modal('hide');
				},500);
				if(respuesta.status == 200){
					this.avisosPop[indice].avisoTipo = avisoTipo;
					this.avisosPop[indice].anotaciones = anotaciones;
					this.avisosPop[indice].adelanto = adelanto;
					this.avisosPop[indice].fechaEntrega = fechaEntrega;
				}
			})
		}

	},
	created(){
		this.getAvisos();
	},
	computed: {
		filtroAvisos: function () {
			var self = this;
			return self.avisosPop.filter(function (aviso) {
			  return aviso.avisoTipo == "aviso";
			})
		},
		filtroApartados: function () {
			var self = this;
			return self.avisosPop.filter(function (aviso) {
			  return aviso.avisoTipo == "apartado";
			})
		},
		filtroConseguir: function () {
			var self = this;
			return self.avisosPop.filter(function (aviso) {
			  return aviso.avisoTipo == "conseguir";
			})
		}
	}
}

</script>

<style lang="scss">
	.aviso-checkbox{
		text-align: center;
		display: block;
	}
	.new-announcement{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 30px;
	}

	.table-success{
		background-color: #d6e9c6;
	}

	.button-container-table{
		text-align: center;
	}
</style>