<template>
    <div class="togo-map-cont">
        <togo-map :places="filteredPlaces" :editable="false" :center="currentGeoLocationCoords" ></togo-map>
    </div>

</template>

<script>

    import TogoMap from '@/components/togo-map';
    import store from '../store';

    export default {
        components: {
            TogoMap
        },
        data() {
            return {
                ...store.state.map,
            }
        },
        created() {
            let { markerID } = this.$route.params;
            let marker = this.places.find( place =>
                place.id == markerID
            );
            if(! marker) return this.$router.push('/');
            this.filteredPlaces = [ marker ];
        }

    }

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