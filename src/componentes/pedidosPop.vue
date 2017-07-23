<template>
	<div class="internal-content">

		<div class="new-announcement">
			<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#pedidosModal">Nuevo pedido</button>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h1>Listado de pedidos</h1>
			</div>
			<div class="panel-body">
				<table class="table table-hover table-bordered table-funkopop">
					<thead>
						<tr>
							<th>
								Nombre
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
	
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="pedidosModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">Pedidos Funko Pop</h4>
		      </div>
		      <div class="modal-body">
		      	
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
		        <button type="button" class="btn btn-primary" v-on:click="">Guardar</button>
		      </div>
		    </div>
		  </div>
		</div>

	</div>
</template>