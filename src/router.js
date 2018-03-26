import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Togo from './views/togo-list.vue'
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
            component: Home
        },{
            path: '/:place-name',
            name: 'map',
            component: Home
        },{
            path: '/togo',
            name: 'togo',
            component: Togo
        }
    ]
} )
