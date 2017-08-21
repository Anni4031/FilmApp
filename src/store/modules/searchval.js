/*
* @Author: admin
* @Date:   2017-08-21 10:26:54
* @Last Modified by:   admin
* @Last Modified time: 2017-08-21 10:32:13
*/
const search = {
  state: {
    searchval:{}
  },

  mutations: {
      SET_Searchval: (state, newSearchval) => {
        state.searchval=newSearchval;
        console.log('搜索内容为:',state.searchval)
      },
    },
    actions: {
      
      setSearchval({ dispatch,commit, state},newSearchval){
        console.log('搜索数据入参：',newSearchval)
        commit('SET_Searchval',newSearchval)
      }
    } 
};

export default search;
