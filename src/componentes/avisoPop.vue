<template>
	<div class="internal-content">
		<button class="btn btn-primary" data-toggle="modal" data-target="#avisoModal">Nuevo aviso</button>

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
				
				<!-- <div class="form-group">
					<label for="">Nombre Funko Pop:</label>
			        <input type="text" v-model="aviso.nombreFunkoPop" class="form-control">
			    </div> -->

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
			    </div>
			    <div class="form-group" v-if="aviso.avisoTipo == 'apartado'">
					<label for="">Adelanto:</label>
			        <input type="number" v-model="aviso.adelanto" class="form-control">
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
		        avisoPop: '',
		       	avisoTipo: '',
		       	adelanto: ''
			},
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
			console.log(this.aviso);
		}
	}
}

</script>

<style lang="scss">

</style>