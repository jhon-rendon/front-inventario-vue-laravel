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
                <select  class="form-control" v-model="articulos.marca">
                    <option 
                     v-for="item in marcas" :key="item.id"
                    :value="item.id">
                      {{ item.nombre }}
                    </option>
                </select>
                <div class="is-invalid" v-if="errors.marca">{{ errors.marca[0] }}</div>
              </div>

              <div class="form-group">
                <label>Categoria - Subcategoria</label>
                <select  class="form-control" 
                         v-model="articulos.subcategoria" 
                         @change="selectedCategoria( $event )"
                         >
                    <option 
                     v-for="item in subcategoria" :key="item.id"
                     :data-tipocantidad=" item.tipo_cantidad"
                    :value="item.id">
                       {{  item.categoria.nombre }} - {{ item.nombre }} 
                    </option>
                </select>
                <div class="is-invalid" v-if="errors.subcategoria">{{ errors.subcategoria[0] }}</div>
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
                  v-model="articulos.modelo"
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
                  v-model="articulos.activo"
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
                  v-model="articulos.cantidad"
                />
                <div class="is-invalid" v-if="errors.cantidad">{{ errors.cantidad[0] }}</div>
              </div>

            </template>
             
            <div class="form-group">
                <label>Ubicación Destino </label>
                <select  class="form-control" 
                         v-model="articulos.ubicacion_destino" 
                         >
                    <option 
                     v-for="item in ubicaciones" :key="item.id"
                    :value="item.id">
                       {{  ( item.codigo )? 'Codigo: '+item.codigo+' | ' : '' }}   
                       {{ 'Tipo: '+item.tipo_ubicacion.tipo }} 
                       {{ '| Ubicación: '+item.nombre }}
                    </option>
                </select>
                <div class="is-invalid" v-if="errors.ubicacion_destino">{{ errors.ubicacion_destino[0] }}</div>
            </div>

            
            <div class="form-group">
                <label>Estado Articulo </label>
                <select  class="form-control" 
                         v-model="articulos.estado" 
                         >
                    <option 
                     v-for="item in estados" :key="item.nombre"
                    :value="item.id">
                       {{ item.nombre }}   
                    </option>
                </select>
                <div class="is-invalid" v-if="errors.estado">{{ errors.estado[0] }}</div>
            </div>

            
            <div class="form-group">
                <label>Ticket</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Ticket"
                  v-model="articulos.ticket"
                />
                <div class="is-invalid" v-if="errors.ticket">{{ errors.ticket[0] }}</div>
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
        }
    },
     mounted(){
      this.listarMarcas();
      this.listarSubcategorias();
      this.listarUbicaciones();
    },

    methods: {

      selectedCategoria( e ){
        this.tipoCantidad = e.target.selectedOptions[0].dataset.tipocantidad ;
      },
      
      async registrar () {

            this.message = ''
            this.error   = {}
            
            try {
                  const { data: resp }  = await ApiPublic.post('/kardex-articulos',
                  { 
                    marca              : this.articulos.marca,
                    subcategoria       : this.articulos.subcategoria,
                    descripcion        : this.articulos.descripcion,
                    ubicacion_destino  : this.articulos.ubicacion_destino,
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

                this.limpiarCampos()
               
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
select{
  width: 300px !important;
}

</style>
