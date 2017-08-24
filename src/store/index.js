import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import search from './modules/searchval'
import loginuser from './modules/loginuser'
import want from './modules/want'
import wantbtn from './modules/wantbtn'
import starcollect from './modules/starcollect'

import getters from './getters';



// import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
    	user,search,loginuser,want,wantbtn,starcollect
    },
    getters
})

export default store;