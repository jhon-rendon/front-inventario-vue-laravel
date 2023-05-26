<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        REGISTRO DE ARTICULO
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">Articulos</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Registrar Articulo
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!---<h4 class="card-title">Registro de Marca</h4>-->
            <form @submit.prevent="registrar">
             
              <div class="form-group">
                  <label>Marcas</label>
                  
                  <v-select
                  v-if="marcas"
                  label="nombre"
                  v-model.trim="articulos.marca"
                  :options="marcas"
                  class="select"
                />
                <template v-else>
                  <b-spinner variant="primary" label="Spinning"></b-spinner>
                </template>
                
                <div class="is-invalid" v-if="errors.marca">{{ errors.marca[0] }}</div>
                <template v-if="!isFormSubmitted && $v.articulos.marca.$error && $v.articulos.marca.$dirty">
                        <div class="is-invalid" v-if="!$v.articulos.marca.required"> La Marca  es Requerida</div>        
                </template>
              </div>

              <div class="form-group">
                <label>Categoria - Subcategoria</label>

                <v-select
                v-if="subcategoria"
                v-model.trim="articulos.subcategoria"
                :options="subcategoria"
                class="select"
                :getOptionLabel="item => item.categoria.nombre + ' '+ item.nombre "
                />
                <template v-else>
                  <b-spinner variant="primary" label="Spinning"></b-spinner>
                </template>

                <div class="is-invalid" v-if="errors.subcategoria">{{ errors.subcategoria[0] }}</div>

                <template v-if="!isFormSubmitted && $v.articulos.subcategoria.$error && $v.articulos.subcategoria.$dirty">
                        <div class="is-invalid" v-if="!$v.articulos.subcategoria.required"> La Categoria es Requerida</div>        
                </template>
              </div>

              <div class="form-group" v-if="tipoCantidad">
                <label>Tipo de Cantidad : <strong> {{ tipoCantidad }} </strong></label>
              </div>

            <template v-if="tipoCantidad === 'unidad'">
              
              <div class="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Modelo"
                  v-model.trim="articulos.modelo"
                />
                <div class="is-invalid" v-if="errors.modelo">{{ errors.modelo[0] }}</div>
              </div>

              <div class="form-group">
                <label>Serial</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Serial"
                  v-model="articulos.serial"
                />
                <div class="is-invalid" v-if="errors.serial">{{ errors.serial[0] }}</div>
              </div>

              <div class="form-group">
                <label>Codigo Activo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Codigo del Activo"
                  v-model.trim="articulos.activo"
                />
                <div class="is-invalid" v-if="errors.activo">{{ errors.activo[0] }}</div>
              </div>

        


            </template>

            <template v-else-if="tipoCantidad == 'lote' " >
              
              <div class="form-group">
                <label>Cantidad</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Ingrese La cantidad"
                  v-model.trim="articulos.cantidad"
                />
                <div class="is-invalid" v-if="errors.cantidad">{{ errors.cantidad[0] }}</div>

                <template v-if="!isFormSubmitted && $v.articulos.cantidad.$error && $v.articulos.cantidad.$dirty">
                      <div class="is-invalid" v-if="!$v.articulos.cantidad.required"> La cantidad es Requerida.</div>
                      <div class="is-invalid" v-if="!$v.articulos.cantidad.minValue"> La cantidad Debe ser Mayor a 0.</div>
                      
                </template>
              </div>

            </template>
             
            <div class="form-group">
                <label>Ubicación Destino </label>
                <v-select
                v-if="ubicaciones"
                v-model.trim="articulos.ubicacion_destino"
                :options="ubicaciones"
                class="select"
                :getOptionLabel="item => viewUbicacion(item) "
              />
              <template v-else>
                <b-spinner variant="primary" label="Spinning"></b-spinner>
              </template>
  
                <div class="is-invalid" v-if="errors.ubicacion_destino">{{ errors.ubicacion_destino[0] }}</div>

                <template v-if="!isFormSubmitted && $v.articulos.ubicacion_destino.$error && $v.articulos.ubicacion_destino.$dirty">
                        <div class="is-invalid" v-if="!$v.articulos.ubicacion_destino.required"> La ubicacion Destino es Requerida</div>        
                </template>
            </div>
                   
            <div class="form-group">
                <label>Estado Articulo </label>
                <select  class="form-control" 
                         v-model.trim="articulos.estado" 
                         >
                    <option 
                     v-for="item in estados" :key="item.nombre"
                    :value="item.id">
                       {{ item.nombre }}   
                    </option>
                </select>
                <div class="is-invalid" v-if="errors.estado">{{ errors.estado[0] }}</div>
                <template v-if="!isFormSubmitted && $v.articulos.estado.$error && $v.articulos.estado.$dirty">
                    <div class="is-invalid" v-if="!$v.articulos.estado.required"> El estado es Requerido</div>   
                </template>
            </div>

           
            
            <div class="form-group">
                <label>Ticket</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Ticket"
                  v-model.trim="articulos.ticket"
                />
                <div class="is-invalid" v-if="errors.ticket">{{ errors.ticket[0] }}</div>
                <template v-if="!isFormSubmitted && $v.articulos.ticket.$error && $v.articulos.ticket.$dirty">
                     <!-- <div class="is-invalid" v-if="!$v.articulo.ticket.required"> El ticket es Requerido.</div>-->       
                      <div class="is-invalid" v-if="!$v.articulos.ticket.numeric"> El ticket debe ser Numérico</div>    
                 </template>
            </div>

            <button type="submit" class="btn btn-primary">Crear</button>
          
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
import { required,numeric,minValue,between,requiredIf } from 'vuelidate/lib/validators'


export default {
  name: "CrearArticulo",

  data() {
        return {
           articulos :{
                modelo             : null,
                serial             : null,
                activo             : null,
                descripcion        : null,
                subcategoria       : null,
                ubicacion_destino  : null,
                estado             : null,
                ubicacion_origen   : 0,
                usuario_id         : 1,
                cantidad           : null,
                marca              : null
            },
            tipoCantidad  :  null,
            marcas        :  null,
            subcategoria  :  null,
            message       :  null,
            errors        :  {},
            ubicaciones   :  null,
            estados       : [{  id: 1, nombre:'Nuevo' },
                             {  id: 2, nombre:'Usado'},
                             { id: 3,  nombre:'Reparado'},
                             { id: 1,  nombre:'Baja' },
                            ],
           isFormSubmitted: false
        }
    },
     mounted(){
      this.listarMarcas();
      this.listarSubcategorias();
      this.listarUbicaciones();
    },

    validations() {
      return {
      articulos: {
        cantidad:{
           required: requiredIf(function ( value ) {
            return ( this.tipoCantidad === 'lote' )
           }),
           numeric,
           minValue: minValue(1)
        },
        marca:{
          required,
          //numeric,
        },
        subcategoria:{
          required,
          //numeric,
        },
        ticket:{
          //required,
          //numeric,
        },
        ubicacion_destino:{
          required,
        },
        estado:{
          required: requiredIf(function ( value ) {
            return ( this.tipoCantidad === 'unidad' )
           }),
        }
      },
      }
    },

    computed:{
      showAlert() {
        this.$swal.fire(
          'Éxito',
          'Registro Satisfactorio',
          'success'
        )
      },
    },
    watch:{
      'articulos.subcategoria'( subcategoria ){
        this.tipoCantidad = subcategoria.tipo_cantidad
      }
           
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
      async registrar () {

            this.message = ''
            this.error   = {}
            this.isFormSubmitted = false
            
            this.$v.$touch();
            if (this.$v.$invalid) {
                 return;
            }

            try {
                  const { data: resp }  = await ApiPublic.post('/kardex-articulos',
                  { 
                    marca              : ( this.articulos.marca )             ? this.articulos.marca.id             : null,
                    subcategoria       : ( this.articulos.subcategoria )      ? this.articulos.subcategoria.id      : null,
                    ubicacion_destino  : ( this.articulos.ubicacion_destino ) ? this.articulos.ubicacion_destino.id : null,
                    descripcion        : this.articulos.descripcion,
                    modelo             : this.articulos.modelo,
                    serial             : this.articulos.serial,
                    activo             : this.articulos.activo,
                    estado             : this.articulos.estado,
                    ubicacion_origen   : 0,
                    usuario_id         : 1,
                    cantidad           : ( this.tipoCantidad === 'unidad') ? 1 : this.articulos.cantidad,
                    ticket             : this.articulos.ticket,
                    tipo_cantidad      : this.tipoCantidad
                  });
                
                const { message }     = resp;
                this.message  = message;

                this.isFormSubmitted = true
                this.limpiarCampos()
                this.showAlert()
            
            } catch ( error ){

               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }
        },
        limpiarCampos(){
            this.articulos = {
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
                   
            },
            this.tipoCantidad = null
            this.errors = {}
        },


        async listarMarcas(){
          try {
                const { data: resp }  = await ApiPublic.get('/marcas/?paginate=false');
                this.marcas = resp;
            } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }
          
        },

        async listarSubcategorias(){
          try {
                const { data: resp }  = await ApiPublic.get('/subcategoria-articulos/?paginate=false');
                this.subcategoria = resp;
                console.log(this.subcategoria);
            } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.errors
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
select,.select{
  width: 500px !important;
}

</style>
