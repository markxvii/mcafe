<template>
    <span class="toggle-like">
        <span class="like-toggle like" v-on:click="likeCafe( cafe.id )"
              v-if="!liked && cafeLoadStatus === 2 && cafeLikeActionStatus !== 1 && cafeUnlikeActionStatus !== 1">
            喜欢
        </span>
        <span class="like-toggle un-like" v-on:click="unlikeCafe( cafe.id )"
              v-if="liked && cafeLoadStatus === 2 && cafeLikeActionStatus !== 1 && cafeUnlikeActionStatus !== 1">
    取消喜欢
        </span>
    </span>
</template>

<script>
    export default {
        name: "ToggleLike",
        computed: {
            cafeLoadStatus() {
                return this.$store.getters.getCafeLoadStatus;
            },
            cafe() {
                return this.$store.getters.getCafe;
            },


            liked() {
                return this.$store.getters.getCafeLikedStatus;
            },
            cafeLikeActionStatus() {
                return this.$store.getters.getCafeLikeActionStatus;
            },
            cafeUnlikeActionStatus() {
                return this.$store.getters.getCafeUnlikeActionStatus;
            }
        },
        methods: {
            likeCafe(cafeID) {
                this.$store.dispatch('likeCafe', {
                    id: this.cafe.id
                });
            },
            unlikeCafe(cafeID) {
                this.$store.dispatch('unlikeCafe', {
                    id: this.cafe.id
                });
            }
        },
        watch: {
            cafeLikeActionStatus(val) {
                if (val === 1) {
                    this.$Spin.show();
                } else if (val === 2) {
                    this.$Spin.hide();
                }
            },

            cafeUnlikeActionStatus(val) {
                if (val === 1) {
                    this.$Spin.show();
                } else if (val === 2) {
                    this.$Spin.hide();
                }
            },
        }

    }
</script>

<style lang="scss" scoped>
    @import '../../../sass/abstracts/_variables.scss';

    span.toggle-like {
        display: block;
        text-align: center;
        margin-top: 30px;

        span.like-toggle {
            display: inline-block;
            font-weight: bold;
            text-decoration: underline;
            font-size: 20px;
            cursor: pointer;

            &.like {
                color: $dark-success;
            }

            &.un-like {
                color: $dark-failure;
            }
        }
    }
</style>
