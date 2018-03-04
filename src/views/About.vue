<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p>{{count}}</p>
        <button v-on:click="increment">+</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
