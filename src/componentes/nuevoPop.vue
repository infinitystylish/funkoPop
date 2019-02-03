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
		        precioPublico: 280,
		        cantidadComprada: '',
			},
			estado: "",
		    suggestions: [
		    	{ license: 'AHHHH! Monsters'},
		    	{ license: 'Amy Winehouse'},
		    	{ license: 'Anabelle'},
		    	{ license: 'American Horror History'},
		    	{ license: 'Alien Covenant'},
		    	{ license: 'Adventure Time'},
		    	{ license: 'Avengers: Infinity War'},

		    	{ license: 'Back To The Future'},
		    	{ license: 'Batman:TheAnimatedSeries'},
		    	{ license: 'Batman TV 1966'},
		    	{ license: 'Bride of chuky'},
		    	{ license: 'Batman: The Dark Knight'},

		    	{ license: 'Crash Bandicoot'},
		    	{ license: 'Cthulhu'},
		    	{ license: 'Cuphead'},
		    	{ license: 'CatDog'},
		    	{ license: 'Carrie'},

		    	{ license: 'Deadpool'},
		    	{ license: 'Dragon Ball Super'},
		        { license: 'Dragon Ball'},
		        { license: 'Dragon Ball Z'},
		        { license: 'Disney'},
		        { license: 'Death Note'},
		        { license: 'Daredevil'},

		        { license: 'Gears Of War'},
		        { license: 'Guns And Roses'},
		        { license: 'Guardians of the galaxy Vol.2'},
		        { license: 'Game Of Thrones'},

		        { license: 'Hercules'},
		        { license: 'Hey Arnold'},
		        { license: 'Harry Potter'},
		        { license: 'Halo'},

		        { license: 'It'},

		        { license: 'John Wick 2'},
		        { license: 'Justice League'},
		        { license: 'Justin Bieber'},
		        { license: 'Jurassic Park'},

		        { license: 'Kurt Cobain'},

		        { license: 'Motorhead'},
		        { license: 'Mortal Kombat'},
		        { license: 'Mad Max'},
		        { license: 'Marvel Captain America: Civil War'},
		        { license: 'Marvel'},
		        { license: 'Metallica'},
		        { license: 'Marvel Contest Of Champions'},
		        { license: 'Max Max (Fury Road)'},

		        { license: 'Naruto Shippuden'},

		        { license: 'Looney Tunes'},

		        { license: 'One Punch Man'},
		        { license: 'Overwatch'},

		        { license: 'Pets'},
		        { license: 'Pirates of the Caribbean: Dead Men Tell No Tales'},

		        { license: 'Rugrats'},
		        { license: 'Resident Evil'},
		        { license: 'Rick y morty'},
		        { license: 'Ready Player One'},
		        
		        { license: 'Suicide Squad'},
		        { license: 'South Park'},
		        { license: 'Star Wars'},
		        { license: 'Sailor Moon'},
		        { license: 'Sherlock'},
		        { license: 'Stranger Things'},
		        { license: 'Sailor Moon'},
		        { license: 'Spiderman: Homecoming'},
		        { license: 'Sonic the Hedgehog'},
		        
		        { license: 'The Walking Dead'},
		        { license: 'The Lord of the Rings'},
		        { license: 'The shining'},
		        { license: 'The Silence of the Lambs'},
		        { license: 'Thor: Ragnarok'},
		        
		          
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
					}).catch(function (error) {
					    // handle error
					    console.log(error);
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

.dropdown-menu>.active>span, .dropdown-menu>.active>span:focus, .dropdown-menu>.active>span:hover{
	color: #fff;
    text-decoration: none;
    background-color: #337ab7;
    outline: 0;
}

.dropdown-menu{
	li{
		span{
			 display: block;
		    padding: 3px 10px;
		    clear: both;
		    font-weight: 400;
		    line-height: 1.42857143;
		    color: #333;
		    white-space: nowrap;
		}
	}
}

</style>