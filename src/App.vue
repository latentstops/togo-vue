<template>
    <div class="togo-app" id="app">
        <nav id="nav">
            <router-link class="togo-nav-item" to="/">Home</router-link>
            <router-link class="togo-nav-item" to="/togo">Togo List</router-link>
        </nav>
        <router-view/>
    </div>
</template>

<style lang="scss" scoped>

    .togo-app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #fff;
        background: #2b2b2b;
        overflow: hidden;
        height: 100vh;
        a {
            text-decoration: none;
            color: inherit;
        }
        nav {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2px;
            overflow: hidden;
            padding: 30px 0;
            .togo-nav-item {
                width: 100px;
                text-align: center;
                height: 36px;
                line-height: 36px;
                background-color: #333;
                color: #999;
                border-radius: 3px 0 0 3px;
                transition: all 0.2s;
                margin: 0 1px;
                &:hover{
                    background-color: #1f4d63;
                    color:#fff;
                }
                &:last-child{
                    border-radius: 0 3px 3px 0;
                }
                &.router-link-exact-active {
                    background-color: #1f4d63;
                    color:#fff;
                }

            }
        }
    }


</style>
