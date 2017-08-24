/*
* @Author: admin
* @Date:   2017-08-23 11:19:23
* @Last Modified by:   admin
* @Last Modified time: 2017-08-24 14:20:01
*/
const want = {
  state: {
    wantInfo:[
     
    ]
  },
  mutations: {
      SET_WANTINFO: (state, newWantInfo) => {
        
        state.wantInfo.push(newWantInfo) ;
        console.log('想看数据为:',state.wantInfo)
      },
    },
    actions: {
      setWantInfo({ dispatch,commit, state},newWantInfo){
        console.log('想看数据入参：',newWantInfo)
        commit('SET_WANTINFO',newWantInfo)
      }
    } 
};

export default want;