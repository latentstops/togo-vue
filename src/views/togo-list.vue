<template>
    <div class="togo-cont">

        <input type="text"
               class="search"
               v-model="filterCondition"
               placeholder="Search for places"
               autofocus
        >

        <div class="togo-list-cont" >
            <div class="togo-list-item" v-for="( marker, i) of filteredMarkers()">

                <div class="togo-list-item-name">
                    <input type="text" autofocus v-if="isEditable(marker)" @keyup.enter="edit(null)" v-model="marker.infoText">
                    <router-link v-else :to="'/' + marker.id">{{marker.infoText}}</router-link>
                </div>

                <div class="togo-list-item-controls">
                    <button class="todo-btn togo-list-item-remove" @click="remove(marker)">x</button>

                    <button class="todo-btn togo-list-item-end"  v-if="isEditable(marker)" @click="edit(null)">save</button>
                    <button class="todo-btn togo-list-item-edit" v-else @click="edit(marker)">edit</button>

                    <div class="togo-checkbox">
                        <input :id="'togo-visited-flag' + i" class="togo-list-item-visited" type="checkbox" v-model="marker.visited">
                        <label :for="'togo-visited-flag' + i" ></label>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import store from '../store';

    export default {
        data() {
            return {
                markers: store.state.map.places,
                currentEditableIndex: null,
                filterCondition: ''
            }
        },
        methods: {
            filteredMarkers() {
                if( this.currentEditableIndex !== null ) return this.markers.map( item => item );
                return this.markers.filter( item =>
                    !!~item.infoText
                        .toLocaleLowerCase()
                        .search( this.filterCondition.toLocaleLowerCase() )
                )
            },
            remove( marker ) {
                let index = this.findIndex( marker );
                this.markers.splice( index, 1 );
            },
            edit( marker ) {
                let index = this.findIndex( marker );
                this.currentEditableIndex = index >= 0 ? index : null;
            },
            isEditable( marker ) {
                let index = this.findIndex( marker );
                return index === this.currentEditableIndex;
            },
            findIndex( marker ) {
                return this.markers.indexOf( marker );
            }
        }
    }
</script>

<style lang="scss" scoped>

    %ellipsis{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }



    $width: 400px;
    $padding: 5px;
    $margin: 8px;
    $green: #42b983;
    $border-radius: 5px;

    .togo-list-cont {
        margin: 20px auto;
        list-style-type: none;
        max-width: 100%;
        width: $width;


        .togo-list-item {
            padding: 5px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #145e82;
            background-color: #333;
            border-radius: $border-radius;
            margin: $margin 0;

            .togo-list-item-name{
                flex-grow: 1;
                min-width: 1px;
                *{
                  width: 100%;
                  display: block;
                }
                a {
                    text-decoration: none;
                    color: #dfdfdf;
                    font-weight: bold;
                    @extend %ellipsis;
                    padding-right: 10px;
                    text-align: left;

                }
                input[type=text] {
                    border: none;
                    border-bottom: 1px solid;
                    &:focus {
                        outline: none;
                    }
                }
            }




        }

        .togo-list-item-controls{
            display: flex;
            align-items: center;
            width: 120px;
            flex-shrink: 0;
            .todo-btn{
                height: 30px;
                border-radius: 3px;
                outline: 0;
                border:0;
                margin: 0 2px;
                min-width: 40px;
                color: #fff;
                cursor: pointer;
                transition: background-color 0.2s;
                &:hover{
                    background-color: #404040;
                }
                background-color: #333;
                &.togo-list-item-remove{
                    border: 1px solid #145e82;
                    background-color: #5a2424;
                }
                &.togo-list-item-edit{
                    border: 1px solid #145e82;
                    background-color: #1f4d63;
                }
                &.togo-list-item-end{
                    border: 1px solid #145e82;
                    background-color: #1f634d;
                }

            }


        }

        .togo-checkbox{
            position: relative;
            width: 20px;
            height: 20px;
            input{
                display: none;
                &:checked + label:after{
                        content: '';
                        position: absolute;
                        left: 5px;
                        top: 10px;
                        width: 2px;
                        height: 2px;
                        -webkit-box-shadow: 2px 0 0 #145e82, 4px 0 0 #145e82, 4px -2px 0 #145e82, 4px -4px 0 #145e82, 4px -6px 0 #145e82, 4px -8px 0 #145e82;
                        box-shadow: 2px 0 0 #145e82, 4px 0 0 #145e82, 4px -2px 0 #145e82, 4px -4px 0 #145e82, 4px -6px 0 #145e82, 4px -8px 0 #145e82;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                }
            }
            label{
                position: absolute;
                cursor: pointer;
                &:hover{
                    &:before{
                        background: #454545;
                    }

                }

                &:before{
                    content: '';
                    display: inline-block;
                    vertical-align: text-top;
                    width: 20px;
                    height: 20px;
                    background: #333;
                    border:1px solid #145e82;
                    border-radius: 3px;
                    transition: background-color 0.2s;

                }
            }

        }
    }

    .togo-cont{
        overflow-y: auto;
        height: calc((100vh) - 96px);
        -webkit-box-shadow: inset 0px 3px 2px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: inset 0px 3px 2px 0px rgba(0,0,0,0.2);
        box-shadow: inset 0px 3px 2px 0px rgba(0,0,0,0.2);
        padding-top: 30px;
        input[type=text]{
            border:0;
            outline: 0;
            height: 36px;
            background: #333;
            color:#fff;
            padding: 0 20px;

        }

    }

    .search {
        padding: $padding;
        width: 400px;
        border-radius: $border-radius;
        &:focus {
            outline: none;
        }
    }

</style>