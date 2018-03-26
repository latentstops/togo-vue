import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex );

let markersInLocalStorage = localStorage.getItem( 'markers' );
let places = JSON.parse( markersInLocalStorage ) || [];

export default new Vuex.Store( {
    state: {
        map: {
            places,
            geoLocation: { coords: { latitude: 0, longitude: 0 } },
            currentGeoLocationCoords: { lat: 0, lng: 0 },
            filteredPlaces: [],
            hasCoords: false
        },
        togo: {
            places
        }
    },
    mutations: {},
    actions: {}
} )
