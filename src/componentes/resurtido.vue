<template>
	<div class="internal-content">
		<div class="table-responsive">
			<table class="table table-hover table-bordered table-funkopop">
				<thead>
					<tr>
						<th>Licencia</th>
						<th>Nombre</th>
						<th>#Pop</th>
						<th>Cantidad Disponible</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="pop of filterFewStocks">
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
							{{ pop.cantidadDisponible }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['pops'],
		data() {
			return {
				fewPops: {}
			};
		},
		computed: {
			filterFewStocks: function(){
				let fewPops = {};
				this.fewPops = this.pops.filter(  pop => pop.cantidadDisponible <= 2 && pop.cantidadDisponible > 0 );
				return _.orderBy(this.fewPops, ['nombre','cantidadDisponible'], ['asc','asc']);
			}
		}
	}
</script>