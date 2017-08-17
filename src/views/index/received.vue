<template>
	<div class="received">
		
		<Top></Top>
		
		
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">正在热映</mt-tab-item>
		  <mt-tab-item id="2">即将上映</mt-tab-item>
		</mt-navbar>
		 
		<!-- tab-container-->
		<mt-tab-container v-model="selected">
		
		  <mt-tab-container-item id="1">
		   	<div class="in-movies-show" v-for="(item, index) in list" >
				<div class="in-movies-show-child">
			   		<div class="posters"><img :src="item.images.small" ></div>
			   		<div class="movieMsg">
			   		   <h2>{{ item.title }}</h2>
			   		   <span :score="item.rating.average"></span>
			   		   <p>{{ item.rating.average }}分</p>
			   		   <p>导演:{{ item.directors[0].name}}</p>
			   		   <!-- <p>
			   		     主演:{{ item.casts[0].name}}
			   		     <span v-if="item.casts[1]">, {{ item.casts[1].name }}</span>
			   		   </p> -->
			   		</div>
			    </div>
			</div>		
		  </mt-tab-container-item>

		  <mt-tab-container-item id="2">
		   	<div  class="co-theaters-area">
		   	      <div class="co-movies-wrap" >
		   	        <div class="co-movies-show" v-for="(item, index) in coming_soonlist" >
		   	          <div class="co-movies-show-child">
		   	            <div class="co-posters"><img :src="item.images.small" :alt="item.alt"></div>
		   	            <div class="co-movieMsg">
		   	              <h2>{{ item.title }}</h2>
		   	              <p>导演: {{ item.directors[0].name}}</p>
		   	              <!-- <p>
		   	                主演:{{ item.casts[0].name}}
		   	                <span v-if="item.casts[1]">, {{ item.casts[1].name }}</span>
		   	              </p> -->
		   	              <p>类型: {{item.genres.join(', ')}}</p>
		   	            </div>
		   	          </div>
		   	        </div>
		   	</div>
		   	 
		  </mt-tab-container-item>
		</mt-tab-container> 

		
		
	</div>
</template>

<script>
import top from '../layout/header'
import { api } from '../../global/api'
// import film from '../layout/filming'
	export default {
		name:'received',
		components:{
			Top:top
		},
		data(){
			return {
				list: null,
				selected:"1",
				coming_soonlist:null
			}
		},
		methods:{
			getData(){
				this.$http.get(api.in_theaters).then(function (response) {
			        let data=response.body;
			        let vm=this;
			        vm.list = data.subjects;
			        console.log("in_theaters接口数据为:",response)
			    }).catch(function (response) {
			          console.log(response)
			    })
			    this.$http.get(api.coming_soon).then(function (response) {
			        let coming_soondata=response.body;
			        let vm=this;
			        vm.coming_soonlist = coming_soondata.subjects;
			        console.log("coming_soonlist接口数据为:",response)
			    }).catch(function (response) {
			          console.log(response)
			    })
			    
			}
		},
		mounted(){
			this.getData()
		}
	}
</script>

<style scope>
	.v-nav-bar {
	    display: block;
	    list-style: none;
	    border-bottom: 0.2rem solid  #26A2FF;
	  }
	.v-nav {
	    
	    text-align: center;
	    text-decoration: none;
	    font-size: 1.3rem;
	    color: #000;
	}
	h2{
		font-size: 1.0rem;
		font-weight: 500;
		margin-bottom: 10px;
	}
	
	.in-movies-wrap {
	  text-decoration: none;
	  font-size: 0;
	}
	.in-movies-show {
	  background-color: #f8f8f8;
	  padding: 10px 20px;
	  box-sizing: border-box;
	  cursor: pointer;
	  font-size: 0;
	}
	.in-movies-show-child {
	  display: flex;
	  align-items: flex-end;
	  padding-bottom: 10px;
	  border-bottom: 1px solid #d6d6d6;
	}
	.in-movies-show p {
	  font-size: 14px;
	  color: #666;
	}
	.movieMsg {
	  flex: 1;
	  padding-left: 20px;
	  vertical-align: top;
	}
	
	.co-movies-wrap {
	  text-decoration: none;
	  font-size: 0;
	}
	.co-movies-show {
	  background-color: #f8f8f8;
	  cursor: pointer;
	  font-size: 0;
	  padding: 10px 20px;
	}
	.co-movies-show-child {
	  display: flex;
	  align-items: flex-end;
	  padding-bottom: 10px;
	  border-bottom: 1px solid #d6d6d6;
	}
	.co-movieMsg {
	  flex: 1;
	  padding-left: 20px;
	  vertical-align: top;
	}
	.co-movieMsg h2 {
	  font-size: 20px;
	  font-weight: 500;
	  margin-bottom: 10px;
	}
	.co-movies-show p {
	  font-size: 14px;
	  color: #666;
	}
</style>