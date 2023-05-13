<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        REGISTRO DE SUBCATEGORIA
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">SubCategorias</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Registrar SubCategoria
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
                <label>Categoria</label>
                <select  class="form-control" v-model="subcategoria.categorias">
                    <option 
                     v-for="item in categorias" :key="item.id"
                    :value="item.id">
                      {{ item.nombre }}
                    </option>
                </select>
                <div class="is-invalid" v-if="errors.categoria">{{ errors.categoria[0] }}</div>
              </div>
              
              <div class="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Nombre"
                  v-model="subcategoria.nombre"
                />
                <div class="is-invalid" v-if="errors.nombre">{{ errors.nombre[0] }}</div>
              </div>

              <div class="form-group">
                <label>Descripción</label>
                <textarea class="form-control" 
                          placeholder="Ingrese la descripcion"
                          v-model="subcategoria.descripcion"></textarea>
                <div class="is-invalid" v-if="errors.descripcion"> {{ errors.descripcion[0] }}</div>
              </div>

              <div class="form-group">
                <label>Tipo de Cantidad</label>
                <select class="form-control" v-model="subcategoria.tipo_cantidad">
                  <option disabled value="">Seleccione un elemento</option>
                  <option value="lote">Lote</option>
                  <option value="unidad">Unidad</option>
                </select>
                <div class="is-invalid" v-if="errors.tipo_cantidad">{{ errors.tipo_cantidad[0] }}</div>
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
  name: "CrearMarca",

  data() {
        return {
          subcategoria :{
                nombre        : null,
                descripcion   : null,
                tipo_cantidad : null,
                categorias    : null
            },
            categorias:  null,
            message   : null,
            errors    : {}
        }
    },
    mounted(){
      this.listarCategorias();
    },

    methods: {

        async registrar () {

            let nombre        = this.subcategoria.nombre;
            let descripcion   = this.subcategoria.descripcion;
            let tipo_cantidad = this.subcategoria.tipo_cantidad;
            let categoria     = this.subcategoria.categorias;

            this.message = ''
            this.error   = {}
            
            try {
                
                const { data: resp }  = await ApiPublic.post('/subcategoria-articulos',{ nombre, descripcion,tipo_cantidad, categoria  });
                const { message }     = resp;
                this.message  = message;

                this.limpiarCampos()
               
            } catch ( error ){

               this.message = error.response.data.message
               this.errors  = error.response.data.errors
              console.log( this.errors.nombre[0]);
            }
        },
        limpiarCampos(){
            this.subcategoria = {
                nombre        : null,
                descripcion   : null,
                tipo_cantidad : null,
                categorias    : null
            }
            this.errors = {}
        },

        async listarCategorias(){
          try {
                const { data: resp }  = await ApiPublic.get('/categoria-articulos/?paginate=false');
                this.categorias = resp;
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
