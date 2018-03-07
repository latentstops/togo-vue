<template>
    <gmap-map
            style       = "width: 500px; height: 300px; margin: 0 auto"
            map-type-id = "terrain"

            :center = "{lat:10, lng:10}"
            :zoom   = "7"

            @click = "addMarkerAndInfoBlock"
    >
        <gmap-marker
                v-for = "(m, index) in markers"

                :key       = "index"
                :position  = "m.position"
                :clickable = "true"
                :draggable = "false"

                @click = "toggleInfoWindow(m,index)"
        >

        </gmap-marker>

        <gmap-info-window
                :options  = "info.options"
                :position = "info.windowPos"
                :opened   = "info.winOpen"

                @closeclick = "info.winOpen = false"
        >

            <input v-model="info.content"
                   @keyup="changePlaceName"
            >
            <button @click="save">Save</button>

        </gmap-info-window>
    </gmap-map>
</template>

<script>
    export default {
        name: 'GoogleMap',
        methods: {
            addMarkerAndInfoBlock(e) {
                let marker  = this.addMarker( e );
                let markers = this.markers;
                let idx     = markers.length - 1;
                this.toggleInfoWindow( marker, idx );
            },
            addMarker(e) {
                let markers = this.markers;

                let lat      = e.latLng.lat(), lng = e.latLng.lng();
                let position = { lat, lng };
                let infoText = `Place ${markers.length}`;

                let marker = { position, infoText };

                markers.push( marker );

                return marker;
            },
            toggleInfoWindow: function(marker, idx) {

                this.info.windowPos = marker.position;
                this.info.content = marker.infoText;

                if (this.currentMidx == idx) {
                    this.info.winOpen = !this.info.winOpen;
                }

                else {
                    this.info.winOpen = true;
                    this.currentMidx = idx;

                }
                this.index = idx;
            },
            changePlaceName( e ) {
                let marker = this.markers[ this.index ];
                    marker.infoText = this.info.content;
            },
            save() {
                let markersAsJSONString = JSON.stringify( this.markers );
                localStorage.setItem( 'markers', markersAsJSONString );
            }
        },
        data () {

            let markers = ( () => {
                let json = [];
                try{
                    json = JSON.parse( localStorage.getItem( 'markers' ) ) || [];
                } catch ( e ) {}
                return json;
            })();
            return {
                markers,

                center: {lat: 10.0, lng: 10.0},
                currentMidx: null,
                index: null,

                info: {
                    options: {
                        pixelOffset: {
                            width: -1.5,
                            height: -25
                        }
                    },
                    winOpen: false,
                    content: '',
                    windowPos: {
                        lat: 0,
                        lng: 0
                    },
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    $primary-color: #3ba9f3;
    $secondary-color: $primary-color - 100;

    h3 {
        margin: 40px 0 0;
        color: $secondary-color;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: $primary-color;
    }

</style>
