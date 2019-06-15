<template>
    <div id="cafes">
        <Row>
            <Col :lg="18" :md="18">
                <cafe-map/>
            </Col>
        </Row>
    </div>
</template>

<script>
    import CafeMap from '../components/cafes/CafeMap'
    export default {
        name: "Cafes",
        components:{
            CafeMap
        },
    }
</script>

<style scoped>

</style>
