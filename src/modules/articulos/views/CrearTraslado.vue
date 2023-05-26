<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        CREAR TRASLADO ARTICULO
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

           
            <table class="table table-bordered table-responsive" style="height:500px">
              <thead class="thead-dark">
                <tr>
                  <th>Item</th>
                  <th>Origen</th>
                  <th>Categoria</th>
                  <th>Articulo</th>
                  <!--<th>Marca</th>-->
                  <th>Activo</th>
                  <th>Serial</th>
                  <th>Cantidad </br>Disponible</th>
                  <th>Destino</th>
                  <th>Cantidad a </br>Trasladar</th>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody v-for="(item, index ) in articulos " :key="index">
                <tr v-if="articulos.length > 0">
                 
                  <td>{{ index  +1  }} </td>
                  <td  class="col">
                    <v-select
                    v-if="ubicaciones"
                    v-model.trim="item.tipo_ubicacion"
                    :options="ubicaciones"
                    class="select"
                    :getOptionLabel="item => item.tipo "
                    @input="selectTipoUbicacion( index, item )"
                    />
                    </br>
                    <v-select
                    v-if="ubicacionesByTipo[index]"
                    v-model.trim="item.ubicacion"
                    :options="ubicacionesByTipo[index]"
                    class="select"
                    :getOptionLabel="item => item.nombre"
                    />
                  </td>

                  
                  <td class="col">
                    <v-select
                    v-if="subcategoria"
                    v-model.trim="articulos[index]['subcategoria']"
                    :options="subcategoria"
                    class="select"
                    :getOptionLabel="item => item.categoria.nombre + ' '+ item.nombre "
                    @input="selectSubcategoria( index, item )"
                    />
                  </td>
                  <td class="col">
                    <v-select
                    v-if="articulos_disponibles[index]"
                    v-model.trim="item.cantidad"
                    :options="articulos_disponibles[index]"
                    class="select"
                    :getOptionLabel="item => getDetalleArticulo( item ) "
                    />

                  </td>
                  <!--<td> <template> {{ articulos.marca }}</template></td>-->
                  <td></td>
                  <td>  {{ item.serial }} </td>
                  <td></td>
                  <td class="col">
                   
                    <v-select
                    v-if="ubicaciones_destino"
                    v-model.trim="item.tipo_ubicacion_destino"
                    :options="ubicaciones"
                    class="select"
                    :getOptionLabel="item => item.tipo "
                    
                    />
                    </br>
                    <v-select
                    v-if="ubicacionesByTipoDestino"
                    v-model.trim="item.ubicacion_destino"
                    :options="ubicacionesByTipoDestino"
                    class="select"
                    :getOptionLabel="item => item.nombre"
                    />
                

                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="10"> <button class="btn btn-info" @click="addRow()">Agregar Fila </button></td>
                </tr>
              </tfoot>
            </table>
            

           

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
                ubicacion          : null,
                tipo_ubicacion     : null,
                tipo_ubicacion_destino     : null,
                subcategoria       : null,
                marca              : null,
                serial             : null,
                cantidad_disponible:null,
            }, 
            articulos           : [],
            subcategoria        : null,
            articuloById        : null,
            kardeUbicacionById  : [],
            ubicacionesByTipo   : [],
            ubicacionesByTipoDestino:null,
            sucessForm    : false,
            tipoCantidad  :  null,
            message       :  null,
            errors        :  {},
            ubicaciones   :  null,
            ubicaciones_destino : null,
            estados       : [{  id: 1, nombre:'Nuevo' },
                             {  id: 2, nombre:'Usado'},
                             { id: 3,  nombre:'Reparado'},
                             { id: 1,  nombre:'Baja' },
                            ],
            loading       : true,
            articulos_disponibles: [],
            countRegistros : 10
        }
    },
    watch:{
      /*async 'articulos.tipo_ubicacion'( valor ){
        console.log( valor );
        if(valor && valor.ubicacion ){

          this.ubicacionesByTipo = valor.ubicacion;
        }
        /*try {
                const { data: resp }  = await ApiPublic.get('/kardex-articulos-disponibles?subcategoria='+valor.id);
                this.articulos_disponibles = resp;
                console.log(this.articulos_disponibles);
            } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }
      }*/
      /*},
      async 'articulos.tipo_ubicacion_destino'( valor ){
        if(valor && valor.ubicacion ){
          this.ubicacionesByTipoDestino = valor.ubicacion;
        }
      },
      async 'articulos.subcategoria'( valor ){
        if( valor ){
          console.log(valor,this.ubicacionesByTipo[0].id );
          try {
                  const { data: resp }  = await ApiPublic.get('/kardex-articulos-disponibles?subcategoria='+valor.id+'&ubicacion='+this.ubicacionesByTipo[0].id);
                  this.articulos_disponibles = resp;
                  console.log(this.articulos_disponibles);
              } catch ( error ){
                this.message = error.response.data.message
                this.errors  = error.response.data.errors
              }
        }
      },
      'articulos.cantidad'( value ){
        if( value ){ 
         // console.log( value );
          this.articulos.cantidad = value
          this.articulos.marca = value.marcas.nombre
          this.articulos.serial    = ( value.serial ) ? value.serial : null
          //this.cantidad_disponible = value.
          console.log( this.articulos.cantidad );
        }
      }*/
    },
    computed:{
     
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
          validateDistinct : () => ( this.kardeUbicacionById.data.ubicacion.id !== this.articulo.ubicacion_destino )
        },
        estado:{
          required,
        }
      },
      }
    }, 
     mounted(){
       
    },
    created(){
      this.articulosInicial();
      this.listarSubcategorias();
      this.listarUbicaciones();
    },

    methods: {

      articulosInicial(){

        for(let i=0; i<=4; i++ ){
          this.articulos.push( {...this.articulo} );
        }
        console.log( this.articulos);
      },
       addRow(){
        this.articulos.push( {...this.articulo } );
      },

      async selectTipoUbicacion( index, item ){
        
         this.ubicacionesByTipo[index] = item.tipo_ubicacion.ubicacion;
        
        /*try {
                const { data: resp }  = await ApiPublic.get('/kardex-articulos-disponibles?subcategoria='+id);
                this.articulos_disponibles = resp;
                console.log(this.articulos_disponibles);
            } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }*/
      },
      async selectSubcategoria( index, item ){

        let subcategoria = item.subcategoria.id
        let ubicacion    = item.tipo_ubicacion.ubicacion[0].id;
          try {
                 const { data: resp }  = await ApiPublic.get('/kardex-articulos-disponibles?subcategoria='+subcategoria+'&ubicacion='+ubicacion);
                 this.articulos_disponibles[index] = resp;
                console.log(this.articulos_disponibles[index]);
            } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.errors
          }
      },

      getDetalleArticulo( item ){

        let marca =  item.marcas.nombre
        if( !item.serial ){
          let cantidades = null;
          for( const element  of item.kardex_ubicacion ){
              if( element.cantidad > 0 ){
                  return 'Cantidad :' +element.cantidad +' | Marca:' +marca
              }
          }
        }
        else{
           return 'Serial: '+item.serial+' | Marca:' +marca
        }
      },
      viewUbicacion(item){

        let string = '';
        for (const kubc of item.kardex_ubicacion) {
              if( kubc.cantidad > 0)
              { 
                string+='Serial:'+item.serial+'- Ub: '+kubc.ubicacion.nombre;
                return string;
                  break;
              } 
        }

        return 'Serial:'+item.serial;
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
      showAlert() {
        this.$swal.fire(
          'Success!',
          'Your file has been Success.',
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
      redirectArticulo(){
        this.$router.push({ name: 'listar-articulo' })
      },
      selectedCategoria( e ){
        this.tipoCantidad = e.target.selectedOptions[0].dataset.tipocantidad ;
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
                        ubicacion_destino  : this.articulo.ubicacion_destino,
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
                const { data: resp }  = await ApiPublic.get('/tipo-ubicacion/?paginate=false');
                this.ubicaciones = resp
                this.ubicaciones_destino = resp
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

.select {
  width: 150px !important;
  max-height: 60px !important;
  font-size: 11px;
}
    

</style>
