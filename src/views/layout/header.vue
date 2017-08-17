<template>
	<div>
		<mt-search  v-model="value"  cancel-text="取消"  placeholder=" 电影 / 电视剧"></mt-search>
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
			
		}
	}
</script>

<style scope>
	.mint-search{
		height: 5%;
	}
	.mint-searchbar{
		padding: 7px 7px;
	}
	.mint-searchbar-inner .mintui-search{
		margin-top: 3px;
		margin-right: 3px;
		font-size: 1.0rem;
	}
	.mint-searchbar-cancel{
		color: #fff;
	}
</style>