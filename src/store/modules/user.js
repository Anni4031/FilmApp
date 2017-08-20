
const user = {
  state: {
    userInfo:[
     
    ]
  },

  mutations: {
      SET_USERINFO: (state, newUserInfo) => {
        state.userInfo.push (newUserInfo[0]) ;
        console.log('用户信息为:',state.userInfo)
      },
    },
    //Action 通过 store.dispatch 方法触发
    actions: {
      //newUserInfo为自己的传参
      setUserInfo({ dispatch,commit, state},newUserInfo){
        console.log('用户数据入参：',newUserInfo)
        commit('SET_USERINFO',newUserInfo)
      }
    } 
};

export default user;
