import {
    getUser
} from '../service/fetchData'

import {
    GET_USERINFO
} from './mutation-types'

export default {
    async getUserInfo({
        commit,
        state
    }) {
        let respon = await getUser();
        commit(GET_USERINFO, respon);
    }
}