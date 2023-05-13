

export default {

    name: 'categorias',
    //component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
          path: 'registrar',
          name: 'registrar-categoria',
          component: () => import(/* webpackChunkName: registrar-categoria */ '@/modules/categorias/views/CrearCategoria.vue')
        },
        {
          path: 'listar',
          name: 'listar-categoria',
          component: () => import(/* webpackChunkName: listar-categoria */ '@/modules/categorias/views/ListarCategoria.vue')
        },
        
      ]

}