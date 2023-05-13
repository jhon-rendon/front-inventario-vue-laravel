

export default {

    name: 'marcas',
    //component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path: 'registrar',
            name: 'registrar-marca',
            component: () => import(/* webpackChunkName: "marcas-registrar-marca" */ '@/modules/marcas/views/CrearMarca.vue'),
        },
        {
            path: 'listar',
            name: 'listar-marca',
            component: () => import(/* webpackChunkName: "marcas-listar-marca" */ '@/modules/marcas/views/ListarMarcas.vue')
          }
        /*{
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunkName: "daybook-no-entry" */ //'@/modules/daybook/views/EntryView.vue'),
            /*props: ( route ) => {
                return {
                    id: route.params.id
                }
            }
        }*/
    ]

}
