<template>
    <section class="tables">
      <div class="page-header">
        <h3 class="page-title">
          ARTICULOS POR UBICACIÓN
        </h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">Articulos</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
             Articulos por Ubicación
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
  
                
                           
            <div class="row" style="margin-top: 10px;">
              
              <div class="col-5"></div>
              <div class="col-5">
              <strong>Ubicación </strong>
             
                <v-select
                        v-if="ubicaciones"
                        v-model.trim="tipo_ubicacion"
                        :options="ubicaciones"
                        class="select"
                        :getOptionLabel="item => item.tipo "
                        />
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-5"></div>
              <div class="col-5">
                <v-select
                          v-if="ubicacionByTipo"
                          v-model.trim="ubicacion"
                          :options="ubicacionByTipo"
                          class="select"
                          :getOptionLabel="item => item.nombre"
                          />
                </div>
            </div>
            
          

            <div class="row" style="margin-top: 20px;">
              <div class="col-12" style="text-align: center;">
                  <button class="btn btn-primary" @click="buscarKardex()">Consultar</button>
              </div> 
            </div>

            </br>
            <table class="table table-bordered" v-if="articulos">
                <thead>
                    <tr>
                        <th> Articulo </th>
                        <th> Modelo   </th>
                        <th> Marca    </th>
                        <th> Serial   </th>
                        <th> Activo   </th>
                        <th> Cantidad </th>
                        <th> Estado   </th>
                    </tr>
                </thead>
                <tbody  v-for="articulo in articulos" :key="articulo.id"  >
                    <tr v-if="articulo.kardex_ubicacion.length > 0">
                        <td> {{ articulo.subcategoria.categoria.nombre }} {{ articulo.subcategoria.nombre }}</td>
                        <td> {{ articulo.modelo || 'N/A' }} </td>
                        <td> {{ articulo.marcas.nombre }} </td>
                        <td> {{ articulo.serial || 'N/A' }}</td>
                        <td> {{ articulo.activo || 'N/A' }}</td>
                        <td> {{ articulo.kardex_ubicacion[0].cantidad }}</td>
                        <td></td>
    
                    </tr>
                </tbody>
            </table>

            </br>

            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  
  import ApiPublic from '@/api/ApiPublic'
  import Spinner   from '@/components/loading/Spinner.vue'
  
  
  export default {
  
      name: "ListarUbicaciones",
      components: {
        Spinner
      },
  
      data() {
          return {
    
              message           : null,
              errors            : {},
              messageById       : null,
              errorsById        : null,
              ubicacion         : null,
              ubicacionByTipo   : null,
              ubicaciones       : null,
              tipo_ubicacion    : null,
              articulos         : []
          }
          
      },
      watch:{
        tipo_ubicacion( value , old){
         if( value ){
          this.ubicacionByTipo = value.ubicacion;
         }
      }
    },
  
      mounted(){
         //this.getResults();
      },
      created(){
        this.listarUbicaciones( )
      },
      computed:{
       
      },
      methods:{
        async listarUbicaciones( ) {
            try {
                const { data: resp }  = await ApiPublic.get('/tipo-ubicacion/?paginate=false');
                this.ubicaciones = resp
                console.log(this.ubicaciones);
            }
            catch( error ){
                this.message = error.response.data.message
            }
		},
        async buscarKardex(){
            
            console.log(this.ubicacion.id);
            let { id } = this.ubicacion;
            try {
                const { data: resp }  = await ApiPublic.get('/kardex-articulos-ubicacion/listar',{  params: {ubicacion: id} });
                this.articulos = resp
                console.log( this.articulos );
            }
            catch( error ){
                this.message = error.response.data.message
            }
        }

    }
    
  }
  </script>

<style setup>

.select {
  width: 150px !important;
  max-height: 60px !important;
  font-size: 11px;
}
    

</style>

  