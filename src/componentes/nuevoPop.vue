<template>
	<div>
		<div v-if="estado === true">
			<div class="alert alert-success" role="alert">
				<strong>¡Hecho!</strong> 
				Se ha guardado correctamente 
			</div>
		</div>
		<div v-else-if="estado === false">
			<div class="alert alert-danger" role="alert">
				<strong>¡Error!</strong> 
				No se ha podido guardar
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Nuevo Funko Pop</h1>
			</div>
			<div class="panel-body">
				<form v-on:submit.prevent="agregarPop">
					<div class="row">
						<div class="col-xs-6">
							<div class="form-group">
								<label for="licencia">Licencia:</label>
								<p :class="{ 'control': true }">
									<input type="text" class="form-control" id="licencia" name="licencia" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('licencia') }" v-model="pop.licencia">
									<span v-show="errors.has('licencia')" class="help is-danger">{{ errors.first('licencia') }}</span>
								</p>
							</div>
							
							<div class="form-group">
								<label for="nombre">Numero pop:</label>
								<input type="number" class="form-control" id="numero-pop" name="numero-pop" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('numero-pop') }" v-model="pop.numeroPop">
								<span v-show="errors.has('numero-pop')" class="help is-danger">{{ errors.first('numero-pop') }}</span>
							</div>

							<div class="form-group">
								<label for="nombre">Precio a público:</label>
								<input type="number" class="form-control" id="precio-publico" name="precio-publico" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('precio-publico') }" v-model="pop.precioPublico">
								<span v-show="errors.has('precio-publico')" class="help is-danger">{{ errors.first('precio-publico') }}</span>
							</div>
						</div>
						<div class="col-xs-6">
							<div class="form-group">
								<label for="nombre">Nombre:</label>
								<input type="text" class="form-control" id="nombre" name="nombre" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('nombre') }" v-model="pop.nombre">
								<span v-show="errors.has('nombre')" class="help is-danger">{{ errors.first('nombre') }}</span>
							</div>
							<div class="form-group">
								<label for="licencia">Costo:</label>
								<div class="input-group">
									<span class="input-group-addon">$</span>
									<input type="number" class="form-control" id="costo" name="costo" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('costo') }" v-model="pop.costo">
									<span class="input-group-addon">.00</span>
								</div>
								<span v-show="errors.has('costo')" class="help is-danger">{{ errors.first('costo') }}</span>
							</div>
							<div class="form-group">
								<label for="nombre">Cantidad comprada:</label>
								<input type="number" class="form-control" id="cantidad-comprada" name="cantidad-comprada" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('cantidad-comprada') }" data-vv-as="cantidad comprada" v-model="pop.cantidadComprada" min="0">
								<span v-show="errors.has('cantidad-comprada')" class="help is-danger">{{ errors.first('cantidad-comprada') }}</span>
							</div>
						</div>
					</div>
					<button type="button" v-on:click="agregarPop()" class="btn btn-default">Submit</button>
				</form>
			</div>
		</div>
		<button class="btn btn-primary" @click="volver">Volver</button>
	</div>
</template>


<script>

export default {
	data (){
		return{
			pop: {
		        // licencia: 'Gears of War',
		        // nombre: 'Damon Baird',
		        // numeroPop: '197',
		        // costo: '216.88',
		        // precioPublico: '299',
		        // cantidadComprada: '1',
		        licencia: '',
		        nombre: '',
		        numeroPop: '',
		        costo: '',
		        precioPublico: '',
		        cantidadComprada: '',
			},
			estado: ""
		}
	},
  	methods:{
		volver(){
			this.$router.push({ name: 'homePops' });
		},
		agregarPop(){
			this.$validator.validateAll().then((result) => {
				
				if(result){
					var licencia = this.pop.licencia.trim();
					var nombre = this.pop.nombre.trim();
					var numeroPop = this.pop.numeroPop.trim();
					var precioPublico = this.pop.precioPublico.trim();
					var costo = this.pop.costo.trim();
					var cantidadComprada = this.pop.cantidadComprada.trim();

					var cantidadDisponible = cantidadComprada;
					var vendidos= 0;
					var margenGanancia= precioPublico - costo;
					var descuentos= 0;
					var ganancia= (vendidos * margenGanancia) - descuentos;
					var recuperacionDinero= costo * vendidos;

					this.$http.post('https://funkopop-e84d7.firebaseio.com/pops.json',{
						licencia: licencia,
						nombre: nombre,
						numeroPop: numeroPop,
						precioPublico: precioPublico,
						costo: costo,
						cantidadComprada: cantidadComprada,
						cantidadDisponible: cantidadDisponible,
						vendidos: vendidos,
						margenGanancia: margenGanancia,
						descuentos: descuentos,
						ganancia: ganancia,
						recuperacionDinero: recuperacionDinero
					}).then(respuesta => {
						if(respuesta.status == 200){
							this.estado = true;
							this.pop.licencia = '';
							this.pop.nombre = '';
							this.pop.numeroPop = '';
							this.pop.precioPublico = '';
							this.pop.costo = '';
							this.pop.cantidadComprada = '';
						}
					});
				}
				else{
					this.estado = false;
				}
			}).catch(() => {
				this.estado = false;
			});
		},
	}
}
</script>

<style lang="scss">

.help {
    display: block;
    font-size: 11px;
    margin-top: 5px;
    &.is-danger {
    	color: #ff3860;
    }
}

</style>