import {
    fetchIdsByType
} from '../api'

export default {
    // ensure data for rendering given list type
    FETCH_LIST_DATA: ({commit, dispatch, state}, {type, index, action}) => {
        commit('SET_ACTIVE_TYPE', {type});
        // commit(action === 'next' ? 'ADD_TYPE_RANK_INDEX' : 'DEL_TYPE_RANK_INDEX', {type, index});
        return fetchIdsByType(type, index)
            .then(data => {
                switch (action) {
                    case 'next': {
                        commit('ADD_TYPE_RANK_INDEX', {type, index});
                        break;
                    }
                    case 'prev': {
                        commit('DEL_TYPE_RANK_INDEX', {type});
                        break;
                    }
                    default: {
                        commit('INIT_TYPE_RANK_INDEX', {type});
                    }
                }
                commit('SET_LIST', {type, data})

            })
    }
}
