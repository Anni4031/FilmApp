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
	starcollectIn: state => {
		      	return state.starcollect.collectInfo
	}, //已收藏信息
	writecommentIn: state => {
		      	return state.write.writeInfo
	}, //写影评信息
	watchedIn: state => {
		      	return state.watched.watchedInfo
	}, //看过信息
};
export default getters
