<template>

	<div>
	    <div v-if="!isAuthenticated" id="loginContainer">
			<nav class="navbar navbar-inverse navbar-fixed-top">
				<div class="container-fluid">
					<div class="navbar-header">
						<a class="navbar-brand" href="#">
							<img alt="Brand" class="img-responsive" src="./assets/funko-morelia-logo.jpg">
						</a>
					</div>
				</div>
			</nav>

	      	<div class="container">
		        <div class="row">
					<div class="col-md-12">
						<h3 style="text-align: center;">Login Funko Pop</h3>

						<form>
							<div class="form-group">
								<label for="exampleInputEmail1">Correo Electrónico</label>
								<input v-model:email="auth.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
							</div>
							<div class="form-group">
								<label for="exampleInputPassword1">Contraseña</label>
								<input v-model:password="auth.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
							</div>

							<div v-if="auth.message !== ''" class="alert" role="alert"
							:class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
								<button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
								<p><strong>{{auth.message}}</strong></p>
							</div>

							<button type="button" @click="login" class="btn btn-primary">Iniciar sesión</button>
						</form>
					</div>
		        </div>
	      	</div>
	    </div>
	    <div v-else>
			<nav class="navbar navbar-inverse navbar-fixed-top">
				<div class="container-fluid">
					<div class="navbar-header">
						<a class="navbar-brand" href="#">
							<img alt="Brand" class="img-responsive" src="https://raw.githubusercontent.com/infinitystylish/FunkoPop/master/docs/funko-morelia-logo.jpg">
						</a>
				    </div>
				  	<div class="navbar-collapse" id="bs-example-navbar-collapse-9"> 
				        <ul class="nav navbar-nav"> 
							<li class="active">
								<a href="#" @click.prevent="volver">Home</a>
							</li> 
							<li>
								<router-link tag="a" to="/FunkoPop/listadoPops">Lista de FunkoPop</router-link>
							</li> 
							<li>
								<router-link tag="a" to="/FunkoPop/nuevoPop">Nuevo FunkoPop</router-link>
							</li>
							<li>
								<router-link tag="a" to="/FunkoPop/avisoPop">Listado de Avisos</router-link>
							</li>
							<li>
								<router-link tag="a" to="/FunkoPop/pedidosPop">Pedidos FunkoPop</router-link>
							</li>  
				        </ul> 
				    	<div class="cerrar-sesion">
				    		<button @click="signOut" class="btn btn-danger" type="button">Cerrar sesión</button>
				    	</div>
				  	</div> 
				</div>
			</nav>
	      	<div class="container-fluid">
	        	<router-view :pops="pops"></router-view>
	      	</div>
	    </div>
	</div>
</template>

<script>

export default {
	data(){
		return{
			pops: [],
			auth : {
		        user: null,
		        email: '',
		        password: '',
		        message: '',
		        userName: '',
		        hasErrors: false
		    }
		}
	},
  	methods: {
	    volver(){
	    	this.$router.push({ name: 'homePops' });
	    },
	    compare(a,b){
	    	const nameA = a.licencia.toUpperCase();
	    	const nameB = b.licencia.toUpperCase();

			let comparison = 0;
			if(nameA > nameB ){
			comparison = 1;
			}else if( nameA < nameB ){
			comparison = 0;
			}
			return comparison;
	    },
	    getData(){
	    	this.axios.get('https://funkopop-e84d7.firebaseio.com/pops.json')
	        .then(respuesta => { 
	            return respuesta.data;
	        })
	        .then(respuestaJson => {
				this.pops = [];
				for (let id in respuestaJson){
		            let pop = {
						id: id,
						licencia: respuestaJson[id].licencia,
						nombre: respuestaJson[id].nombre,
						numeroPop: respuestaJson[id].numeroPop,
						precioPublico: respuestaJson[id].precioPublico,
						costo: respuestaJson[id].costo,
						cantidadComprada: respuestaJson[id].cantidadComprada,

						costoTotal: respuestaJson[id].costoTotal,
						cantidadDisponible: respuestaJson[id].cantidadDisponible,
						vendidos: respuestaJson[id].vendidos,
						margenGanancia: respuestaJson[id].margenGanancia,
						descuentos: respuestaJson[id].descuentos,
						ganancia: respuestaJson[id].ganancia,
						recuperacionDinero: respuestaJson[id].recuperacionDinero,

						apartados: respuestaJson[id].apartados
		            }
		            this.pops.push(pop);
		            this.pops.sort(this.compare)
	          	}
	        });
	    },
	    login: function (event) {
			var vm = this;
			vm.auth.message = '';
			vm.auth.hasErrors = false;

			if (vm.auth.email === '' || vm.auth.password === '') {
				alert('Please provide the email and password');
				return;
			}
			// Sign-in the user with the email and password
			firebase.auth().signInWithEmailAndPassword(vm.auth.email, vm.auth.password)
			.then(function (data) {
				vm.auth.user = firebase.auth().currentUser;
			}).catch(function(error) {
				vm.auth.message = error.message;
				vm.auth.hasErrors = true;
			});
	    },
	    signOut: function () {
			// Signout the user using firebase
			firebase.auth().signOut()
			.then(function(error) {
				this.auth.user = firebase.auth().currentUser;
				this.auth.message = 'User signed out Successfully';
			}.bind(this), function (error) {
				alert('Failed to signout user, try again later');
			});
		},
  	},
  	created(){
    	this.getData();
  	},
  	watch: {
    	'$route': 'getData'
  	},
  	computed: {
    	isAuthenticated: function () {
	        // This function changes the auth.user state when 
	        // the auth status of user changes.
	        firebase.auth().onAuthStateChanged(function (user) {
	          if (user) {
	            this.auth.user = user;
	          } else {
	            this.auth.user = null;
	          }
	        }.bind(this));

	        return (this.auth.user !== null);
      	}
  	}
}

</script>

<style lang="scss">
.navbar-brand{
	max-width: 100px;
	height: auto;
}
.navbar-collapse{
	display: flex;
	align-items: center;
	height: 100px;
}
.internal-content{
	margin-top: 140px;
}
.cerrar-sesion{
	margin-left: auto;
}
#loginContainer{
	margin-top: 150px;
}
</style>
