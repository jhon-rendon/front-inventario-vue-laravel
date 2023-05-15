

export default {

    name: 'ubicacion',
    //component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
          path: 'registrar',
          name: 'registrar-ubicacion',
          component: () => import(/* webpackChunkName: registrar-ubicacion */ '@/modules/ubicacion/views/CrearUbicacion.vue')
        },
        {
          path: 'listar',
          name: 'listar-ubicacion',
          component: () => import(/* webpackChunkName: listar-ubicacion */ '@/modules/ubicacion/views/ListarUbicacion.vue')
        },
        
      ]

}