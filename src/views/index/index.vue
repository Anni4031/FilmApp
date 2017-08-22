<template>
	<div>
		
		<router-view :key="key"></router-view>
		
		<div class="footer">
			<mt-tabbar v-model="selected">
			
			  <mt-tab-item id="热映">
			    <router-link to="/index/received">
			    	<i class="fa fa-film" aria-hidden="true"></i> <br><span class="font">热映</span>
			    </router-link>
			  </mt-tab-item>
			  <mt-tab-item id="找片">
			    <router-link to="/index/find">
			    	<i class="fa fa-eye" aria-hidden="true"></i><br><span class="font">找片</span>
			    </router-link>
			  </mt-tab-item>
			  <mt-tab-item id="我的">
			    <router-link to="/index/my">
			    	<i class="fa fa-user-o" aria-hidden="true"></i><br><span class="font">我的</span>
			    </router-link>
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
			
		},
		computed: {
	        key() {
	          return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
	        }
        }
	}
</script>

<style scoped>
	.mint-tab-item-label{
		font-size: 1.0rem;
	}
	.font{
		text-decoration: none;
		color: #e54847;
		
	}
	a{
		text-decoration: none;
	}

	a:visited{
		text-decoration: none;
		color: #e54847;
	}
	.footer{
		display: flex;
	    flex-direction: row;
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    width: 100%;
	    overflow: hidden;
	    height: 7%;
	    background: #fff;
	    
	}
	
</style>