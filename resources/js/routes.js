import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home.vue'
import Cafes from './pages/Cafes.vue'
import NewCafe from './pages/NewCafe.vue'
import Cafe from './pages/Cafe.vue'
import Layout from './pages/Layout'

/**
 * Extends Vue to use Vue Router
 */
Vue.use(VueRouter);

/**
 * Makes a new VueRouter that we will use to run all of the routes for the app.
 */
export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Vue.component( 'Home', require( './pages/Layout.vue' ).default ),
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: Vue.component( 'Home', require( './pages/Home.vue' ).default )
                },
                {
                    path: 'cafes',
                    name: 'cafes',
                    component: Vue.component( 'Cafes', require( './pages/Cafes.vue' ).default ),
                },
                {
                    path: 'cafes/new',
                    name: 'newcafe',
                    component: Vue.component( 'NewCafe', require( './pages/NewCafe.vue' ).default )
                },
                {
                    path: 'cafes/:id',
                    name: 'cafe',
                    component: Vue.component( 'Cafe', require( './pages/Cafe.vue' ).default )
                }
            ]
        }
    ]
});
