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

           <form @submit.prevent="registrar()">

           
            <table class="table table-bordered table-responsive" style="min-height:500px">
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
                  <!--<th>Destino</th>-->
                  <th>Cantidad a </br>Trasladar</th>
                  <th>Ticket</th>
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
                    @input="selectUbicacion( index, item )"
                    />

                    <template v-if="errors['articulo.'+index+'.ubicacion_origen']">
                      <div class="is-invalid" v-for=" (item_error,item_error_index) in errors['articulo.'+index+'.ubicacion_origen']" :key="item_error_index">
                        {{ errors['articulo.'+index+'.ubicacion_origen'][item_error_index] }}
                      </div>
                    </template>
                    

                  </td>

                  
                  <td class="col">
                    <v-select
                    v-if="subcategoria"
                    v-model.trim="item.subcategoria"
                    :options="subcategoria"
                    class="select"
                    :getOptionLabel="item => item.categoria.nombre + ' '+ item.nombre "
                    @input="selectSubcategoria( index, item )"
                    />
                  </td>
                  <td class="col">
                    <v-select
                    v-if="item.articulos_disponibles"
                    v-model.trim="item.articulo_seleccionado"
                    :options="item.articulos_disponibles"
                    class="select"
                    :getOptionLabel="element => getDetalleArticulo( element ) "
                    @input=" SelectionArticulo( index, item )" 
                 />

                  </td>
                  <!--<td> <template> {{ articulos.marca }}</template></td>-->
                  <td> <template v-if="item.subcategoria && item.articulo_seleccionado"> 
                        {{ item.articulo_seleccionado.activo  || 'N/A' }} 
                       </template>
                  </td>
                  <td>  <template v-if="item.subcategoria && item.articulo_seleccionado">
                          {{ item.articulo_seleccionado.serial || 'N/A' }}
                        </template> 
                  </td>
                  <td> 
                    <template v-if="item.subcategoria && item.articulo_seleccionado ">
                      <template v-if=" item.subcategoria.tipo_cantidad == 'unidad'"> 1 </template>
                      <template v-if=" item.subcategoria.tipo_cantidad =='lote'"> 
                        {{  item.cantidad_disponible  }}
                      </template>
                    </template>
                  
                  </td>
                  <!--<td class="col">
                   
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
                

                  </td>-->
                  <td>
                    <template v-if="item.subcategoria && item.articulo_seleccionado ">
                      <template v-if=" item.subcategoria.tipo_cantidad == 'unidad'"> 1 </template>
                      
                      <template v-else >
                        <template v-if=" item.subcategoria.tipo_cantidad =='lote' "> 
                            <b-form-input 
                                          v-model.trim.number="item.cantidad" 
                                          type="text"
                                          :state="!$v.articulos.$each[index].cantidad.$error"
                                          style="width:80px">
                              </b-form-input>
                              <b-form-invalid-feedback v-if="!$v.articulos.$each[index].cantidad.required">Requerido</b-form-invalid-feedback>
                              <b-form-invalid-feedback v-if="!$v.articulos.$each[index].cantidad.numeric">Debe ser Numérico</b-form-invalid-feedback>
                              <b-form-invalid-feedback v-if="!$v.articulos.$each[index].cantidad.minValue">Debe ser Mayor que 0</b-form-invalid-feedback>
                              <b-form-invalid-feedback v-if="!$v.articulos.$each[index].cantidad.isvalidCantidad">Insuficiente</b-form-invalid-feedback>
                              
                              <template v-if="errors['articulo.'+index+'.cantidad']">
                              <div class="is-invalid" v-for=" (item_error,item_error_index) in errors['articulo.'+index+'.cantidad']" :key="item_error_index">
                                {{ errors['articulo.'+index+'.cantidad'][item_error_index] }}
                              </div>
                              </template>
                              
                              
                        </template>  
                        <template v-else> 1 </template>
                      </template>
                      
                     </template>
                  </td>
                  <td> 
                    <b-form-input v-model.trim.number="item.ticket" type="text" style="width:80px"></b-form-input>
                    <div class="is-invalid" v-if="!$v.articulos.$each[index].ticket.numeric">Debe ser Numérico </div>
                  </td>
                  <td>
                    <b-form-textarea v-model="item.descripcion" style="width:180px"></b-form-textarea>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="10"> <button class="btn btn-info" @click="addRow()">Agregar Fila </button></td>
                </tr>
              </tfoot>
            </table>

            
            <div class="row" style="margin-top: 10px;">
              
              <div class="col-5"></div>
              <div class="col-5">
              <strong>Destino </strong>
             
                <v-select
                        v-if="ubicaciones_destino"
                        v-model.trim="tipo_ubicacion_destino"
                        :options="ubicaciones"
                        class="select"
                        :getOptionLabel="item => item.tipo "
                        />
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-5"></div>
              <div class="col-5">
                <v-select
                          v-if="ubicacionByTipo"
                          v-model.trim="ubicacion_destino"
                          :options="ubicacionByTipo"
                          class="select"
                          :getOptionLabel="item => item.nombre"
                          />
                </div>
            </div>
            
            <template v-if="$v.ubicacion_destino.$error && $v.ubicacion_destino.$dirty">
              <div class="is-invalid" v-if="!$v.ubicacion_destino.required" style="text-align: center;"> El Destino es Requerido</div>
            </template>

            <div class="row" style="margin-top: 20px;">
              <div class="col-12" style="text-align: center;">
                  <button class="btn btn-primary">Crear Traslado</button>
              </div> 
            </div>
           

          </form>

         
           
            <div style="text-align: center;">
              <div v-if="message">
                      {{ message }}
              </div> 

              <!--<div v-if="errors && Object.keys(errors).length > 0">
                <ul>
                  <li v-for="(error, field) in errors" :key="field">
                    {{ error[0] }} 
                  </li>
                </ul>
              </div> 
              -->
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
                cantidad_disponible: null,
                cantidad_real      : null,
                articulos_disponibles: null,
                articulo_seleccionado:null,
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
            ubicacion_destino   : null,
            ubicacionByTipo     : null,
            tipo_ubicacion_destino: null,
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
      tipo_ubicacion_destino( value , old){
         if( value ){
          this.ubicacionByTipo = value.ubicacion;
         }
      }
    },
    validations() {
      return {
        ubicacion_destino:{
          required
        },
    
        articulos: {
          $each: {
            cantidad:{ 
              required:requiredIf(function ( item ) {
                  return ( item.cantidad_disponible > 1 )
              }),
              numeric,
              minValue: minValue(1),
              isvalidCantidad(currItem, itemArr) {
               return ( itemArr.cantidad_disponible >= itemArr.cantidad )
              }
            },
            ticket:{
              numeric
            }
          }
        }  
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

        this.articulos = [];

        for(let i=0; i<=4; i++ ){
          this.articulos.push( {...this.articulo} );
        }
      },
       addRow(){
        this.articulos.push( {...this.articulo } );
      },

      async selectTipoUbicacion( index, item ){
        
         this.articulos[index].articulos_disponibles = null
         this.articulos[index].articulo_seleccionado = null
         //this.articulos[index].subcategoria          = null
         this.articulos[index].ubicacion             = null
        
         this.ubicacionesByTipo[index] = item.tipo_ubicacion.ubicacion;
      },

      async selectUbicacion( index, item ){
        
        this.ubicacionesByTipo[index] = item.tipo_ubicacion.ubicacion;
        await this.getKardexArticulosDisponibles( index, item )
     },
      
      async selectSubcategoria( index, item ){
         
        await this.getKardexArticulosDisponibles( index, item )
      },

      async getKardexArticulosDisponibles( index, item ){
        
        this.articulos[index].articulos_disponibles = null
        this.articulos[index].articulo_seleccionado = null
        
        let subcategoria = ( item.subcategoria) ? item.subcategoria.id : null
        let ubicacion    = ( item.tipo_ubicacion.ubicacion[0] ) ? item.tipo_ubicacion.ubicacion[0].id : null;
      
        //this.$v.$touch();

        if( subcategoria && ubicacion ){
      
          try {
                const { data: resp }  = await ApiPublic.get('/kardex-articulos-disponibles?subcategoria='+subcategoria+'&ubicacion='+ubicacion);
                if( resp.length > 0){
                  
                  const newResp = resp.filter(({ id }) => 
                      !this.articulos.some( articulo => { 
                        
                          if( articulo.articulo_seleccionado ){
                            /*if( articulo.articulo_seleccionado.kardex_ubicacion[0].cantidad > 1 ){
                              return;
                            }else{*/
                              return ((articulo.articulo_seleccionado)?articulo.articulo_seleccionado.id : null) == id
                            //}
                          } 
                        }));

                       this.articulos[index].articulos_disponibles = newResp;
                }
              } 
          catch ( error ){
                this.message = error.response.data.message
                this.errors  = error.response.data.errors
            }
         }
      },

      getDetalleArticulo( item ){
      
        if( item ){
          let marca =  item.marcas.nombre
          if( !item.serial ){
            for( const element  of item.kardex_ubicacion ){
                if( element.cantidad > 0 ){
                    return 'Cantidad :' +element.cantidad +' | Marca:' +marca
                }
            }
          }
          else{
            return 'Serial: '+item.serial+' | Marca:' +marca
          }
        }
      },

      SelectionArticulo( index, item ){
        if( item.articulo_seleccionado ){
         
         const buscarElemento = this.articulos.find( (element,indice )  => {
               if( element.articulo_seleccionado ){
                 return ( element.articulo_seleccionado.id === item.articulo_seleccionado.id && indice !== index )
                } 
         });

         if( buscarElemento ){
           
          //if( buscarElemento.articulo_seleccionado.kardex_ubicacion[0].cantidad == 1 ){
              
                this.articulos[index].articulo_seleccionado = null
                console.log('el articulo ya ha sido seleccionado');
                this.showErrorAlert( 'El articulo ya ha sido seleccionado ');
            /*}
            else{
              this.articulos[index].cantidad_disponible   = buscarElemento.articulo_seleccionado.kardex_ubicacion[0].cantidad
              this.articulos[index].cantidad_real         = buscarElemento.articulo_seleccionado.kardex_ubicacion[0].cantidad
            }*/
         }else{
          this.$v.$touch();
          this.articulos[index].cantidad_disponible =  item.articulo_seleccionado.kardex_ubicacion[0].cantidad
          if( this.articulos[index].subcategoria.tipo_cantidad === 'unidad'){
              this.articulos[index].cantidad = 1
              this.articulos[index].cantidad_disponible =  1

          }
          //this.articulos[index].cantidad_real       =  item.articulo_seleccionado.kardex_ubicacion[0].cantidad
         }
        }
      },

      /*validarCantidad( index, item ){
        let acumulado = 0;
        this.$v.$touch();
        this.articulos.map( (element,indice)  => {
              //console.log(element); 
              
              if( element.articulo_seleccionado ){
                
                if ( element.articulo_seleccionado.id === item.articulo_seleccionado.id && indice !== index ){
                      
                      if( element.cantidad && element.cantidad >=1 ){
                         acumulado+= element.cantidad ;
                      }
                }

                if ( element.articulo_seleccionado.id === item.articulo_seleccionado.id ){

                  if( element.cantidad === '' || !element.cantidad  ){
                    //this.articulos[index].cantidad_disponible = Number( acumulado  )
                  }
                  else{
                    acumulado+= Number( element.cantidad );
                  }
                }
              }
        
         });

         this.articulos.map( (element,indice)  => {
              if( element.articulo_seleccionado ){
                
                if ( element.articulo_seleccionado.id === item.articulo_seleccionado.id && indice !== index ){
                      element.cantidad_disponible-= Number( acumulado )   
                }
              }
      });
         
         
         console.log(acumulado,this.articulos[index].cantidad_disponible);
         this.articulos[index].cantidad_disponible-= Number( acumulado )   
         //console.log(a);   

      },*/

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


            let paramsArticulo = [];
            this.articulos.filter( articulo => { 
                      
                    let { articulo_seleccionado,cantidad,ticket,ubicacion,descripcion } = articulo;
                    if( articulo_seleccionado && cantidad >=1 ) 
                    { 
                        paramsArticulo.push(
                          {
                            articulo_id     : articulo_seleccionado.id,
                            cantidad ,
                            //id_subcategoria : articulo_seleccionado.subcategoria_articulos_id,
                            ubicacion_origen: ubicacion.id,
                            ticket ,        
                            descripcion ,  
                            estado:1, 
                          }
                        )
                        return true;
                    }
            });

            if( !paramsArticulo || paramsArticulo.length === 0){
                this.showErrorAlert('Debe diligenciar por lo menos un articulo a trasladar');
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
                         articulo: paramsArticulo,
                         ubicacion_destino: this.ubicacion_destino.id,
                         


                        /*descripcion        : this.articulo.descripcion,
                        ubicacion_destino  : this.articulo.ubicacion_destino,
                        estado             : this.articulo.estado,
                        articulo_id        : this.id,
                        ubicacion_origen   : this.kardeUbicacionById.data.ubicacion.id,
                        usuario_id         : 1,
                        cantidad           : ( this.kardeUbicacionById.data.cantidad > 1 )? this.articulo.cantidad : 1,
                        ticket             : this.articulo.ticket,*/
                      });
                    
                    const { message }     = resp;
                    this.message  = message;

                   // this.kardeUbicacionById.data.cantidad -= this.articulo.cantidad
                    this.limpiarCampos()
                    this.sucessForm = true
                    this.showAlert() 
                  
                } catch ( error ){

                 
                  this.errors  = error.response.data.errors
                  if( this.errors ){
                    this.message = "Error Al validar los datos enviados"
                    this.showErrorAlert( this.message );
                  }
                  else{
                    this.showErrorAlert( this.error.response );
                  }
                  console.log( this.message);
                  console.log(this.errors );
                 
                  
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
            this.articulosInicial();
            //this.ubicacion_destino =
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
