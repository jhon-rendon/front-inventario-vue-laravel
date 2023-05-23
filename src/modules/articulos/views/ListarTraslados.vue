<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        LISTAR TRASLADOS
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">Articulos</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Listado de Traslados
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <template v-if="traslados.data">
              <table class="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">#Id</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Ticket</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Origen</th>
                    <th scope="col">Destino</th>
                    <th scope="col">Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-for="item in traslados.data" :key="item.id">
                  <tr>  
                    
                  <th scope="row" >{{ item.id }}</th>
                  <td > 
                         {{ item2.cantidad }}
                        
                  </td>
                  <td > <span>
                          {{ item2.ubicacion.nombre }}
                        </span> 
                    </td>
                    <td >{{ item.modelo }}</td>
                    <td >{{ item.marcas.nombre }}</td>
                    <td >{{ item.serial }}</td>
                    <td >{{ item.activo }}</td>
                    <td >{{ item.subcategoria.categoria.nombre }} {{ item.subcategoria.nombre }}</td>
                    <td >

                      <router-link :to="{ name: 'traslado-articulo',params: {id : item.id, idUbicacion: item2.id },props: true}"
                          title="trasladar"
                          type="button"
                          class="btn"
                          v-if="item2.cantidad > 0 "
                      >
                      <i class="mdi mdi-ribbon"></i>
                      </router-link>
                     <button
                       title="trasladar"
                        type="button"
                        class="btn"
                        @click="showModal( item.id  )"
                      >
                        <i class="mdi mdi-ribbon"></i>
                      </button>
                    </td>
                  
                   </tr></tbody>
             
                 
                
              </table>
              <pagination
                :data="traslados"
                @pagination-change-page="getResults"
              ></pagination>
            </template>

            <Spinner v-else />
          </div>
        </div>
      </div>
    </div>
    <div>

    
    </div>
  </section>
</template>

<script>

import ApiPublic from '@/api/ApiPublic'
import Spinner   from '@/components/loading/Spinner.vue'


export default {

    name: "ListarTraslados",
    components: {
      Spinner
    },

    data() {
        return {
            traslados         : {},
            message           : null,
            errors            : {},
            ubicacionById     : {},
            tipoUbicacion     : {},
            tipoUbicacionById : null,
            messageById       : null,
            errorsById        : null,
            id                : null,
        }
    },
    /*watch:{
        tipoUbicacion (nuevoValor, valorAnterior){
        console.log("El tipo de Ubicacion pasó de ser %s a %s", JSON.stringify( valorAnterior ), JSON.stringify( nuevoValor ) );
      }
    },*/

    mounted(){
       this.getResults();
    },

    methods: {
      async getResults(page = 1) {
            try {
                const { data: resp }  = await ApiPublic.get('/traslado-articulos/?page='+page);
                this.traslados = resp
                console.log(this.traslados);
            }
            catch( error ){
                this.message = error.response.data.message
            }
		  },
      async getUbicacionById( id ){
        try {
                const { data: resp }  = await ApiPublic.get('ubicacion/'+id);
                this.ubicacionById = resp.data
                this.id = id
                this.tipoUbicacionById = this.ubicacionById.tipo_ubicacion_id;
            }
            catch( error ){
                this.messageById = error.response.data.message
                this.errors      = error.response.data.errors
        }
      },
      
      async listarTipoUbicacion(){
          try {
                const { data: resp }  = await ApiPublic.get('/tipo-ubicacion/?paginate=false');
                this.tipoUbicacion = resp;
            } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }
      },
      async showModal( id ) {
        console.log('abrilModal' +id);
        await this.getUbicacionById( id );
        await this.listarTipoUbicacion();
        this.$root.$emit('bv::show::modal', 'modal', '#btnShow')
       
      },
      resetModal() {
        this.messageById = null;
        this.errorsById  = null;
        console.log('cerrar modal');
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      async handleSubmit() {
      
         // Exit when the form isn't valid
         if (!this.checkFormValidity()) {
          return
        }

        this.$nextTick(() => {
          //this.$bvModal.hide('modal')
        })
        console.log('actualizar');
        
        try {
                const { data: resp }  = await ApiPublic.put('/ubicacion/'+this.id,{
                   nombre            : this.ubicacionById.nombre,
                   codigo            : this.ubicacionById.codigo,
                   direccion         : this.ubicacionById.direccion,
                   tipo_ubicacion_id : this.tipoUbicacionById
                });
                this.messageById = resp;
                this.errorsById  = null
                await this.getResults();
            } catch ( error ){
               this.messageById = error.response.data
               this.errorsById  = error.response.data.errors
               
            }
        
      }
  }
  
}
</script>
