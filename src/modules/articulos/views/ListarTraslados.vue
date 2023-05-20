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
                          title="trasladar"
                          type="button"
                          class="btn"
                          v-if="item2.cantidad > 0 "
                      >
                      <i class="mdi mdi-ribbon"></i>
                      </router-link>
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
              <pagination
                :data="articulos"
                @pagination-change-page="getResults"
              ></pagination>
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
        title="Editar Ubicación"
        ok-title="Actualizar"
        cancel-title="Cancelar"
        @ok="handleOk"
        @show="resetModal"
        @hidden="resetModal"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
         
          <b-form-group
            label="Tipo de Ubicación"
            label-for="tipoUbicacion"
            invalid-feedback="El Tipo de Ubicación es requerido"
          >
          <select class="form-control" v-model="tipoUbicacionById" required>
            <option 
                v-for="item in tipoUbicacion" :key="item.id"
                :value="item.id" 
                >
                {{ item.tipo }}
            </option>
          </select>
          <!--<div class="is-invalid" v-if="errorsById.tipo_ubicacion_id">{{ errorsById.tipo_ubicacion_id[0] }}</div>-->
         </b-form-group>
          
          <b-form-group
            label="Nombre"
            label-for="nombre"
          >
            <b-form-input
              id="nombre"
              v-model="ubicacionById.nombre"
            ></b-form-input>
          <div class="is-invalid" v-if="errorsById && errorsById.nombre">{{ errorsById.nombre[0] }}</div>
          </b-form-group>
          <b-form-group
            label="Codigo"
            label-for="codigo"
          >
            <b-form-input
              id="codigo"
              v-model="ubicacionById.codigo"
            ></b-form-input>
          </b-form-group> 

          
          <b-form-group
            label="Dirección"
            label-for="direccion"
          >
            <b-form-input
              id="direccion"
              v-model="ubicacionById.direccion"
            ></b-form-input>
            
          </b-form-group>
        </form>
        <template v-if="messageById">
          <div v-if="messageById.success" class="alert alert-success" role="alert">{{ this.messageById.message }}</div>
          <div v-else class="alert alert-danger" role="alert">{{ this.messageById.message }}</div>
        </template> 
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
                const { data: resp }  = await ApiPublic.get('/kardex-articulos/?page='+page);
                this.articulos = resp
                console.log(this.articulos);
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
