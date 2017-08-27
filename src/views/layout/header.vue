<template>
	<div class="v-header">
        
        
		<div @click="to"  class="v-header-input">
			<mt-search  v-model="value"  cancel-text="取消"  placeholder=" 影片 / 类型 / 明星、导演"></mt-search>
		</div> 

		<div class="v-header-btn">
			<router-link to="/login"><span>登录</span></router-link> | <router-link to="/register"><span>注册</span></router-link>
        </div>
		
    </div>
	
</template>

<script>
	export default {
		name:'header',
		data(){
			return {
				value:''
			}
		},
		methods:{
			to(){
				this.$router.push({path:"/searchpage"})
			}
		}
	}
</script>

<style>
	.v-header {
	  display: flex;
	  height: 30%;
	  box-sizing: border-box;
	  background: #df2d2d;
	}
	.v-header-btn {
	  width: 30%;
	  color: #FFF;
	  padding-top: 3%;
	}
	.v-header-btn span{
		font-size: 1.0rem;
		text-decoration: none;
		color: #fff;
	}
	a{ text-decoration:none} 
	.v-header-input {
	  flex: 1;
	  line-height: 100%;
	  height: 30%;
	}

	.mint-search{
		height: 5%;
	}
	.mint-searchbar{
		background-color: #df2d2d; 
	}
	.mint-searchbar{
		padding: 2% 2%;
	}
	.mint-searchbar-inner .mintui-search{
		margin-top: 1%;
		margin-right: 2%;
		font-size: 1.0rem;
	}
	.mint-searchbar-cancel{
		color: #fff;
	}
</style>