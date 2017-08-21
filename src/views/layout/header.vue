<template>
	<div class="v-header">
        <div class="v-header-logo">
	        <img src="../../assets/images/logo.jpg" width="20%" style="margin-top:3%;">
	        <span>酷电影</span>
        </div>
        
		<div @click="to"  class="v-header-input">
			<mt-search  v-model="value"  cancel-text="取消"  placeholder=" 影片类型 / 明星、导演姓名"></mt-search>
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
	  box-sizing: border-box;
	}
	.v-header-logo {
	  width: 30%;
	}
	.v-header-logo img{
		
	}
	.v-header-logo span{
		font-size: 1.2rem;
		font-weight: bold;
		color: #df2d2d;
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