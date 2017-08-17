<template>
	<div>
		<!-- <i class="mintui mintui-back" @click="backClick"></i> -->

		<mt-header>
		    <router-link to="/" slot="left" >
		    	<mt-button icon="back" class="i">返回</mt-button>
		    </router-link>
		</mt-header>
	</div>
</template>

<script>
	export default {
		name:'back',
		data(){
			return {
			}
		},
		methods:{
			backClick(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.mintui{   
	    font-size: 1.5rem;
	}
	.i{
		float: left;
		padding-top: 7px;
		padding-left: 10px;
		font-size: 1.5rem;
	}
</style>