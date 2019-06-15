<template>
    <div id="app-layout">
        <navigation/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Navigation from '../components/global/Navigation';
    export default {
        name: "Layout",
        components:{
            Navigation
        },
        created() {
            this.$store.dispatch('loadCafes');
            this.$store.dispatch('loadUser');
            this.$store.dispatch('loadBrewMethods');
        }
    }
</script>

<style scoped>

</style>
