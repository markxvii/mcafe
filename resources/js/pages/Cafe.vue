<template>
    <div id="cafe" class="page">
        <Row>
            <Col :lg="24" :md="24">
                <div class="cafe-page" v-show="cafeLoadStatus===2">
                    <h2>{{cafe.name}}</h2>
                    <h3 v-if="cafe.name!==''">{{cafe.name}}</h3>
                </div>
            </Col>
        </Row>
        <Row>
            <Col :lg="24" :md="24">
                <toggle-like/>
                <div class="tags-container">
                    <span class="tag" v-for="tag in cafe.tags">#{{ tag.name }}</span>
                </div>
                <span class="address">
                    {{cafe.address}}<br>
                    {{cafe.city}},{{cafe.state}}<br>
                    {{cafe.zip}}
                </span>
                <a class="website" :href="cafe.website" target="_blank">{{ cafe.website }}</a>
                <div class="brew-methods-container">
                    <div class="brew" v-for="(brew,index) of cafe.brew_methods" :key="index">
                        {{brew.method}}
                    </div>
                </div>
                <br>
                <individual-cafe-map></individual-cafe-map>
            </Col>
        </Row>
    </div>
</template>

<script>
    import IndividualCafeMap from '../components/cafes/IndividualCafeMap.vue';
    import ToggleLike from '../components/cafes/ToggleLike.vue';

    export default {
        name: "Cafe",
        components: {
            IndividualCafeMap,
            ToggleLike
        },
        // 页面创建时通过路由中的参数ID加载咖啡店数据
        created() {
            this.$store.dispatch('loadCafe', {
                id: this.$route.params.id
            });
        },
        computed: {
            cafeLoadStatus() {
                return this.$store.getters.getCafeLoadStatus;
            },

            cafe() {
                return this.$store.getters.getCafe;
            }
        },
        watch: {
            cafeLoadStatus(val, oldVal) {
                if (val === 2) {
                    this.$Spin.hide();
                }
            }
        },
        mounted() {
            this.$Spin.show();
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../sass/abstracts/_variables';

    #cafe {
        h2 {
            text-align: center;
            color: $primary-color;
            font-family: 'Josefin Sans', sans-serif;
        }

        h3 {
            text-align: center;
            color: $secondary-color;
            font-family: 'Josefin Sans', sans-serif;
        }

        span.address {
            text-align: center;
            display: block;
            font-family: 'Lato', sans-serif;
            color: #A0A0A0;
            font-size: 20px;
            line-height: 30px;
            margin-top: 50px;
        }

        a.website {
            text-align: center;
            color: $dull-color;
            font-size: 30px;
            font-weight: bold;
            margin-top: 50px;
            display: block;
            font-family: 'Josefin Sans', sans-serif;
        }

        div.brew-methods-container {
            max-width: 700px;
            margin: auto;
        }
    }

    div.tags-container {
        max-width: 700px;
        margin: auto;
        text-align: center;
        margin-top: 30px;

        span.tag {
            color: $dark-color;
            font-family: 'Josefin Sans', sans-serif;
            margin-right: 20px;
            display: inline-block;
            line-height: 20px;
        }
    }
</style>
