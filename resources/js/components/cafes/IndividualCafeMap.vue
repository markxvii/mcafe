<template>
    <div id="individual-cafe-map">

    </div>
</template>

<script>
    import {ROAST_CONFIG} from "../../config";

    export default {
        name: "IndividualCafeMap",
        computed: {
            cafeLoadStatus() {
                return this.$store.getters.getCafeLoadStatus;
            },

            cafe() {
                return this.$store.getters.getCafe;
            }
        },
        watch:{
            cafeLoadStatus() {
                //一旦渲染完成立即执行函数
                if (this.cafeLoadStatus === 2) {
                    this.displayIndividualCafeMap();
                }
            }
        },
        methods:{
            displayIndividualCafeMap() {
                this.map = new AMap.Map('individual-cafe-map', {
                    center: [parseFloat(this.cafe.latitude), parseFloat(this.cafe.longitude)],
                    zoom: 13
                });
                var image = ROAST_CONFIG.APP_URL + '/storage/img/coffee-marker.png';
                var icon = new AMap.Icon({
                    image,
                    imageSize: new AMap.Size(19, 33)
                });

                var marker = new AMap.Marker({
                    position: new AMap.LngLat(parseFloat(this.cafe.latitude), parseFloat(this.cafe.longitude)),
                    icon: icon
                });

                this.map.add(marker);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../sass/abstracts/_variables';

    div#individual-cafe-map {
        width: 700px;
        height: 500px;
        margin: auto;
        margin-bottom: 200px;
    }
</style>
