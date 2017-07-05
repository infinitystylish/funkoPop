<template>
	
	<div class="funko-options">
		<router-link tag="button" to="listadoPops" class="btn btn-primary btn-lg">Lista de FunkoPop</router-link>
		<router-link tag="button" to="nuevoPop" class="btn btn-success btn-lg">Nuevo FunkoPop</router-link>
	</div>
	
</template>

<style lang="scss">
	.funko-options{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100vh;
	}
</style>