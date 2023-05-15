<template>
      <div class="d-flex justify-content-center">
          <div class="spinner-border text-secundary" 
               :style="{ width: width, height: height}" 
               role="status">
              <span class="sr-only">Cargando...</span>
          </div>
     </div>
</template>

<script>


export default {

    props:{
        /*color:{
            type   : String,
            default: 'text-secundary'
        },
        align:{
            type   : String,
            default: 'center'
        },*/
        width:{
            type    : String,
            default : '3rem'
        },
        height:{
            type    : String,
            default : '3rem'
        }
    }

}
</script>