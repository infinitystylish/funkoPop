<template>
	<div class="internal-content">
		<div class="funko-options">
			<router-link tag="button" to="/FunkoPop/listadoPops" class="btn btn-primary btn-lg">Lista de FunkoPop</router-link>
			<router-link tag="button" to="/FunkoPop/nuevoPop" class="btn btn-success btn-lg">Nuevo FunkoPop</router-link>
			<router-link tag="button" to="/FunkoPop/avisoPop" class="btn btn-warning btn-lg">Aviso / Apartado FunkoPop</router-link>
			<router-link tag="button" to="/FunkoPop/pedidosPop" class="btn btn-danger btn-lg">Pedidos FunkoPop</router-link>
		</div>
		<div class="total">
			<div class="total-cost">
				<span>Total de inversion: ${{totalInvertido}} </span>
			</div>
			<div class="total-recuperado">
				<span>Total recuperado: ${{totalRecuperado}} </span>
			</div>
			<div class="total-ganado">
				<span>Total ganado: ${{ Math.ceil( (totalGanancia - totalDescuento)*10) / 10 }} </span>
			</div>
			<div class="total-descuento">
				<span>Total descuento: ${{totalDescuento}} </span>
			</div>
			<div class="ganancia">
				<span v-if="(totalRecuperado + totalGanancia) - totalInvertido  > 0">Tu ganancia es de {{ Math.abs(  Math.ceil(  (totalInvertido - (totalRecuperado + totalGanancia))*10) /10) }}</span>
				<span v-else>Faltan {{ Math.abs(  Math.ceil( ( (totalGanancia + totalRecuperado) - totalInvertido) *10) / 10) }}</span>
			</div>
			<div class="total-comprado">
				<span>Total comprado: {{totalComprado}} </span>
			</div>
			<div class="total-vendido">
				<span>Total vendido: {{totalVendido}} </span>
			</div>
			<div class="ganancia-embalaje">
				<span> Ganancia embalaje: {{gananciaEmbalaje}} </span>
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
		totalInvertido: function(){
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
		totalGanancia(){
			let sum = 0;
			return this.pops.reduce(function(prev, pop){
			    return Math.ceil( (sum = sum + ( parseInt(pop.vendidos) * (pop.precioPublico - pop.costo) ) )*10) / 10;
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
		totalDescuento(){
			let sum = 0;
			return this.pops.reduce(function(prev, pop){
			    return  Math.ceil( ( sum = sum + parseInt(pop.descuentos) )*10) / 10;
			},0);
		},
		ganancia(){
			let sum = 0;
			return this.pops.reduce(function(prev, pop){
			    return Math.ceil( (sum = sum + parseInt(pop.vendidos) * pop.precioPublico)*10) / 10; 
			},0);
		},
		gananciaEmbalaje(){
			let sum = 0;
			return this.pops.reduce(function(prev, pop){
			    return Math.ceil( (sum = sum + parseInt(pop.gananciaEmbalaje))*10) / 10;; 
			},0);
		}
	}
}

</script>

<style lang="scss">
	
</style>