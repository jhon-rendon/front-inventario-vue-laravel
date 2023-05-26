<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        LISTAR ARTICULOS
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">Articulos</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Listado de Articulos
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">

            <template v-if="articulos.data">

               
       
              <div class="row">
      <div class="mb-3 col-md-3">
                  Cantidad por pagina:
                  <select v-model="pageSize" @change="handlePageSizeChange($event)">
                    <option v-for="size in pageSizes" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
               </div>
      <div class="col-md-3"></div>
      <div class="input-group mb-3 col-md-4" >
        <input
          type="text"
          class="form-control"
          placeholder="Busqueda"
          v-model="search"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="page = 1; retrieveTutorials();"
          >
            Buscar
          </button>
        </div>
      </div>
    
  </div>
              <table class="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">#Id</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Ubicación</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Serial</th>
                    <th scope="col">Activo</th>
                    <th scope="col">Categoria</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-for="item in articulos.data" :key="item.id">
                  <tr v-for=" item2 in item.kardex_ubicacion" :key="item2.nombre">  
                    
                  <th scope="row" v-if="item2.cantidad > 0">{{ item.id }}</th>
                  <td v-if="item2.cantidad > 0"> <span v-if="item2.cantidad"> 
                         {{ item2.cantidad }}
                        </span>
                  </td>
                  <td v-if="item2.cantidad > 0"> <span>
                          {{ item2.ubicacion.nombre }}
                        </span> 
                    </td>
                    <td v-if="item2.cantidad > 0">{{ item.modelo }}</td>
                    <td v-if="item2.cantidad > 0">{{ item.marcas.nombre }}</td>
                    <td v-if="item2.cantidad > 0">{{ item.serial }}</td>
                    <td v-if="item2.cantidad > 0">{{ item.activo }}</td>
                    <td v-if="item2.cantidad > 0">{{ item.subcategoria.categoria.nombre }} {{ item.subcategoria.nombre }}</td>
                    <td v-if="item2.cantidad > 0">

                      <router-link :to="{ name: 'traslado-articulo',params: {id : item.id, idUbicacion: item2.id },props: true}"
                          title="Trasladar" type="button">
                      <i class="mdi mdi-ribbon"></i>
                      </router-link>

                      <button title="ver Detalle Traslados"
                              @click="verDetalleTraslados( item, item2.cantidad, item2.ubicacion.nombre )">
                        <i class="mdi mdi-border-all"></i>
                      </button>
                      
                      <!---<button
                       title="trasladar"
                        type="button"
                        class="btn"
                        @click="showModal( item.id  )"
                      >
                        <i class="mdi mdi-ribbon"></i>
                      </button>-->
                    </td> 
             
                  </tr>
                </tbody>
              </table>
              <!--<pagination
                :data="articulos"
                @pagination-change-page="getResults"
              ></pagination>-->
              

            <b-pagination
              v-model="page"
              :total-rows="count"
              :per-page="pageSize"
              prev-text="Anterior"
              next-text="Siguiente"
              @change="handlePageChange"
              pills
            >
            </b-pagination>

            </template>

            <Spinner v-else />
          </div>
        </div>
      </div>
    </div>
    <div>

      <b-modal
        id="modal"
        ref="modal"
        title="Detalle de Traslados"
        hide-footer
        size="xl"
        @hidden="resetModal"
        >
       <h3>Articulo</h3>
       <b-table-simple  responsive striped v-if="articulo">
             <b-thead  head-variant="dark">
                <b-tr>
                  <b-th>ID</b-th>
                  <b-th>Cantidad</b-th>
                  <b-th>Ubicación</b-th>
                  <b-th>Modelo</b-th>
                  <b-th>Marca</b-th>
                  <b-th>Serial</b-th>
                  <b-th>Activo</b-th>
                  <b-th>Categoria</b-th> 
              </b-tr>
             </b-thead>
              <b-tbody>
                  <b-tr>   
                    <b-th scope="row">{{ articulo.id }}</b-th>
                    <b-td> {{ articulo.cantidad }}</b-td>
                    <b-td> {{ articulo.ubicacion }} </b-td>
                    <b-td >{{ articulo.modelo }}</b-td>
                    <b-td >{{ articulo.marcas.nombre }}</b-td>
                    <b-td >{{ articulo.serial }}</b-td>
                    <b-td >{{ articulo.activo }}</b-td>
                    <b-td >{{ articulo.subcategoria.categoria.nombre }} {{ articulo.subcategoria.nombre }}</b-td>
                  </b-tr>
             </b-tbody>
       </b-table-simple>
          
      <h3>Traslados</h3>

      <b-table-simple  responsive borderless striped v-if="detalleTraslado">
            <b-thead  head-variant="dark">
              <b-tr>
                <b-th>ID</b-th>
                <b-th>Fecha</b-th>
                <b-th>Hora</b-th>
                <b-th>Ticket</b-th>
                <b-th>Descripción</b-th>
                <b-th>Cantidad</b-th>
                <b-th>Ubicación Origen</b-th>
                <b-th>Ubicación Destino</b-th>
                <b-th>Estado Articulo</b-th>
              </b-tr>
             </b-thead>
              <tbody >
                <b-tr v-for="item in detalleTraslado.data" :key="item.id">
                  <b-td> {{ item.id }}</b-td>
                  <b-td> {{ formatoFecha( item.fecha) }}</b-td>
                  <b-td> {{ item.hora }}</b-td>
                  <b-td> {{ item.ticket }}</b-td>
                  <b-td> {{ item.descripcion }}</b-td>
                  <b-td> {{ item.cantidad }}</b-td>
                  <b-td> <span v-if="item.ubicacion_origen > 0"> {{ item.ubicacion_origen_nombre }} </span></b-td>
                  <b-td> {{ item.ubicacion_destino_nombre }}</b-td>
                  <b-td> {{ ( item.estado_articulo ) ? item.estado_articulo.estado : '' }}</b-td>
              </b-tr>
             </tbody>    
        </b-table-simple >
           
        
      </b-modal>

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
            articulos         : {},
            articulo          : null,
            detalleTraslado   : null,
            message           : null,
            errors            : {},
            messageById       : null,
            errorsById        : null,
            id                : null,
            
            page: 1,
            count: 0,
            pageSize: 10,
            pageSizes: [10, 30, 50,100],
            search: null
        }
        
    },
    /*watch:{
        tipoUbicacion (nuevoValor, valorAnterior){
        console.log("El tipo de Ubicacion pasó de ser %s a %s", JSON.stringify( valorAnterior ), JSON.stringify( nuevoValor ) );
      }
    },*/

    mounted(){
       //this.getResults();
    },
    created(){
      //this.getData(this.url);
      this.retrieveTutorials();
    },
    computed:{
     
    },
    methods: {
      getRequestParams(search=null, page, pageSize) {
      let params = {};

      if (search) {
        params["search"] = search;
      }

      /*if (page && page > 1) {
        params["page"] = page - 1;
      }else{
        params['page'] = 1;
      }*/

      params["page"] = page;

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    async retrieveTutorials() {
      const params = this.getRequestParams(
        //this.searchTitle,
        this.search,
        this.page,
        this.pageSize
      );

        try {
                const { data: resp }  = await ApiPublic.get('/kardex-articulos/',{params});
                this.articulos = resp
                this.count = resp.total
                console.log(this.articulos,this.count);
            }
            catch( error ){
                this.message = error.response.data.message
            }
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveTutorials();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveTutorials();
    },

      async getResults(page = 1) {
            try {
                const { data: resp }  = await ApiPublic.get('/kardex-articulos/?page='+page);
                this.articulos = resp
                console.log(this.articulos);
            }
            catch( error ){
                this.message = error.response.data.message
            }
		  },    
      async verDetalleTraslados( articulo, cantidad,ubicacion ) {
        
        this.articulo           = articulo;
        this.articulo.cantidad  = cantidad;
        this.articulo.ubicacion = ubicacion;
        try {
          const { data:resp }  = await ApiPublic.get('detalle-traslado/articulo/'+articulo.id);
               this.detalleTraslado = resp;

               for( let i=0; i<this.detalleTraslado.data.length; i++ ){
                  for( let k=0; k<this.articulo.kardex_ubicacion.length;k++){
                       if( this.detalleTraslado.data[i].ubicacion_destino == this.articulo.kardex_ubicacion[k].ubicacion.id ){
                          this.detalleTraslado.data[i].ubicacion_destino_nombre =  this.articulo.kardex_ubicacion[k].ubicacion.nombre;
                          console.log('ok');
                       }
                       if( this.detalleTraslado.data[i].ubicacion_origen == this.articulo.kardex_ubicacion[k].ubicacion.id ){
                          this.detalleTraslado.data[i].ubicacion_origen_nombre =  this.articulo.kardex_ubicacion[k].ubicacion.nombre;
                          console.log('ok');
                       }
                    }
                  
               }
               
               console.log(this.detalleTraslado);
               console.log(this.articulo);
        } catch (error) {
          console.log(error);
        }
        this.$root.$emit('bv::show::modal', 'modal', '#btnShow')
       
      },
      resetModal() {
        this.articulo = null;
      },

      formatoFecha( fecha ){
        const date = new Date( fecha ).toLocaleDateString('en-GB');
        return date;
       },

          
  }
  
}
</script>
