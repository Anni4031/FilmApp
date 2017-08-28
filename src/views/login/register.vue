<template>
	<div>
		
		<h1>欢迎加入酷电影</h1>
		
		<div class="box">
			<mt-field placeholder="邮箱" type="email" v-model="reg.email" ></mt-field>
			<mt-field placeholder="密码(最少6位)"  type="password"  v-model="reg.password"></mt-field>
		    

			<mt-field placeholder="昵称" v-model="reg.username" ></mt-field><br>
			<input type="checkbox" @click="change" v-model="checked">已阅读并同意用户使用协议
		</div>
		
		<mt-button type="primary" class="btn" :disabled="status" @click="regClick">注册</mt-button><br>

	</div>
</template>

<script>
import store from '../../store/index'
	export default {
		name:'register',
		data(){
			return {
				reg:{
					email:"",
					password:"",
					username:""
				},
				user:store.state.user.userInfo,
				checked:false,
				status:true		
			}
		},
		methods:{
			change(){
				if(this.checked){
					this.status=false;
					console.log("改变成功")
				}
				else{
					this.status=true
				}
			},
			regClick(){
				let mye=this.reg.email;
				let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				let strpw=this.reg.password;
				if (strpw == null || strpw.length < 6  || strpw.length > 18 ) {
					this.$toast({
					    message: '密码不能为空或不小于6位或不能大于18位!',
					    position: 'bottom',
					    duration: 2000,
					    className:"errtoast"				
					});
				    return false;
				}else if(!myreg.test(mye)){
					this.$toast({
					    message: '请输入有效的E_mail!',
					    position: 'bottom',
					    duration: 1000,
					    className:"errtoast"				
					});
					
	                return false;	    	
			    }else{
			    	// 校验邮箱或昵称已存在
			    	let  par = JSON.parse(JSON.stringify(this.reg)) ;
			    	let earr=[];
			    	let narr=[];
			    	for(let i=0;i<this.user.length;i++){
			    		earr.push(this.user[i].email)
			    		narr.push(this.user[i].username)
			    	}
			    	if(earr.indexOf(par.email)==-1 && narr.indexOf(par.username)==-1){
		    			this.user.push(par)
		    			console.log(this.user)
			    	    console.log('注册成功即将跳转--------')  
			    	    this.$toast({
						    message: '注册成功!',
						    position: 'bottom',
						    duration: 1000,
						    className:"suctoast"
						});
						this.$router.push({ path: '/login' }) 

			    	}else{
			    		this.$toast({
			    		    message: '该邮箱或该昵称已存在!',
			    		    position: 'bottom',
			    		    duration: 1000,
			    		    className:"errtoast"				
			    		});
			    		console.log(par)
			    	}
			    }
			}
		}
	}
</script>

<style scoped>
	h1{
		font-size: 2rem;
		color: #26A2FF;
	}
	.btn{
		width: 85%;
		margin: 10px auto;
	}
	.box{
		padding: 5%;
	}
	.input{
		float: left;
		padding-left: 4%;
		font-size: 1.2rem;
	}
	.mint-field-core{
		font-size: 1.2rem;
	}
	.errtoast{
		background: red;
	}
	.suctoast{
		background: #26A2FF;

	}
</style>