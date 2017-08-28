<template>
	<div class="eye">
		<Top></Top>
		<lb :listImg="listImg"></lb>
		<div  class="container" >
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">榜单</mt-tab-item>
			  <mt-tab-item id="2">热门</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected">
			  <mt-tab-container-item id="1">
			  	<div class="content">
			  		<div class="box" v-for="(itemlist,index) in listarr">	
						<header v-if="index==1">{{title1}}</header>
						<header v-else>{{title2}}</header>
				    	<div class="box_content" v-for="(item, index) in itemlist.subjects" v-if="index<5" @click="showMoreMsg(item.id)">
				    		<div class="number">{{ index+1 }}</div>
				    		<div class="box_img"><img :src="item.images.small" :alt="item.alt"></div>
				    		<div class="box_right">
				    			<h2>{{ item.title }}</h2>
				    			<Star :score="item.rating.average"></Star>
				    			<span>{{ item.rating.average }}分</span><br>
				    		</div>
				    	</div>
				    	<div class="btn1"><mt-button type="danger" size="large" @click="all(index)">查看全部</mt-button></div>
					</div>

					<div class="box">	
						<header>{{weeklylist.title}}</header>
				    	<div class="box_content" v-for="(item, index) in weeklylist.subjects" v-if="index<5" @click="showMoreMsg(item.subject.id)">
				    		<div class="number">{{ index+1 }}</div>
				    		<div class="box_img"><img :src="item.subject.images.small" ></div>
				    		<div class="box_right">
				    			<h2>{{ item.subject.title }}</h2>
				    			<Star :score="item.subject.rating.average"></Star>
				    			<span>{{ item.subject.rating.average }}分</span>
				    		</div>
				    	</div>
				    	<div class="btn1"><mt-button type="danger" size="large"  @click="all(2)" >查看全部</mt-button></div>
					</div>
					<Tag></Tag>
				</div>


			  </mt-tab-container-item>
			
			  <mt-tab-container-item id="2">
			  	<div class="content">
					<div class="box" >
				   		<header>{{ hotlist[0].title }}</header>
				   		<div class="item" v-for="(item,index) in hotlist[0].subject" @click="starMsg(item.id)">
							<img :src="item.images" ><br>
					    	<span>{{ item.name }}</span>		
				   		</div>	
			   		</div>
					<div class="box">
				   		<header>{{ hotlist[1].title }}</header>
				   		<div class="item" v-for="(item,index) in hotlist[1].subject" @click="showMoreMsg(item.id)">
							<img :src="item.images" ><br>
					    	<span v-if="item.name.length<5">{{ item.name }}</span>
					    	<span v-else>{{ item.name.substr(0,4) }}...</span>		
				   		</div>	
			   		</div>

			   		<div class="largeCom-wrap">
			   			<header>{{ hotlist[2].title }}</header>
			   		  	<div v-for="(item, index) in hotlist[2].subject" class="largeCom-content">
				   		  	<div class="movie-msg" @click="showMoreMsg(item.id)">
				   		  		<img :src="item.images">
				   		  		<span v-if="item.name.length<5">{{ item.name }}</span>
						    	<span v-else>{{ item.name.substr(0,4) }}...</span>		
				   		  	</div>
				   		  	<div class="comment-msg">
				   		  		<h3 v-if="item.title.length<=15">标题：{{item.title}}</h3>
				   		  		<h3 v-else>标题：<span>{{item.title.substr(0,14)}}...</span></h3>
				   		  		<div class="largeCom-content-header">
				   		  		  <img :src="item.uimages">
				   		  		  <span>{{item.uname}} </span>
				   		  		</div>
				   		  		<div class="largeCom-content-header">
				   		  			<star :score="item.star*2" class="largeCom-star"></star>
				   		  		  	<span>{{item.date}}</span>
				   		  		</div>
				   		  		<div v-if="indexarr.indexOf(index)===-1">
				   		  		  <div v-if="item.content.length>=35">
				   		  		    {{ item.content.substr(0,34) }}...
				   		  		  <span @click="showContent(index)" class="msg-all-Comment"><详情</span>
				   		  		  </div>
				   		  		  <div v-else>
				   		  		    {{ item.content }}
				   		  		  </div>	   		  		    
				   		  		</div>
				   		  		<div v-else >
				   		  		    {{ item.content }}
				   		  		    <span @click="showContent(index)" class="msg-all-Comment"><收起</span>
				   		  		</div>
				   		  	</div>
			   		    
			   			</div>
			   	  </div>
			   	  <Tag></Tag>
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
import tag from '../layout/tag'



	export default {
		name:'eye',
		components:{
			Top:top,
			Star:star,
			lb:Banner,
			Tag:tag,
		},
		data(){
			return {
				selected:'1',
				boxlist:null,
				boxdata:null,
				listImg: [
                	{url: a}, {url: b}, {url: c},{url:d},{url:e}
                ],
                title1:"",//新片榜
                title2:"",//top250
                
                weeklylist:{
                	title:'',
                },
                listarr:[],
                hotlist:[],//热门列表
                contentShow:false,
                indexarr:[]
                
                
			}
		},
		methods:{
			getData(){
				//top250
				this.$http.get(api.movietop).then(function (response) {
			        let data= response.body;
			        this.title1=data.title;
			        this.listarr.push(data)
			        console.log(this.listarr)
			        console.log("movietop接口数据为:",response)
			        
			    }).catch(function (response) {
			          console.log(response)
			    });
			    //新片榜
			    this.$http.get(api.new_movies+'?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd').then(function (response) {
			        let data= response.body;
			        this.title2=data.title;
			        this.listarr.push(data)
			        console.log(this.listarr)
			        console.log("new_movies接口数据为:",response)
			        
			    }).catch(function (response) {
			          console.log(response)
			    });
			    
			    //口碑榜
			    this.$http.get(api.movie_weekly+'?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd').then(function (response) {
			        this.weeklylist = response.body;
			        console.log("weeklylist接口数据为:",response)
			        
			    }).catch(function (response) {
			          console.log(response)
			    });
			    //热门
		    	this.$http.get(api.hot).then(function (response) {
		            let data= response.body;
		            this.hotlist=data.data
		            console.log("hot,json数据为:",response)
		            
		        }).catch(function (response) {
		              console.log(response)
		        });


			},
			showMoreMsg: function (str) {
			  const path = '/moviemsg/' + str
			  this.$router.push({path: path})
			},
			all:function(index){
				const path = '/allmovie/' + index
				this.$router.push({path: path})
			},
			starMsg: function (str) {
			  const path = '/starmsg/' + str
			  this.$router.push({path: path})
			},
			showContent: function (ind) {
			  if(this.contentShow==false){
			    this.indexarr.push(ind)
			    console.log("++++",ind)
			    console.log("++++",this.indexarr)
			    this.contentShow=true
			  }else{
			    let index=this.indexarr.indexOf(ind)
			    this.indexarr.splice(index,1)
			    console.log("----",ind)
			    console.log("-----",this.indexarr)
			    this.contentShow=false
			  }
			  
			},
		},
		mounted(){
			this.getData()
		}
	}
</script>

<style scoped>
	
	h2{
		font-size: 1.2rem;
		margin-bottom: 3%;
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
	.content{
		width: 100%;
		height: 96%;
		overflow: auto;
		text-decoration: none;
	}
	.box{
		width: 100%;
		height: auto;
		text-decoration: none;
		margin-bottom: 2%;
	}
	.item {
        float: left;
        box-sizing: border-box;
        width: 33.33333%;
        padding-left: 4%;
        padding-right: 4%;
        overflow: hidden;
        text-decoration: none;
        color: #9b9b9b;
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
	.btn1{
		width: 100%;
	}
	.number{
		flex: 1;
		margin-top: 15%;
		margin-left: 3%;
		font-size: 1.2rem;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #e54847;
    	color:  #e54847;
	}

	.largeCom-wrap {
	  padding: 2%;
	  text-align: left;
	  
	}
	
	.largeCom-content {
	  margin-bottom: 2%;
	  margin-top: 1%;
	  border-bottom: 1px solid #d6d6d6;
	  display: flex;
	}
	.movie-msg{
		flex: 1;
		width: 30%;
		padding: 6% 2%;
	}
	.comment-msg{

	}
	.comment-msg h3 {
	  font-size: 1.2rem;
	}
	.comment-msg img {
	  width: 20%;
	  height: 20%;
	  border-radius: 24px;  
	  margin-right: 2%;
	}
	.largeCom-content-header {
	  display: flex;
	  padding-bottom: 1%;
	}
	.largeCom-content-header span {
	  align-self: center;
	}
	.largeCom-content-header-rating {
	  flex: 1;
	  margin-left: 3%;  
	}
	.largeCom-star {
	  display: inline-block;
	  margin-top: 6%;
	}
	.msg-all-Comment {
	  color: #e54847;
	  font-weight: lighter;
	  text-align: center;
	  font-size: 1.0rem;
	  height: 30%;
	  border-bottom: 1% solid #d6d3d3;
	}

</style>