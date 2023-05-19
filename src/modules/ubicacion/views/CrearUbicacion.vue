<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        REGISTRO DE UBICACIÓN
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">Ubicaciones</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Registrar Ubicación
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
                <label>Tipo de Ubicación</label>
                <select  class="form-control" v-model="ubicacion.tipoUbicacion">
                    <option 
                     v-for="item in tipoUbicacion" :key="item.id"
                    :value="item.id">
                      {{ item.tipo }}
                    </option>
                </select>
                <div class="is-invalid" v-if="errors.tipo_ubicacion_id">{{ errors.tipo_ubicacion_id[0] }}</div>
              </div>
              
              <div class="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Nombre"
                  v-model="ubicacion.nombre"
                />
                <div class="is-invalid" v-if="errors.nombre">{{ errors.nombre[0] }}</div>
              </div>

              <div class="form-group">
                <label>Codigo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Codigo"
                  v-model="ubicacion.codigo"
                />
                <div class="is-invalid" v-if="errors.codigo">{{ errors.codigo[0] }}</div>
              </div>

              <div class="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese la Dirección"
                  v-model="ubicacion.direccion"
                />
                <div class="is-invalid" v-if="errors.direccion">{{ errors.direccion[0] }}</div>
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
  name: "Crearubicacion",

  data() {
        return {
           ubicacion :{
                nombre        : null,
                codigo        : null,
                direccion     : null,
                tipoUbicacion : null
            },
            tipoUbicacion :  null,
            message       : null,
            errors        : {}
        }
    },
    mounted(){
      this.listarTipoUbicacion();
    },

    methods: {

        async registrar () {

            let nombre            = this.ubicacion.nombre;
            let codigo            = this.ubicacion.codigo;
            let direccion         = this.ubicacion.direccion;
            let tipo_ubicacion_id = this.ubicacion.tipoUbicacion;

            this.message = ''
            this.error   = {}
            
            try {
                
                const { data: resp }  = await ApiPublic.post('/ubicacion',{ nombre, codigo, direccion, tipo_ubicacion_id  });
                const { message }     = resp;
                this.message  = message;

                this.limpiarCampos()
               
            } catch ( error ){

               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }
        },
        limpiarCampos(){
            this.ubicacion = {
                nombre        : null,
                codigo        : null,
                direccion     : null,
                tipoUbicacion : null
            }
            this.errors = {}
        },

        async listarTipoUbicacion(){
          try {
                const { data: resp }  = await ApiPublic.get('/tipo-ubicacion/?paginate=false');
                this.tipoUbicacion = resp;
            } catch ( error ){
               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }
          
        }
       
    }
};
</script>

<style setup>
.is-invalid{
    color:brown
}

select{
  width: 300px !important;
}

</style>
