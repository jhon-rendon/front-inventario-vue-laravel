<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        TRASLADO ARTICULO
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">Traslado Articulo</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Registrar Traslado Articulo
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">

           
            <form @submit.prevent="registrar">
             
           
             <table class="table table-bordered" style="width:80%;margin:0 auto;" v-if=" articuloById && kardeUbicacionById.data.cantidad > 0 ">
               <tr>
                <th> Marca </th>
                <td> <span v-if="articuloById.marcas">{{  articuloById.marcas.nombre }}</span> </td>
               </tr>
               <tr>
                <th> Modelo </th>
                <td> <span v-if="articuloById.modelo">{{  articuloById.modelo }}</span> </td>
               </tr>
               <tr>
                <th> Serial </th>
                <td> <span v-if="articuloById.serial"> {{  articuloById.serial }} </span> </td>
               </tr>

               <tr>
                <th> Activo </th>
                <td> <span v-if="articuloById.activo">{{  articuloById.activo }} </span> </td>
               </tr>

               <tr>
                <th> Ticket </th>
                <td> 
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ingrese el Ticket"
                      v-model="articulo.ticket"
                      :disabled="sucessForm"
                    />
                    <div class="is-invalid" v-if="errors.ticket">{{ errors.ticket[0] }}</div>

                    <template v-if="$v.articulo.ticket.$error && $v.articulo.ticket.$dirty">
                      <div class="is-invalid" v-if="!$v.articulo.ticket.required"> El ticket es Requerido.</div>       
                      <div class="is-invalid" v-if="!$v.articulo.ticket.numeric"> El ticket debe ser Numérico</div>    
                    </template>
                </div>
                </td>
               </tr>

               
               <tr>
                <th> Descripción </th>
                <td> 
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ingrese la descripcion"
                      v-model="articulo.descripcion"
                      :disabled="sucessForm"
                    />
                    <div class="is-invalid" v-if="errors.ticket">{{ errors.ticket[0] }}</div>
                </div>
                </td>
               </tr>

               <tr>
                <th> Cantidad Disponible</th>
                <td> {{  kardeUbicacionById.data.cantidad }} </td>
               </tr>

               
               <tr>
                <th> Cantidad a Trasladar</th>
                <td>  
                  <span v-if="kardeUbicacionById.data.cantidad > 0 && kardeUbicacionById.data.cantidad == 1"> 1 </span>
              
                  <div v-else class="form-group" :class="{ 'form-group--error': $v.articulo.cantidad.$error }"> 
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Ingrese la Cantidad"
                      v-model.trim="$v.articulo.cantidad.$model"
                      :disabled="sucessForm"
                    />
                    
                    <div class="is-invalid" v-if="errors.cantidad "> {{ errors.cantidad[0] }} </div>
                    
                    <template v-if="$v.articulo.cantidad.$error && $v.articulo.cantidad.$dirty">
                      <div class="is-invalid" v-if="!$v.articulo.cantidad.required"> La cantidad es Requerida.</div>
                      <div class="is-invalid" v-if="!$v.articulo.cantidad.between">  La cantidad debe ser mayor que 0 y menor o igual al disponible</div>
                      
                    </template>
                  </div>
                </td>
               </tr>

               <tr>
                <th> Categoria  </th>
                <td> 
                  {{  articuloById.subcategoria.categoria.nombre }} 
                  {{  articuloById.subcategoria.nombre }} 
                </td>
               </tr>

              <tr>
                <th> Estado Actual Articulo</th>
                <th> </th>
              </tr>
               <tr>
                <th> Estado Articulo a Trasladar  </th>
                <td> 
                 
                    <div class="form-group">
                      <select  class="form-control" 
                              v-model="articulo.estado" 
                              :disabled="sucessForm"
                              >
                          <option 
                          v-for="item in estados" :key="item.nombre"
                          :value="item.id">
                            {{ item.nombre }}   
                          </option>
                      </select>
                      <div class="is-invalid" v-if="errors.estado">{{ errors.estado[0] }}</div>

                      <template v-if="$v.articulo.estado.$error && $v.articulo.estado.$dirty">
                        <div class="is-invalid" v-if="!$v.articulo.estado.required"> El estado es Requerido</div>   
                    </template>
                  </div>
                </td>
               </tr>


               <tr>
                <th> Ubicacion  Actual </th>
                <td>  {{ kardeUbicacionById.data.ubicacion.nombre  }} </td>
               </tr>

               <tr>
                <th> Ubicación Destino  </th>
                <td>  

                  <v-select
                    v-if="ubicaciones"
                    v-model.trim="articulo.ubicacion_destino"
                    :options="ubicaciones"
                    class="select"
                    :disabled="sucessForm"
                    :getOptionLabel="viewUbicacion"
                  />
                  <template v-else>
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                  </template>
  
                  <div class="is-invalid" v-if="errors.ubicacion_destino">{{ errors.ubicacion_destino[0] }}</div>

                  <template v-if="$v.articulo.ubicacion_destino.$error && $v.articulo.ubicacion_destino.$dirty">
                        <div class="is-invalid" v-if="!$v.articulo.ubicacion_destino.required"> La ubicacion Destino es Requerida</div>
                       <div class="is-invalid" v-if="!$v.articulo.ubicacion_destino.validateDistinct"> La ubicacion Destino Debe ser diferente a la actual</div>
                           
                   </template>

                </td>
               </tr>
               <tr>
                <td colspan="2" style="text-align: center;"> 
                  <button type="submit" class="btn btn-primary" v-if="!sucessForm">Trasladar</button> 
                </td>
               </tr>
             </table>

             <div v-else-if="!loading">
                <template v-if="kardeUbicacionById.data.cantidad == 0 && !sucessForm">
                  No Hay Cantidad Disponible
                </template>
             </div>

             <Spinner v-if="loading"/>
          
            </form>

            <div v-if="message">
                    {{ message }}
            </div>  
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
 
//import ApiPrivate from '@/api/ApiPrivate'
import ApiPublic from '@/api/ApiPublic'
import Spinner   from '@/components/loading/Spinner.vue'
import { required,numeric,minValue,between,requiredIf } from 'vuelidate/lib/validators'



export default {
  name: "TrasladoArticulo",
  components: {
      Spinner
    },

  props:{
    id: {
      type: Number,
      required: true
    },
    idUbicacion: {
      type: Number,
      required: true
    },
    
  },
  data() {
        return {
           articulo :{
                descripcion        : null,
                ubicacion_destino  : null,
                estado             : null,
                ubicacion_origen   : null,
                usuario_id         : 1,
                cantidad           : null,
                ticket             : null,
                id                 : null,
            },
            articuloById        : null,
            kardeUbicacionById  : null,
            sucessForm    : false,
            tipoCantidad  :  null,
            message       :  null,
            errors        :  {},
            ubicaciones   :  null,
            estados       : [{  id: 1, nombre:'Nuevo' },
                             {  id: 2, nombre:'Usado'},
                             { id: 3,  nombre:'Reparado'},
                             { id: 1,  nombre:'Baja' },
                            ],
            loading       : true,
        }
    },

    validations() {
      return {
      articulo: {
        cantidad:{
           required: requiredIf(function ( value ) {
            return ( this.kardeUbicacionById.data.cantidad > 1 )
           }),
           numeric,
           minValue: minValue(1),
           between (value) {
            return between(1, this.kardeUbicacionById.data.cantidad)(value)
            }
        },
        ticket:{
          required,
          numeric,
        },
        ubicacion_destino:{
          required,
          validateDistinct : () => {
            if( this.articulo.ubicacion_destino ){
              return ( this.kardeUbicacionById.data.ubicacion.id !==  this.articulo.ubicacion_destino.id )
            }else{
              return true;
            }
          }
        },
        estado:{
          required,
        }
      },
      }
    }, 
     mounted(){
      
      if( isNaN( Number( this.id ) ) || isNaN( Number( this.idUbicacion ) ) ){
        this.redirectArticulo();
      }
      this.getValidUbicacionArticulo();
 
    },
    computed:{
      showAlert() {
        this.$swal.fire(
          'Success!',
          'El traslado se realizo satisfactoriamente',
          'success'
        )
      },
      showErrorAlert( error = ''){
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: (error)? error : 'Se presenta error al realizar el traslado'
        })
      },
    },
    methods: {
      
      viewUbicacion( item ){
         let ubicacion = "";
        if ( item.codigo ){
          ubicacion+="Codigo: "+item.codigo +" | ";
        }  
        ubicacion+='Tipo: '+item.tipo_ubicacion.tipo  + '| Ubicación: '+item.nombre;
        
        return ubicacion;
      },
      redirectArticulo(){
        this.$router.push({ name: 'listar-articulo' })
      },
      
      async registrar () {

            this.message = ''
            this.error   = {}

            this.$v.$touch();
            if (this.$v.$invalid) {
                 return;
            }

            this.$swal.fire({
              title: 'Realmente desea realizar el traslado?',
              text: "",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar',
              cancelButtonText:  'Cancelar'
            }).then(async (result) => {
              
      
              if ( result.value ) {

                    try {
                      const { data: resp }  = await ApiPublic.post('/traslado-articulos',
                      { 
               
                        descripcion        : this.articulo.descripcion,
                        ubicacion_destino  : ( this.articulo.ubicacion_destino ) ? this.articulo.ubicacion_destino.id : null,
                        estado             : this.articulo.estado,
                        articulo_id        : this.id,
                        ubicacion_origen   : this.kardeUbicacionById.data.ubicacion.id,
                        usuario_id         : 1,
                        cantidad           : ( this.kardeUbicacionById.data.cantidad > 1 )? this.articulo.cantidad : 1,
                        ticket             : this.articulo.ticket,
                      });
                    
                    const { message }     = resp;
                    this.message  = message;

                    this.kardeUbicacionById.data.cantidad -= this.articulo.cantidad
                    this.limpiarCampos()
                    this.sucessForm = true
                    this.showAlert() 
                  
                } catch ( error ){

                  this.message = error.response.data.message
                  this.errors  = error.response.data.errors
                  showErrorAlert( this.errors );
                  
                }
              
              }
            });
            
           
        },
        limpiarCampos(){
            /*this.articulo = {
              marca            :null,             
              subcategoria     :null,
              descripcion      :null,
              ubicacion_destino:null,
              modelo           :null,
              serial           :null,
              activo           :null,
              estado           :null,
              ubicacion_origen :null,
              usuario_id       :null,
              cantidad         :null,
              ticket           :null,
                   
            },*/
            this.tipoCantidad = null
            this.errors = {}
        },


        async getArticuloById(){
          try {
                const { data: resp }  = await ApiPublic.get('/kardex-articulos/'+this.id);
                this.articuloById = resp;
                console.log(this.articuloById);
           } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.success;
               this.redirectArticulo();
            }
          
        },

        async getValidUbicacionArticulo(){

          try {
                const { data: resp }  = await ApiPublic.post('/kardex-ubicacion/valid-articulo',{
                  id_articulo   : this.id,
                  id_ubicacion  : this.idUbicacion
                });
                this.kardeUbicacionById = resp
                console.log(this.kardeUbicacionById);
                this.getArticuloById();
                this.listarUbicaciones();
                this.loading = false
            }
            catch( error ){
                this.message = error.response.data.message
                this.redirectArticulo();
            }
        },

        async listarUbicaciones( ) {
            try {
                const { data: resp }  = await ApiPublic.get('/ubicacion/?paginate=false');
                this.ubicaciones = resp
                console.log(this.ubicaciones);
            }
            catch( error ){
                this.message = error.response.data.message
            }
		  }
       
    }
};
</script>

<style setup>


</style>
