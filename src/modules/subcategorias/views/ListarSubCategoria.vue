<template>
    <section class="tables">
      <div class="page-header">
        <h3 class="page-title">
          SUBCATEGORIAS
        </h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">SubCategorias</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Listado de SubCategorias
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
           
                <template v-if="subcategorias.data">
                  <table class="table table-striped">
                  <thead>
                          <tr>
                          <th scope="col">#Id</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Descripción</th>
                          <th scope="col">Tipo Cantidad</th>
                          <th scope="col">ID Categoria</th>
                          <th scope="col">Nombre Categoria</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in subcategorias.data" :key="item.id">
                              <th scope="row">{{ item.id }}</th>
                              <td> {{  item.nombre  }}</td>
                              <td> {{  item.descripcion  }}</td>
                              <td> {{  item.tipo_cantidad  }}</td>
                              <td> {{  item.categoria_articulos_id  }}</td>
                              <td> {{  item.categoria.nombre }}</td>
                            </tr>
                        
                      </tbody>
                  </table>
                  <pagination :data="subcategorias" @pagination-change-page="getResults"></pagination>
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

    name: "ListarSubcategoria",
    components: {
      Spinner
    },

    data() {
        return {
            subcategorias : {},
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
                const { data: resp }  = await ApiPublic.get('/subcategoria-articulos?page='+page);
                this.subcategorias = resp
            }
            catch( error ){
                this.message = error.response.data.message
            }  
		    },   
    }
}
</script>