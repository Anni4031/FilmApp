// import permission_default from 'src/global/permission_default'

const getters = {
  	userIn: state => {
		      	return state.user.userInfo
	}, //用户所有信息
	searchIn: state => {
		      	return state.seach.searchval
	}, //搜索
	userloginIn: state => {
		      	return state.loginuser.user
	}, //用户所有信息
	wantIn: state => {
		      	return state.want.wantInfo
	}, //想看信息
    wantbtnIn: state => {
		      	return state.wantbtn.wantbtnInfo
	}, //已想看信息
	starcollectIn: state => {
		      	return state.starcollect.collectInfo
	}, //已收藏信息
};
export default getters
