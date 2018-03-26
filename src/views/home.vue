<template>
    <div class="togo-map-cont">
        <togo-map :places="filteredPlaces" :center="currentGeoLocationCoords" @save="onMarkerCreated"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import TogoMap from '@/components/togo-map.vue'
    import store from '../store';

    export default {
        name: 'home',
        components: {
            TogoMap
        },
        data() {
            return  {
                ...store.state.map
            }
        },
        methods: {
            filterVisitedPlaces() {
                let filteredPlaces = this.places.filter( place => place.visited );

                this.emptyFilteredPlaces();
                this.setArrNewItems( this.filteredPlaces, filteredPlaces );
            },

            setArrNewItems( arr, newArr ) {
                this.setAllInArray( arr, {} );
                newArr.forEach( ( item, index ) => {
                    this.$set( arr, index, item );
                } );
            },

            emptyFilteredPlaces() {
                this.setAllInArray( this.filteredPlaces, {} );
            },

            onMarkerCreated( marker ) {
                marker.isSaved = true;
                this.places.push( marker );
            },

            updateGeoLocation() {
                if( this.isCenterSet() ) return;
                this.getCurrentGeoLocation(
                    this.onGeoLocationSuccess.bind( this ),
                    this.onGeoLocationError.bind( this )
                );
            },
            onGeoLocationSuccess( pos ) {
                this.initGeoLocation( pos );
                this.initCurrentLocationIfNotSet();
            },
            onGeoLocationError( err ) {
                console.warn( err );
            },


            initCurrentLocationIfNotSet() {
                let newLocation = this.geoLocation;
                let coords = newLocation.coords;

                if( this.isCenterSet() ) return;

                this.initCurrentLocation( {
                    lat: coords.latitude,
                    lng: coords.longitude
                } );
            },
            initCurrentLocation( newLocation ) {
                this.$set( this.currentGeoLocationCoords, 'lat', newLocation.lat );
                this.$set( this.currentGeoLocationCoords, 'lng', newLocation.lng );
            },
            initGeoLocation( location ) {
                this.$set( this.geoLocation.coords, 'longitude', location.coords.longitude );
                this.$set( this.geoLocation.coords, 'latitude',  location.coords.latitude  );
            },

            isCenterSet() {
                let center = this.currentGeoLocationCoords;
                return center.lat || center.lng;
            },

            saveToLocalStorage(  ) {
                let markersAsJSONString = JSON.stringify( this.places );
                localStorage.setItem( 'markers', markersAsJSONString );
            },

            /* Extended Functionality */
            setAllInArray( arr, instance ) {
                arr.forEach( ( _, index ) => {
                    this.$set( this.filteredPlaces, index, instance);
                } );
            },

            /* Core Functionality */
            getCurrentGeoLocation( success, error, options ) {
                let defaultOptions = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                options = Object.assign( defaultOptions, options );

                navigator.geolocation.getCurrentPosition( success, error, options );
            },

        },
        created() {
            this.updateGeoLocation();
            this.filterVisitedPlaces();
        }
    };

</script>

<style lang="scss" scoped>
    .togo-map-cont{
        overflow-y: auto;
        height: calc((100vh) - 96px);
        -webkit-box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.2);
        box-shadow: inset 0px 3px 2px 0px rgba(0, 0, 0, 0.2);
        padding-top: 30px;
    }
</style>
