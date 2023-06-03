

export default {

    name: 'articulos',
    //component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
          path: 'registrar',
          name: 'registrar-articulo',
          component: () => import(/* webpackChunkName: registrar-articulo */ '@/modules/articulos/views/CrearArticulo.vue')
        },
        {
          path: 'listar',
          name: 'listar-articulo',
          component: () => import(/* webpackChunkName: listar-articulo */ '@/modules/articulos/views/ListarArticulo.vue')
        },

        {
          path: 'traslados/:id/:idUbicacion',
          name: 'traslado-articulo',
          component: () => import(/* webpackChunkName: listar-articulo */ '@/modules/articulos/views/TrasladoArticulo.vue'),
          /*props: ( route ) => {
              const id = Number( route.params.id );
              
              return  id;
              //return Number( route.params.id)
          }*/
          props: route => (
            { id: Number( route.params.id) ,
              idUbicacion: Number( route.params.idUbicacion) 
            }
            )
        },

        {
          path: 'ubicacion/listar',
          name: 'listar-articulos-ubicacion',
          component: () => import(/* webpackChunkName: listar-articulo */ '@/modules/articulos/views/ArticuloUbicacion.vue')
        },

        {
          path: 'traslados/listar',
          name: 'listar-traslados',
          component: () => import(/* webpackChunkName: listar-articulo */ '@/modules/articulos/views/ListarTraslados.vue')
        },

        {
          path: 'traslados/crear',
          name: 'crear-traslado',
          component: () => import(/* webpackChunkName: listar-articulo */ '@/modules/articulos/views/CrearTraslado.vue')
        },
        
      ]

}