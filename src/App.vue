<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <img alt="Brand" class="img-responsive" src="./assets/funko-morelia-logo.jpg">
        </a>
      </div>
        <div class="navbar-collapse" id="bs-example-navbar-collapse-9"> 
          <ul class="nav navbar-nav"> 
            <li class="active">
              <a href="#" @click.prevent="volver">Home</a>
            </li> 
            <li>
              <router-link tag="a" to="listadoPops">Lista de FunkoPop</router-link>
            </li> 
            <li>
               <router-link tag="a" to="nuevoPop">Nuevo FunkoPop</router-link>
            </li>
            <li>
              <router-link tag="a" to="avisoPop">Listado de Avisos</router-link>
            </li>
            <li>
              <router-link tag="a" to="pedidosPop">Pedidos FunkoPop</router-link>
            </li>  
          </ul> 
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <router-view :pops="pops"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      pops: []
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
              recuperacionDinero: respuestaJson[id].recuperacionDinero
            }
            this.pops.push(pop);
            this.pops.sort(this.compare)
          }
        });
    }
  },
  created(){
    this.getData();
  },
  watch: {
    '$route': 'getData'
  },
  
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
</style>
