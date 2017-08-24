/*
* @Author: admin
* @Date:   2017-08-24 10:14:57
* @Last Modified by:   admin
* @Last Modified time: 2017-08-24 11:11:14
*/
const starcollect = {
  state: {
    collectInfo:[
     
    ]
  },
  mutations: {
      SET_COLLECTINFO: (state, newCollectInfo) => {
        state.collectInfo.push(newCollectInfo);
        console.log('收藏数据为:',state.collectInfo)
      },
    },
    actions: {
      setCollectInfo({ dispatch,commit, state},newCollectInfo){
        console.log('收藏数据入参：',newCollectInfo)
        commit('SET_COLLECTINFO',newCollectInfo)
      }
    } 
};

export default starcollect;