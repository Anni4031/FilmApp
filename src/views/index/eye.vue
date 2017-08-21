<template>
	<div class="eye">
		<Top></Top>
		<lb :listImg="listImg"></lb>
		<div  class="container" >
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">电影</mt-tab-item>
			  <mt-tab-item id="2">电视</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected">
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
			  	<div>

				   	<header>近期值得看的国产剧</header>
			  		<div class="box" >
			  			
		   		    	
			   		</div>

		   		</div>
			  </mt-tab-container-item>
			</mt-tab-container> 
		</div>
	</div>
</template>

<script>
//导入Banner组件
 import Banner from '../layout/Banner'
 //导入图片
 import a from '../../assets/images/01.jpg'
 import b from '../../assets/images/02.jpg'
 import c from '../../assets/images/03.jpg'
 import d from '../../assets/images/04.jpg'
 import e from '../../assets/images/05.jpg'

import top from '../layout/header'
import { api } from '../../global/api'
import star from '../star/star'

	export default {
		name:'eye',
		components:{
			Top:top,
			Star:star,
			lb:Banner
		},
		data(){
			return {
				selected:'1',
				toplist:null,
				title1:null,
				boxlist:null,
				boxdata:null,
				listImg: [
                	{url: a}, {url: b}, {url: c},{url:d},{url:e}
                ],
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
		width: 100%;
		font-weight: bold ;
		padding: 2%;
		text-align: left;
	}
	.container{
		position: absolute;
		top: 38%;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.box{
		width: 100%;
		height: 100%;
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