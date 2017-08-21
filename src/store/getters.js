// import permission_default from 'src/global/permission_default'

const getters = {
  	userIn: state => {
		      	return state.user.userInfo
	}, //用户所有信息
	searchIn: state => {
		      	return state.seach.searchval
	}, //搜索
    
};
export default getters
