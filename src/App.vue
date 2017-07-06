<template>
  <div class="container">
    <router-view :pops="pops"></router-view>
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
      this.$http.get('https://funkopop-e84d7.firebaseio.com/pops.json')
        .then(respuesta => { 
            //console.log(respuesta.json());
            return respuesta.json();
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

</style>
