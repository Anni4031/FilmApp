const write = {
  state: {
    writeInfo:[
     
    ]
  },
  mutations: {
      SET_WRITEINFO: (state, newWriteInfo) => {
        
        state.writeInfo.push(newWriteInfo) ;
        
        console.log('写影评数据为:',state.writeInfo)
      },
    },
    actions: {
      setWriteInfo({ dispatch,commit, state},newWriteInfo){
        console.log('写影评数据入参：',newWriteInfo)
        commit('SET_WRITEINFO',newWriteInfo)
      }
    } 
};

export default write;