<template>
    <section class="tables">
      <div class="page-header">
        <h3 class="page-title">
          MARCAS
        </h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">Marcas</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Listado de Marcas
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
           
                <template v-if="marcas.data">
                  <table class="table table-striped" >
                  <thead>
                          <tr>
                          <th scope="col">#Id</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Descripción</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in marcas.data" :key="item.id">
                              <th scope="row">{{ item.id }}</th>
                              <td> {{  item.nombre  }}</td>
                              <td> {{  item.descripcion  }}</td>
                          </tr>
                         
                      </tbody>
                  </table>
                  <pagination :data="marcas" @pagination-change-page="getResults"></pagination>
     
                </template>
                <Spinner v-else />

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

    name: "ListarMarca",
    components: {
      Spinner
    },

    data() {
        return {
            marcas     : {},
            countMarcas: null,
            message    : null,
            errors     : {}
        }
    },

    mounted(){
       this.getResults();
    },

    methods: {

        async getResults(page = 1) {
			
            try {
                const { data: resp }  = await ApiPublic.get('/marcas?page='+page);
                this.marcas = resp.data
            }
            catch( error ){
                this.message = error.response.data.message
            }
           
		},
        
    }


}
</script>