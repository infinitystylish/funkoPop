<template>
	<div>
		<div class="funko-options">
			<router-link tag="button" to="listadoPops" class="btn btn-primary btn-lg">Lista de FunkoPop</router-link>
			<router-link tag="button" to="nuevoPop" class="btn btn-success btn-lg">Nuevo FunkoPop</router-link>

			<router-link tag="button" to="modificarPop" class="btn btn-info btn-lg">Modificar FunkoPop</router-link>
		</div>

		<div class="total">
			<div class="total-cost">
			<span>Total de inversion: ${{total}} </span>
			</div>
			<div class="total-recuperado">
				<span>Total recuperado: ${{totalRecuperado}} </span>
				</div>
			<hr />
				<span v-if="total - totalRecuperado > 0">Faltan</span>
				<span v-else>Tienes</span>
					 {{ total - totalRecuperado }} 
				<span v-if="total - totalRecuperado > 0">para recuperar inversión</span>
				<span v-else> de ganancia </span>
			<hr>
			<div class="total-comprado">
				<span>Total comprado: {{totalComprado}} </span>
			</div>
			<div class="total-vendido">
				<span>Total vendido: {{totalVendido}} </span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: ['pops'],
	data() {
	    return {
	      
	    }
	},
	computed: {
	      total: function(){
	        let sum = 0;
	        return this.pops.reduce(function(prev, pop){
	            return Math.ceil( (sum = sum + (pop.costo * pop.cantidadComprada) )*10) / 10; 
	        },0);
	      },
	      totalRecuperado(){
	        let sum = 0;
	        return this.pops.reduce(function(prev, pop){
	            return Math.ceil( (sum = sum + (pop.vendidos * pop.costo) )*10) / 10; 
	        },0);
	      },
	      totalComprado(){
	        let sum = 0;
	        return this.pops.reduce(function(prev, pop){
	            return sum = sum + parseInt(pop.cantidadComprada); 
	        },0);
	      },
	      totalVendido(){
	        let sum = 0;
	        return this.pops.reduce(function(prev, pop){
	            return sum = sum + parseInt(pop.vendidos); 
	        },0);
	      },

	    }
}

</script>

<style lang="scss">
	.funko-options{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 100px;
	}

	.total{
		margin-top: 100px;
		width: 400px;
		margin-left: auto;
		margin-right: auto;
		background-color: #f5f5f5;
   	 	border-color: #ddd;
   	 	border-width: 1px;
   	 	border-style: solid;
   	 	padding: 10px 15px;
   	 	border-top-right-radius: 3px;
   	 	border-bottom-right-radius: 3px;
		.total-recuperado,.total-vendido,.total-comprado{
			margin-top: 10px;
		}
		hr{
			margin-top: 5px; 
			margin-bottom: 5px; 
		}
	}
</style>