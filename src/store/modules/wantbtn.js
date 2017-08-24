/*
* @Author: admin
* @Date:   2017-08-23 15:38:39
* @Last Modified by:   admin
* @Last Modified time: 2017-08-23 15:40:28
*/
const wantbtn = {
  state: {
    wantbtnInfo:[
     
    ]
  },
  mutations: {
      SET_WANTBTNINFO: (state, newWantbtnInfo) => {
        
          state.wantbtnInfo=newWantbtnInfo ;
        
        console.log('已想看数据为:',state.wantbtnInfo)
      },
    },
    actions: {
      setWantbtnInfo({ dispatch,commit, state},newWantbtnInfo){
        console.log('已想看数据入参：',newWantbtnInfo)
        commit('SET_WANTBTNINFO',newWantbtnInfo)
      }
    } 
};

export default wantbtn;