<template>
    <div id="cafe-filter">
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div class="large-6 medium-6 small-12 cell">
                    <label>搜索</label>
                    <input type="text" v-model="textSearch" placeholder="搜索"/>
                </div>
                <div class="is-roaster-container">
                    <input type="checkbox" v-model="isRoaster"/> <label>是否是烘焙店?</label>
                </div>
                <div class="brew-methods-container">
                    <div class="filter-brew-method" v-on:click="toggleBrewMethodFilter( method.method )"
                         v-bind:class="{'active' : brewMethods.indexOf( method.method ) > -1 }"
                         v-for="method in cafeBrewMethods">
                        {{ method.method }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CafeFilter",

        data() {
            return {
                textSearch: '',
                isRoaster: false,
                brewMethods: []
            }
        },
        computed: {
            cafeBrewMethods() {
                return this.$store.getters.getBrewMethods;
            },
        }
    }
</script>

<style scoped>

</style>
