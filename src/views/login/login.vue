<template>
	<div>
		<!-- <button @click="a">an</button> -->
		<h1>欢迎来到酷电影</h1>
		<div class="box">
			<mt-field placeholder="邮箱" type="email" v-model="loginuser.email"></mt-field>
			<mt-field  placeholder="密码" type="password" v-model="loginuser.password"></mt-field><br>
			<mt-button type="primary" class="btn" @click="loginClick">登录</mt-button><br><br>
			
			<router-link to="/register" class="success">新用户注册</router-link> | <router-link to="/forgetpw" class="hui">忘记密码</router-link>
		</div>
	</div>
</template>

<script>
import store from '../../store/index'
	export default {
		name:'login',
		data(){
			return {
				loginuser:{
					email:"",
					password:"",
				},
				user:store.state.user.userInfo,
				captcha:"",

			}
		},
		methods:{
			loginClick(){
				let  par = JSON.parse(JSON.stringify(this.loginuser)) ;
				let earr=[];
			    let parr=[];
			    let username;
		    	for(let i=0;i<this.user.length;i++){
		    		earr.push(this.user[i].email)
		    		parr.push(this.user[i].password)
		    		if(par.email==this.user[i].email){
		    			username=this.user[i].username
		    		}
		    	}
				if(earr.indexOf(par.email)==-1 || parr.indexOf(par.password)==-1){
					this.$toast({
					    message: '邮箱或密码错误!',
					    position: 'bottom',
					    duration: 2000,
					    className:"errtoast"				
					});
				}else{
					par.name=username;
					store.dispatch('setUser',par); 
					console.log('登录成功即将跳转--------')
		    	    this.$toast({
					    message: '登录成功!',
					    position: 'bottom',
					    duration: 1000,
					    className:"suctoast"
					});
					this.$indicator.open({
					  text: '加载中...',
					  spinnerType: 'fading-circle'
					});
					setTimeout(() => {
					  this.$indicator.close();
					  this.$router.push({ path: '/index/received' }) 
					}, 2000);
					
				}
			}
			
		}
	}
</script>

<style scoped>
	h1{
		font-size: 2rem;
		color: #26A2FF;
		padding-top: 20px;
	}
	.btn{
		width: 80%;
		margin: 10px auto;
	}
	.box{
		padding: 5%;
	}
	.success{
		color: #26A2FF;
		text-decoration: none;
	}
	.hui{
		color: gray;
		text-decoration: none;

	}
	.errtoast{
		background: red;
	}
	.suctoast{
		background: #26A2FF;

	}
</style>