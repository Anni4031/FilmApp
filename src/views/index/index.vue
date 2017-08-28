<template>
	<div>
		
		<router-view ></router-view>
		
		<div class="footer">
			<mt-tabbar v-model="selected">
			  <mt-tab-item id="热映">
			    <router-link to="/index/received" exact>
					<img src="../../assets/images/movie.png" alt="" v-if="selected=='热映'" width="18%"> 
					<img src="../../assets/images/movie2.png" alt=""  v-else width="18%"> 
					<br>
		    		<span>热映</span>
			    </router-link>
			  </mt-tab-item>
			  <mt-tab-item id="找片">
			    <router-link to="/index/find">
			    	<img src="../../assets/images/eye.png" alt="" v-if="selected=='找片'" width="18%"> 
			    	<img src="../../assets/images/eye2.png" alt="" v-else width="18%"> <br>
			    	<span>找片</span>
			    </router-link>
			  </mt-tab-item>
			  <mt-tab-item id="我的">
			    <router-link to="/index/my">
					<img src="../../assets/images/my.png" alt="" v-if="selected=='我的'" width="18%">
			    	<img src="../../assets/images/my2.png" alt="" v-else width="18%"><br>
			    	<span>我的</span>
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
				selected:'热映',
			}
		},
		methods:{
			
		},
		mounted(){
			this.selected=this.$route.name//当前路径名与导航栏名一致,让其高亮
		},
	}
</script>

<style scoped>
	.mint-tab-item-label{
		font-size: 1.0rem;
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
	    padding-top: 2%;
	    
	}
	.mint-tabbar{
		background: #eaeaea;
	}
	.mint-tabbar > .mint-tab-item.is-selected a:link{
		text-decoration: none;
		color: #fff;
	}
	.mint-tabbar > .mint-tab-item.is-selected{
		background:  #e54847;
		color: #fff;
	}
	.router-link-active{
		color: #fff;
	}
	a{
		text-decoration: none;
		color: #000;
	}
</style>