import Vue from 'vue'

export default {
    SET_ACTIVE_TYPE: (state, {type}) => {
        state.activeType = type
    },

    SET_LIST: (state, {type, data}) => {
        state.lists[type] = data
    },

    ADD_TYPE_RANK_INDEX: (state, {type, index}) => {
        state.rankIndex[type].push(index);
    },
    DEL_TYPE_RANK_INDEX: (state, {type}) => {
        state.rankIndex[type].pop();
    },
    INIT_TYPE_RANK_INDEX: (state, {type}) => {
        // 初始化为一个控对象, 表示此时是最新的一组
        state.rankIndex[type] = [null];
    }
}
