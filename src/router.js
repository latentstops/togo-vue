import Vue from 'vue'
import Router from 'vue-router'
import Map from './views/Map.vue'
import Togo from './views/Togo.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use( VueGoogleMaps, {
    load: {
        key: 'AIzaSyA_nUMjymPsqY9uA65pHaIPGJ2Elln5blg',
        libraries: 'places',
    }
} );

Vue.use( Router );

export default new Router( {
    routes: [
        {
            path: '/',
            name: 'map',
            component: Map
        },
        {
            path: '/togo',
            name: 'togo',
            component: Togo
        }
    ]
} )
