<template>
  <div>
      	<T :title="title"></T>
      	<div class="middle">
			<div @click="check">
      			<mt-cell title="检查版本">
				</mt-cell>
      		</div>
			<div @click="showquestion">
      			<mt-cell title="常见问题"  is-link >
				</mt-cell>
      		</div>
			<div v-show="question" class="about">
				<h4>如何查看电影榜单?</h4>
				<p>在底部导航栏的找片栏里的tab1榜单</p>

				<h4>如何收藏影人?</h4>
				<p>在进入某个影星的详情页面时,有一个收藏按钮,点击收藏即可。再点击可取消收藏。</p>

			</div>


      		<div @click="showabout">
      			<mt-cell title="关于" is-link >
				</mt-cell>
      		</div>
			
			<div v-show="isShow" class="about">
				<p>酷电影提供最新的电影介绍及评论包括上映影片的影讯查询及购票服务。你可以记录想看、在看和看过的电影电视剧,顺便打分、写影评。根据你的口味,酷电影会推荐好...</p>
			</div>
      		<div class="btn1" v-if="user!=null"><mt-button type="danger" size="large" @click="edit()">退出登录</mt-button></div>
      	</div>
  </div>
</template>

<script>
import star from '../star/star'
import Title from '../layout/header_title'
import { api } from '../../global/api'
import store from '../../store/index'
  export default {
    components: {
      star:star,
      T:Title
    },
    data () {
      	return {
      		title:"设置",
      		user:store.state.loginuser.user,
      		isShow:false,
      		question:false,
      	}
    },
    
    mounted: function () {
      
    },
    methods: {
    	edit(){
    		this.$messagebox.confirm('确定退出登录?').then(action => {
  				this.user=null;
  				store.dispatch('setUser',this.user); 
  				this.$router.push('/index/my')
			});	
    	},
    	showabout(){
    		if(this.isShow==false){
    			this.isShow=true
    		}else{
    			this.isShow=false
    		}
    	},
    	check(){
			this.$messagebox({
			  title: '提示',
			  message: '该版本为最新版!',
			  showCancelButton: false
			});
    	},
    	showquestion(){
    		if(this.question==false){
    			this.question=true
    		}else{
    			this.question=false
    		}
    	}
    }
}
</script>

<style scoped>
	.middle{
		width: 100%;
		text-align: left;
		background: #eaeaea;
		padding-bottom: 100%;
		padding-top: 5%;	
	}
	.btn1{
		margin-top: 10%;
	}
	.mint-cell{
		border: 1px solid #eaeaea;
	}
	.about{
		background: #fff;
		border: 1px solid #eaeaea;
		padding-left: 2%;
	}
</style>