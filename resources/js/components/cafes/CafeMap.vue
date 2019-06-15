<template>
    <div id="cafe-map"></div>
</template>

<script>
    import {ROAST_CONFIG} from "../../config";

    export default {
        props: {
            'latitude': {  //经度
                type: Number,
                default: () => {
                    return 120.21
                }
            },
            'longitude':{
                type:Number,
                default:()=>{
                    return 30.29
                }
            },
            'zoom':{ //缩放级别
                type:Number,
                default:()=>{
                    return 4
                }
            }
        },
        data() {
            return {
                markers:[],
                infoWindows:[]
            }
        },

        computed:{
            cafes() {
                return this.$store.getters.getCafes;
            }
        },

        methods:{
            //为所有咖啡店创建点标记
            buildMarkers() {
                this.markers = [];

                //自定义点标记图标
                var image=ROAST_CONFIG.APP_URL+'/storage/img/coffee-marker.png';
                var icon =new AMap.Icon({
                    image,
                    imageSize:new AMap.Size(19,33) //设置图标尺寸
                });

                for (let i in this.cafes) {
                    // 通过高德地图 API 为每个咖啡店创建点标记并设置经纬度
                    var marker=new AMap.Marker({
                        position:new AMap.LngLat(parseFloat(this.cafes[i].latitude),parseFloat(this.cafes[i].longitude)),
                        title:this.cafes[i].name,
                        icon,
                        map:this.map
                    });

                    //为每个咖啡店创建信息窗体
                    var infoWindow=new AMap.InfoWindow({
                        content:this.cafes[i].name
                    });
                    this.infoWindows.push(infoWindow);

                    //绑定点击事件到点标记对象，点击打开上面创建的信息窗体
                    marker.on('click', function () {
                        infoWindow.open(this.getMap(),this.getPosition())
                    });

                    this.markers.push(marker);
                }
                //将创建的所有标记显示到地图上
                this.map.add(this.markers);
            },

            clearMarkers() {
                //遍历所有点标记并将其设置为null从而从地图上将其清除
                for (item of this.markers) {
                    item.setMap(null);
                }
            }

        },

        mounted() {
            this.map=new AMap.Map('cafe-map',{
                center:[this.latitude,this.longitude],
                zoom:this.zoom
            })

            this.clearMarkers();
            this.buildMarkers();
        },

        watch:{
            cafes() {
                this.clearMarkers();
                this.buildMarkers();
            }
        }

    };
</script>

<style lang="scss" scoped>
    div#cafe-map{
        width:100%;
        height:400px;
    }
</style>
