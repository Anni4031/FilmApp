<template>
	<div class="v-header">
        <div class="v-header-logo">
	        <img src="../../assets/images/logo.jpg" width="20%">
	        <span>酷电影</span>
			<div class="v-load-title">查影讯，上酷电影！</div>
        </div>
        
		<div @click="to"  class="v-header-input">
			<mt-search  v-model="value"  cancel-text="取消"  placeholder=" 电影 / 电视剧 / 影人"></mt-search>
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

<style scope>
	.v-header {
	  display: flex;
	  height: 30%;
	  padding: 2% 2%;
	  box-sizing: border-box;
	}
	.v-header-logo {
	  width: 45%;
	}
	.v-header-logo img{
		float: left;
		margin-right: 2%;
	}
	.v-header-logo span{
		font-size: 1.2rem;
		font-weight: bold;
		color: #df2d2d;
	}
	.v-load-title{
		font-size: 1.0rem;
		line-height: 100%;
		padding-top: 5%;
	}
	.v-header-input {
	  flex: 1;
	  line-height: 100%;
	  height: 30%;
	}

	.mint-search{
		height: 5%;
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