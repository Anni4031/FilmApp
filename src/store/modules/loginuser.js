const loginuser = {
  state: {
    // user:null,
    user:{name:"13123",email:"1@qq.com",password:'123456'}
  },
  mutations: {
      SET_USER: (state, newUser) => {
        state.user=newUser;
        console.log('登录用户为:',state.user)
      },
    },
    actions: {
      setUser({ dispatch,commit, state},newUser){
        console.log('登录用户数据入参：',newUser)
        commit('SET_USER',newUser)
      }
    } 
};

export default loginuser;