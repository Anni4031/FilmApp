<template>
	<div>
		<div>
			<router-view></router-view>
			<mt-tabbar v-model="selected">
			  <mt-tab-item id="热映">
			    <router-link to="/index/received"><i class="fa fa-film" aria-hidden="true"></i> <br>热映</router-link>
			  </mt-tab-item>
			  <mt-tab-item id="找片">
			    <router-link to="/index/find"><i class="fa fa-eye" aria-hidden="true"></i><br>找片</router-link>
			  </mt-tab-item>
			  <mt-tab-item id="我的">
			    <router-link to="/index/my"><i class="fa fa-user-o" aria-hidden="true"></i><br>我的</router-link>
			  </mt-tab-item>
			</mt-tabbar>
		</div>

	</div>
</template>

<script>
	export default {
		name:'index',
		data(){
			return {
				
				selected:'热映'
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
	.font{
		color: #000;
	}
	a{
		text-decoration: none;
	}

	a:visited{
		text-decoration: none;
		color:  #26A2FF;
	}
</style>