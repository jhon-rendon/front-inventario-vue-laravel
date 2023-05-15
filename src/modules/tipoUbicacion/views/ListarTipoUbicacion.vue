<template>
    <section class="tables">
      <div class="page-header">
        <h3 class="page-title">
          TIPO DE UBICACION
        </h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">Tipo de Ubicación</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Listado de tipos de ubicación
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
           
                <template v-if="tipoUbicacion.data">
                  <table class="table table-striped">
                  <thead>
                         <tr>
                          <th scope="col">#Id</th>
                          <th scope="col">Tipo</th>
                         </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in tipoUbicacion.data" :key="item.id">
                              <th scope="row">{{ item.id }}</th>
                              <td> {{  item.tipo  }}</td>
                            </tr>
                        
                      </tbody>
                  </table>
                  <pagination :data="tipoUbicacion" @pagination-change-page="getResults"></pagination>
                </template>

                <Spinner v-else/>

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

    name: "ListarTipoUbicacion",
    components: {
      Spinner
    },

    data() {
        return {
            tipoUbicacion : {},
            message       : null,
            errors        : {}
        }
    },

    mounted(){
       this.getResults();
    },

    methods: {
        async getResults(page = 1) {
            try {
                const { data: resp }  = await ApiPublic.get('/tipo-ubicacion?page='+page);
                this.tipoUbicacion = resp
            }
            catch( error ){
                this.message = error.response.data.message
            }  
		    },   
    }
}
</script>