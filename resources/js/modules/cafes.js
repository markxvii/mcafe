import CafeAPI from '../api/cafe.js';

export const cafes = {
    state: {
        //status定义数据加载状态，
        //status = 0 -> 数据尚未加载
        // status = 1 -> 数据开始加载
        // status = 2 -> 数据加载成功
        // status = 3 -> 数据加载失败
        cafes: [],
        cafesLoadStatus: 0,

        cafe: {},
        cafeLoadStatus: 0,

        cafeAddStatus: 0,

        cafeLikeActionStatus: 0,
        cafeUnlikeActionStatus: 0,
        cafeLiked: false
    },
    actions: {
        //此为加载所有cafe
        loadCafes({commit}) {
            commit('setCafesLoadStatus', 1);//开始加载
            CafeAPI.getCafes()
                .then((res) => {
                    commit('setCafes', res.data);
                    commit('setCafesLoadStatus', 2);
                })
                .catch(() => {
                    commit('setCafes', []);
                    commit('setCafesLoadStatus', 3);
                })
        },
        //此为按照id加载单个cafe
        loadCafe({commit}, data) {
            commit('setCafeLikedStatus', false);
            commit('setCafeLoadStatus', 1);
            CafeAPI.getCafe(data.id)
                .then((res) => {
                    commit('setCafe', res.data);
                    if (res.data.user_like.length > 0) {
                        commit('setCafeLikedStatus',true)
                    }
                    commit('setCafeLoadStatus', 2);
                })
                .catch(() => {
                    commit('setCafe', {});
                    commit('setCafeLoadStatus', 3);
                })
        },

        //添加新的咖啡店
        addCafe({commit, state, dispatch}, data) {
            commit('setCafeAddStatus', 1);
            CafeAPI.postAddNewCafe(data.name, data.address, data.city, data.state, data.zip, data.website, data.description, data.roaster, data.brewMethods,data.tags)
                .then((res) => {
                    commit('setCafeAddStatus', 2);
                    dispatch('loadCafes');//重新加载咖啡列表
                })
                .catch((data) => {
                    console.log(data)
                    commit('setCafeAddStatus', 3);
                })
        },


        //喜欢/取消喜欢咖啡店
        likeCafe({commit, state}, data) {
            commit('setCafeLikeActionStatus', 1);

            CafeAPI.postLikeCafe(data.id)
                .then(function (response) {
                    commit('setCafeLikedStatus', true);
                    commit('setCafeLikeActionStatus', 2);
                })
                .catch(function () {
                    commit('setCafeLikeActionStatus', 3);
                });
        },

        unlikeCafe({commit, state}, data) {
            commit('setCafeUnlikeActionStatus', 1);

            CafeAPI.deleteLikeCafe(data.id)
                .then(function (response) {
                    commit('setCafeLikedStatus', false);
                    commit('setCafeUnlikeActionStatus', 2);
                })
                .catch(function () {
                    commit('setCafeUnlikeActionStatus', 3);
                });
        }
    },
    mutations: {
        //单个cafe
        setCafesLoadStatus(state, status) {
            state.cafesLoadStatus = status;
        },

        //多个cafe
        setCafes(state, cafes) {
            state.cafes = cafes;
        },

        //多个cafe
        setCafeLoadStatus(state, status) {
            state.cafeLoadStatus = status;
        },

        //单个cafe
        setCafe(state, cafe) {
            state.cafe = cafe;
        },

        setCafeAddStatus(state, status) {
            state.cafeAddStatus = status;
        },

        //喜欢/取消喜欢咖啡店
        setCafeLikedStatus(state, status) {
            state.cafeLiked = status;
        },

        setCafeLikeActionStatus(state, status) {
            state.cafeLikeActionStatus = status;
        },

        setCafeUnlikeActionStatus(state, status) {
            state.cafeUnlikeActionStatus = status;
        }
    },
    getters: {
        getCafesLoadStatus(state) {
            return state.cafesLoadStatus;
        },

        getCafes(state) {
            return state.cafes;
        },

        getCafeLoadStatus(state) {
            return state.cafeLoadStatus;
        },

        getCafe(state) {
            return state.cafe;
        },

        getCafeAddStatus(state) {
            return state.cafeAddStatus;
        },

        //喜欢/取消喜欢咖啡店
        getCafeLikedStatus(state) {
            return state.cafeLiked;
        },

        getCafeLikeActionStatus(state) {
            return state.cafeLikeActionStatus;
        },

        getCafeUnlikeActionStatus(state) {
            return state.cafeUnlikeActionStatus;
        }
    }
}

