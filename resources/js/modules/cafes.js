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
    }
}

