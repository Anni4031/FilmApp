<template>
	<div>
		<Top></Top>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">电影</mt-tab-item>
		  <mt-tab-item id="2">电视</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    电影
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		   	电视
		  </mt-tab-container-item>
		</mt-tab-container>
		
		
	</div>
</template>

<script>
import top from '../layout/header'
	export default {
		name:'eye',
		components:{
			Top:top	
		},
		data(){
			return {
				selected:'1'
			}
		},
		methods:{
			
		}
	}
</script>

<style scope>
	.mint-tab-item-label{
		font-size: 1.0rem;
	}
</style>