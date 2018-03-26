<template>
    <gmap-map
            style       = "width: 500px; height: 300px; margin: 0 auto"
            map-type-id = "terrain"

            :center = "center"
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

        <gmap-info-window class="togo-map-info-input"
                :options  = "info.options"
                :position = "info.windowPos"
                :opened   = "info.winOpen"

                @closeclick = "info.winOpen = false"
        >

            <div class="togo-map-info-cont">
                <input class="togo-map-info-input" v-model="info.content"
                       :disabled="getCurrentMarker().isSaved"
                       @keyup="changePlaceName"
                >
                <button v-if="!getCurrentMarker().isSaved" class="togo-map-info-btn" @click="save">Save</button>
            </div>

        </gmap-info-window>
    </gmap-map>
</template>

<script>

    let geocoder;

    export default {
        name: 'togo-map',
        methods: {
            addMarkerAndInfoBlock(e) {
                this.searchLocation( e, results => {

                    let name = results[ 0 ].formatted_address;

                    this.addMarker( e, marker => {
                        let markers     = this.markers;
                        let idx         = markers.length - 1;
                        marker.infoText = name;
                        this.toggleInfoWindow( marker, idx );
                    } );
                } );
            },

            addMarker(e, callback) {
                let markers = this.markers;

                let lat      = e.latLng.lat(), lng = e.latLng.lng();
                let position = { lat, lng };
                let infoText = `Place ${markers.length}`;

                let marker = { position, infoText, visited: false, isSaved: false, id: Date.now() };

                markers.push( marker );
                this.$emit( 'marker-created', marker );
                callback( marker );
            },
            searchLocation( e, success ) {
                let lat = e.latLng.lat(),
                    lng = e.latLng.lng();

                let latlng = { lat, lng };
                geocoder.geocode( { location: latlng }, (results, status) => {
                    if (status === 'OK') {
                        success( results );
                    }
                });
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
                let marker = this.getCurrentMarker();
                this.$emit( 'save', marker );
            },
            getCurrentMarker() {
                return this.markers[ this.currentMidx ] || {};
            }

        },
        props: [
            'places',
            'center'
        ],
        data () {

            return {
                markers: this.places,
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
        },
        created() {
            setTimeout( () => {
                geocoder = new google.maps.Geocoder;
            }, 500 );
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



    .togo-map-info-cont{
        box-sizing: border-box;
        color:#fff;
        .togo-map-info-input{
            outline: none;
            border: 0;
            height: 36px;
            background-color: #ccc;
            color: #2b2b2b;
            padding: 0 10px;

        }
        .togo-map-info-btn{
            background-color: #333;
            border: 1px solid #145e82;
            outline: none;
            cursor: pointer;
            height: 36px;
            min-width: 70px;
            margin-left: 2px;
            border-radius: 2px;
            color: #fff;
            &:active {
                background: #333 - 100;
            }
        }
    }
</style>
