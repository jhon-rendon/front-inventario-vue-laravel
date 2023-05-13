

export default {

    name: 'subcategorias',
    //component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
          path: 'registrar',
          name: 'registrar-subcategoria',
          component: () => import(/* webpackChunkName: registrar-subcategoria */ '@/modules/subcategorias/views/CrearSubCategoria.vue')
        },
        {
          path: 'listar',
          name: 'listar-subcategoria',
          component: () => import(/* webpackChunkName: listar-subcategoria */ '@/modules/subcategorias/views/ListarSubCategoria.vue')
        },
        
      ]

}