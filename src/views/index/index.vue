<template>
	<div>
		
		<router-view></router-view>
		
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
			
		}
	}
</script>

<style scope>
	.mint-tab-item-label{
		font-size: 1.0rem;
	}
	.font{
		text-decoration: none;
		color:  #26A2FF;
		
	}
	a{
		text-decoration: none;
	}

	a:visited{
		text-decoration: none;
		color:  #26A2FF;
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
	    border-top: 1px solid #e4e4e4;
	}
	
	/* .m-tabbar{
	    display: flex;
	    flex-direction: row;
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    width: 100%;
	    overflow: hidden;
	    height: 50px;
	    background: #fff;
	    border-top: 1px solid #e4e4e4;
	    
	    .m-tabbar-item{
	      flex: 1;
	      text-align: center;
	      .m-tabbar-item-icon{
	          display: block;
	          padding-top: 2px;
	          img{
	              width: 28px;
	              height: 28px;
	          }
	      }
	      .m-tabbar-item-text{
	          display: block;
	          font-size: 1.0rem;
	          color:#949494;
	      }
	      &.is-active{
	          .m-tabbar-item-text{
	          	text-decoration: none;
	            color: #42bd56;
	          }
	      }
	  }
	} */
	
</style>