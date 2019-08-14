<template>
	<div class="internal-content">
		<div class="funko-options">
			<router-link tag="button" to="/FunkoPop/listadoPops" class="btn btn-primary btn-lg btn-block">Lista de FunkoPop</router-link>
			<router-link tag="button" to="/FunkoPop/nuevoPop" class="btn btn-success btn-lg btn-block">Nuevo FunkoPop</router-link>
			<router-link tag="button" to="/FunkoPop/pedidosAAA" class="btn btn-warning btn-lg btn-block">Lista Pedidos</router-link>
			<router-link tag="button" to="/FunkoPop/registroAAA" class="btn btn-info btn-lg btn-block">Registro AAA</router-link>
			<router-link tag="button" to="/FunkoPop/registroEE" class="btn btn-info btn-lg btn-block">Registro EE</router-link>
			<router-link tag="button" to="/FunkoPop/resurtido" class="btn btn-danger btn-lg btn-block">Resurtido</router-link>
			<!-- <router-link tag="button" to="/FunkoPop/avisoPop" class="btn btn-warning btn-lg">Aviso / Apartado FunkoPop</router-link>
			<router-link tag="button" to="/FunkoPop/pedidosPop" class="btn btn-danger btn-lg">Pedidos FunkoPop</router-link> -->
		</div>

		<div class="total">
			<div class="calculate">
				<span>Total de inversion: $ -{{totalInvertido}} </span>
			</div>
			<div class="calculate">
				<span>Total recuperado: $ {{totalRecuperado}} </span>
			</div>
			<div class="calculate">
				<span>Inversión: $ {{ Math.ceil((totalRecuperado - totalInvertido))}} </span>
			</div>
			<div class="calculate">
				<span>Total ganado: $ {{ Math.ceil( (totalGanancia)*10) / 10 }} </span>
			</div>
			<div class="calculate">
				<span>Total ganado antes de descuento:  $ {{ Math.ceil( ((totalRecuperado + totalGanancia) - (totalInvertido))*10) /10}} </span>
			</div>
			<div class="calculate">
				<span>Total descuento: $ -{{totalDescuento}} </span>
			</div>
			<div class="calculate">
				<span v-if="(totalRecuperado + totalGanancia) - (totalInvertido + totalDescuento) > 0">Tu ganancia es de $ {{ Math.abs(  Math.ceil(  ((totalInvertido + totalDescuento) - (totalRecuperado + totalGanancia))*10) /10) }}</span>
				<span v-else>Faltan {{ Math.abs(  Math.ceil( ( (totalGanancia + totalRecuperado) - (totalInvertido + totalDescuento)) *10) / 10) }}</span>
			</div>
			<div class="calculate">
				<span>Total comprado: {{totalComprado}} </span>
			</div>
			<div class="calculate">
				<span>Total vendido: {{totalVendido}} </span>
			</div>
			<div class="calculate">
				<span> Ganancia embalaje: {{gananciaEmbalaje}} </span>
			</div>
		</div>
		
		<div class="buscarPop">
			<form>
				<div class="form-group">
					<label for="existenciaPop">¿Esta disponible este pop? [Búsqueda por nombre]</label>
				    <input type="text" class="form-control" id="existenciaPop" placeholder="Buscar Pop" v-model="existenciaPop">
				</div>
			</form>

			<div class="table-responsive">
				<table class="table table-hover table-bordered table-funkopop home">
					<thead>
						<tr>
							<th>
								Licencia
							</th>
							<th>
								Nombre
							</th>
							<th data-toggle="tooltip" title="Número pop">
								#Pop
							</th>
							<th data-toggle="tooltip" title="Apartados">
								A
							</th>
							<th data-toggle="tooltip" title="cantidad Disponible">
								CD
							</th>
							<th data-toggle="tooltip" title="Precio Público">
								PP
							</th>
						</tr>
					</thead>
					<tbody v-if="quantity_filter_pops.length > 0">
						<tr v-show="existenciaPop" v-for="(pop, indice) in quantity_filter_pops" class="table-info">
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
								{{ calcularApartados(pop) }}
							</td>
							<td>
								{{ calcularCantidadDisponible(pop) }}
							</td>
							<td>
								{{ pop.precioPublico }}
							</td>
						</tr>
					</tbody>
					<tbody v-else-if="quantity_filter_pops.length == null"></tbody>
					<tbody v-else>
						<tr>
							<td colspan="5">
								No hay disponible(s)
							</td>
						</tr>
					</tbody>	
				</table>
			</div>

		</div>

	</div>
</template>

<script>

export default {
	props: ['pops'],
	data() {
	    return {
	    	existenciaPop: '',
	    	filtered_pops: {},
	    	quantity_filter_pops: {}
	    }
	},
	methods: {
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
	},
	watch: {
		'existenciaPop': function(){
			let filtered_pops = {};
			this.filtered_pops = 
				this.pops.filter(
					(pop) => pop.nombre.toLowerCase().includes(this.existenciaPop.toLowerCase())
				);
			this.quantity_filter_pops = this.filtered_pops.filter(
					(pop) => pop.cantidadDisponible > 0);
			console.log(this.quantity_filter_pops);
			return this.quantity_filter_pops;

		}
	}
}

</script>

<style lang="scss">
	
</style>