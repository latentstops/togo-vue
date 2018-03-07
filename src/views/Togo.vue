<template>

    <ul>
        <li v-for="marker in markers">
            <router-link to="/">{{marker.infoText}}</router-link>
        </li>
    </ul>

</template>

<script>
    export default {
        data() {
            let markers = ( () => {
                let json = [];
                try{
                    json = JSON.parse( localStorage.getItem( 'markers' ) ) || [];
                } catch ( e ) {}
                return json;
            })();

            return {
                markers,
                count: 0
            }
        },
        methods: {
            increment () {
                this.count++
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        margin: 0 auto;
        padding: 0;
        list-style-type: none;
    }
</style>