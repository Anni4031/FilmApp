<template>
	<div>
		<back></back>
		<br>
		<h1>找回密码</h1>
		<div class="box">
			<mt-field placeholder="邮箱" type="email" v-model="email"></mt-field>
			<mt-field  placeholder="重设密码" type="password" v-model="password"></mt-field><br>
		</div>
	</div>
</template>

<script>
import Back from './layout/back'
	export default {
		name:'forgetpw',
		components:{
			back:Back
		},
		data(){
			return {
				email:"",
				password:"",
				username:"",
				checked:false,
				status:'disabled'		
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	h1{
		font-size: 2rem;
		color: #26A2FF;
	}
	.btn{
		width: 80%;
		margin: 10px auto;
	}
	
</style>