import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import search from './modules/searchval'
import loginuser from './modules/loginuser'
import want from './modules/want'
import starcollect from './modules/starcollect'
import write from './modules/writecomment'
import watched from './modules/watched'

import getters from './getters';



// import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
    	user,search,loginuser,want,starcollect,write,watched
    },
    getters
})

export default store;