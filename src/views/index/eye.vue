<template>
	<div class="eye">
		<Top></Top>
		<!-- <mt-navbar v-model="selected">
		  <mt-tab-item id="1">电影</mt-tab-item>
		  <mt-tab-item id="2">电视</mt-tab-item>
		</mt-navbar> -->
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">电影</mt-tab-item>
		  <mt-tab-item id="2">电视</mt-tab-item>
		</mt-navbar>

		
		<!-- <mt-tab-container v-model="selected">

		  	<mt-tab-container-item id="1">  
			    <header>{{title1}}</header>
			    <div class="box">	
			    	<div class="box_content" v-for="(item, index) in toplist" @click="showMoreMsg(item.id)">
			    		<div class="number">{{ index+1 }}</div>
			    		<div class="box_img"><img :src="item.images.small" :alt="item.alt"></div>
			    		<div class="box_right">
			    			<h2>{{ item.title }}</h2>
			    			<Star :score="item.rating.average"></Star>
			    			<span>{{ item.rating.average }}分</span><br>
			    		</div>
			    	</div>
			    </div>
		  </mt-tab-container-item>

		  <mt-tab-container-item id="2">
		   		<header>{{title2}}</header>
		  		<div class="box" >
	   		    	<div  class="bangdan" v-for="(boxitem, index) in boxlist" @click="showMoreMsg(boxitem.id)">
	   		    		<div class="box_img">{{ index+1 }}<img :src="boxitem.images.small" :alt="boxitem.alt"></div>
	   		    		<div class="box_right">
	   		    			<h2>{{ boxitem.title }}</h2>
	   		    			<Star :score="item.rating.average"></Star>
		    				<span>{{ item.rating.average }}分</span>
	   		    		</div>
	   		    	</div>
		   		</div>
		  </mt-tab-container-item>

		</mt-tab-container> -->
		<mt-tab-container v-model="selected">
		
		  <mt-tab-container-item id="1">
		  	<div>
				<header>{{title1}}</header>
				<div class="box">	
			    	<div class="box_content" v-for="(item, index) in toplist" @click="showMoreMsg(item.id)">
			    		<div class="number">{{ index+1 }}</div>
			    		<div class="box_img"><img :src="item.images.small" :alt="item.alt"></div>
			    		<div class="box_right">
			    			<h2>{{ item.title }}</h2>
			    			<Star :score="item.rating.average"></Star>
			    			<span>{{ item.rating.average }}分</span><br>
			    		</div>
			    	</div>
				</div>
			</div>
		  </mt-tab-container-item>
		
		  <mt-tab-container-item id="2">
		  	<div>

			   	<header>近期值得看的国产剧</header>
		  		<div class="box" >
		  			
	   		    	
		   		</div>

	   		</div>
		  </mt-tab-container-item>
		</mt-tab-container> 
		
	</div>
</template>

<script>
import top from '../layout/header'
import { api } from '../../global/api'
import star from '../star/star'

	export default {
		name:'eye',
		components:{
			Top:top,
			Star:star,
		},
		data(){
			return {
				selected:'1',
				toplist:null,
				title1:null,
				boxlist:null,
				boxdata:null
			}
		},
		methods:{
			getData(){
				this.$http.get(api.movietop).then(function (response) {
			        let data=response.body;
			        this.title1=data.title;
			        let vm=this;
			        vm.toplist = data.subjects;
			        console.log("movietop接口数据为:",response)
			        
			    }).catch(function (response) {
			          console.log(response)
			    });
			    this.$http.get(api.movie_box).then(function (response) {
			    	let data=response.body;
			        this.boxdata=response.body;
			        this.title2=data.title;
			        let vm=this;
			        vm.boxlist = data.subjects;
			        console.log("movie_box接口数据为:",response)
			        
			    }).catch(function (response) {
			          console.log(response)
			    });
			   
			},
			showMoreMsg: function (str) {
			  const path = '/moviemsg/' + str
			  this.$router.push({path: path})
			}
		},
		mounted(){
			this.getData()
		}
	}
</script>

<style scope>
	h2{
		font-size: 1.2rem;
		margin-bottom: 10px;
	}
	header{
		font-size: 1.2rem;
		float: left;
		font-weight: bold ;
		padding: 2%;
	}
	.box{
		width: 100%;
		height: 99%;
		overflow: auto;
		text-decoration: none;
	}
	.box_content{
		background-color: #f8f8f8;
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		border-bottom: 1px solid #d6d6d6;
	}
	.box_img{
		width: 25%;
		margin-left: 1%;
		margin-top: 3%;
		margin-bottom: 4%;
		margin-right: 1%;
	}
	.box_right{
		width: 55%;
		height: 20%;
		padding-top: 5%;
		padding-bottom: 0.3rem;
	}
	.box_right span{
		font-size: 1.0rem;
		color: #666;	
	}
	
	.number{
		flex: 1;
		margin-top: 15%;
		margin-left: 3%;
		font-size: 1.2rem;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #e54847;
    	color: #e54847;
	}
</style>