<template>
    <section class="tables">
      <div class="page-header">
        <h3 class="page-title">
          CATEGORIAS
        </h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">Categorias</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Listado de Categorias
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
           
           
                <table class="table table-striped" v-if="categorias.data">
                <thead>
                        <tr>
                        <th scope="col">#Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in categorias.data" :key="item.id">
                            <th scope="row">{{ item.id }}</th>
                            <td> {{  item.nombre  }}</td>
                            <td> {{  item.descripcion  }}</td>
                        </tr>
                       
                    </tbody>
                </table>
                <pagination :data="categorias" @pagination-change-page="getResults"></pagination>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  

    
<script>

import ApiPublic from '@/api/ApiPublic'

export default {

    name: "ListarMarca",
    components: {
    },

    data() {
        return {
            categorias : {},
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
                const { data: resp }  = await ApiPublic.get('/categoria-articulos?page='+page);
                this.categorias = resp
            }
            catch( error ){
                this.message = error.response.data.message
            }
           
		},
        
    }


}
</script>