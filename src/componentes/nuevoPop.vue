<template>
	<div class="internal-content">
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
						<div class="col-sm-6">
							<div class="form-group has-feedback" :class="{'input': true, 'has-error': errors.has('licencia') }">
								<label for="licencia">Licencia:</label>
								<!--<input type="text" class="form-control" id="licencia" name="licencia" v-validate="'required'"  v-model="pop.licencia">-->
								<autocomplete :suggestions="suggestions" v-model="pop.licencia"></autocomplete>

							</div>
							
							<div class="form-group has-feedback" :class="{'input': true, 'has-error': errors.has('numero-pop') }">
								<label for="nombre">Numero pop:</label>
								<input type="number" class="form-control" id="numero-pop" name="numero-pop" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('numero-pop') }" data-vv-as="numero pop"  v-model="pop.numeroPop">
								<span v-show="errors.has('numero-pop')" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
								<span v-show="errors.has('numero-pop')" class="help is-danger">{{ errors.first('numero-pop') }}</span>
							</div>
							
							<div class="form-group has-feedback" :class="{'input': true, 'has-error': errors.has('costo') }">
								<label for="licencia">Costo:</label>
								<div class="input-group">
									<span class="input-group-addon">$</span>
									<input type="number" class="form-control" id="costo" name="costo" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('costo') }" v-model="pop.costo">
									<span v-show="errors.has('costo')" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
								</div>
								<span v-show="errors.has('costo')" class="help is-danger">{{ errors.first('costo') }}</span>
							</div>

						</div>
						<div class="col-sm-6">
							<div class="form-group has-feedback" :class="{'input': true, 'has-error': errors.has('nombre') }">
								<label for="nombre">Nombre:</label>
								<input type="text" class="form-control" id="nombre" name="nombre" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('nombre') }" v-model="pop.nombre">
								<span v-show="errors.has('nombre')" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
								<span v-show="errors.has('nombre')" class="help is-danger">{{ errors.first('nombre') }}</span>
							</div>
							<div class="form-group has-feedback" :class="{'input': true, 'has-error': errors.has('cantidad-comprada') }">
								<label for="nombre">Cantidad comprada:</label>
								<input type="number" class="form-control" id="cantidad-comprada" name="cantidad-comprada" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('cantidad-comprada') }" data-vv-as="cantidad comprada" v-model="pop.cantidadComprada" min="0">
								<span v-show="errors.has('cantidad-comprada')" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
								<span v-show="errors.has('cantidad-comprada')" class="help is-danger">{{ errors.first('cantidad-comprada') }}</span>
							</div>
							<div class="form-group has-feedback" :class="{'input': true, 'has-error': errors.has('precio-publico') }">
								<label for="nombre">Precio a público:</label>
								<div class="input-group">
									<span class="input-group-addon">$</span>
									<input type="number" class="form-control" id="precio-publico" name="precio-publico" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('precio-publico') }" data-vv-as="precio público"  v-model="pop.precioPublico">
									<span v-show="errors.has('precio-publico')" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
								</div>
								<span v-show="errors.has('precio-publico')" class="help is-danger">{{ errors.first('precio-publico') }}</span>
							</div>
							
						</div>
					</div>
					<div class="button-list-container pull-right">
						<button type="button" v-on:click="agregarPop()" class="btn btn-primary btn-success">Guardar</button>
					</div>
				</form>
			</div>
		</div>
		<div class="button-list-container pull-right">
			<button class="btn btn-primary" @click="volver">Volver</button>
		</div>
	</div>
</template>


<script>

import Autocomplete from './autocomplete.vue'

export default {
	components: {
		Autocomplete
	},
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
		        precioPublico: 300,
		        cantidadComprada: '',
			},
			estado: "",
		    suggestions: [
		        { license: 'Gears Of War'},
		        { license: 'Rugrats'},
		        { license: 'Amy Winehouse'},
		        { license: 'Death Note'},
		        { license: 'Motorhead'},
		        { license: 'John Wick 2'},
		        { license: 'Justice League'},
		        { license: 'Suicide Squad'},
		        { license: 'Mad Max'},
		        { license: 'Crash Bandicoot'},
		        { license: 'Mortal Kombat'},
		        { license: 'Hey Arnold'},
		        { license: 'Guns And Roses'},
		        { license: 'South Park'},
		        { license: 'Batman:TheAnimatedSeries'},
		        { license: 'Cthulhu'},
		        { license: 'Star Wars'},
		        { license: 'The Walking Dead'},
		        { license: 'Deadpool'},
		        { license: 'The Lord of the Rings'},
		        { license: 'Guardians of the galaxy Vol.2'},
		        { license: 'One Punch Man'},
		        { license: 'Dragon Ball Super'},
		        { license: 'Dragon Ball'},
		        { license: 'Harry Potter'},
		        { license: 'AHHHH! Monsters'},
		        { license: 'Resident Evil'},
		        { license: 'Justin Bieber'},
		        { license: 'Naruto Shippuden'},
		        { license: 'Sailor Moon'},
		        { license: 'Pets'},
		        { license: 'Ricky y morty'},
		        { license: 'American Horror History'},
		        { license: 'Daredevil'},
		        { license: 'Marvel'},
		        { license: 'Alien Covenant'},
		        { license: 'The shining'},
		        { license: 'Metallica'},
		        { license: 'It'},
		        { license: 'Anabelle'},
		        { license: 'Bride of chuky'},
		        { license: 'Carrie'},
		        { license: 'Thor: Ragnarok'},
		        { license: 'CatDog'},
		        { license: 'Marvel Captain America: Civil War'},
		        { license: 'Disney'},
		        { license: 'The Silence of the Lambs'},
		        { license: 'Sherlock'},
		        { license: 'Sailor Moon'},
		        { license: 'Overwatch'},
		        { license: 'Justin Bieber'},
		        { license: 'Motorhead'},
		        { license: 'Adventure Time'},
		        { license: 'Batman TV 1966'},
		        { license: 'Pirates of the Caribbean: Dead Men Tell No Tales'},
		    ]
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
					var numeroPop = parseInt(this.pop.numeroPop);
					var precioPublico = parseFloat(this.pop.precioPublico);
					var costo = parseFloat(this.pop.costo);
					var cantidadComprada = parseInt(this.pop.cantidadComprada);

					var cantidadDisponible = cantidadComprada;
					var vendidos = 0;
					var descuentos = 0;
					var apartados = "";
					var gananciaEmbalaje = 0;
					
					this.axios.post('https://funko-pop.firebaseio.com/pops.json',{
						licencia: licencia,
						nombre: nombre,
						numeroPop: numeroPop,
						precioPublico: precioPublico,
						costo: costo,
	
						cantidadComprada: cantidadComprada,
						cantidadDisponible: cantidadDisponible,
						vendidos: vendidos,
						descuentos: descuentos,
						apartados: apartados,

						gananciaEmbalaje: gananciaEmbalaje
						
					}).then(respuesta => {
						console.log(respuesta);
						if(respuesta.status == 200){
							this.estado = true;
							this.pop.licencia = '';
							this.pop.nombre = '';
							this.pop.numeroPop = 0;
							this.pop.precioPublico = 0;
							this.pop.costo = 0;
							this.pop.cantidadComprada = 0;
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
    	color: #a94442;
    }
}

</style>