

export default {

    name: 'tipoUbicacion',
    //component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
          path: 'registrar',
          name: 'registrar-tipo-ubicacion',
          component: () => import(/* webpackChunkName: registrar-tipo-ubicacion */ '@/modules/tipoUbicacion/views/CrearTipoUbicacion.vue')
        },
        {
          path: 'listar',
          name: 'listar-tipo-ubicacion',
          component: () => import(/* webpackChunkName: listar-tipo-ubicacion */ '@/modules/tipoUbicacion/views/ListarTipoUbicacion.vue')
        },
        
      ]

}