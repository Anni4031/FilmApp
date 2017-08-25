/*
* @Author: admin
* @Date:   2017-08-25 15:51:03
* @Last Modified by:   admin
* @Last Modified time: 2017-08-25 15:52:48
*/
const watched = {
  state: {
    watchedInfo:[
     
    ]
  },
  mutations: {
      SET_WATCHEDINFO: (state, newWatchedInfo) => {
        
        state.watchedInfo.push(newWatchedInfo) ;
        
        console.log('看过数据为:',state.watchedInfo)
      },
    },
    actions: {
      setWatchedInfo({ dispatch,commit, state},newWatchedInfo){
        console.log('看过数据入参：',newWatchedInfo)
        commit('SET_WATCHEDINFO',newWatchedInfo)
      }
    } 
};

export default watched;