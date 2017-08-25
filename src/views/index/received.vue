<template>
	<div class="received">
		
		<Top></Top>
		<lb :listImg="listImg"></lb>
	
		<div class="container">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">正在热映</mt-tab-item>
		  <mt-tab-item id="2">即将上映</mt-tab-item>
		</mt-navbar>
		 
		<mt-tab-container v-model="selected">
		
		  <mt-tab-container-item id="1">
			<div class="box">
				<div class="box_content" v-for="(item, index) in in_theaterslist" @click="showMoreMsg(item.id)">
					<div class="box_img"><img :src="item.images.small" :alt="item.alt"></div>
					<div class="box_right">
						<h2>{{ item.title }}</h2>
						<Star :score="item.rating.average"></Star>
						<span>{{ item.rating.average }}分</span><br>
						<span class="daoyan">导演:{{ item.directors[0].name}}</span><br>
						<span class="daoyan">
							<span>
								主演:<span v-for="(zhuyan, index) in item.casts">{{zhuyan.name}}
										<span v-if="index===item.casts.length-1"></span>
										<span v-else>/</span>
									</span>
							</span>
						</span>
					</div>
					<div class="btn"><mt-button type="danger" size="small">购票</mt-button></div>
				</div>
			</div>
			
		  </mt-tab-container-item>
		
		  <mt-tab-container-item id="2">
		   	<div class="box">
				<div class="box_content" v-for="(soonitem, index) in coming_soonlist" >
					<div class="box_img"><img :src="soonitem.images.small" :alt="soonitem.alt"></div>
					<div class="box_right"  @click="showMoreMsg(soonitem.id)">
						<h2>{{ soonitem.title }}</h2>
						<span class="daoyan">导演:{{ soonitem.directors[0].name}}</span><br>
						<span>类型: {{soonitem.genres.join(', ')}}</span><br>
						<span class="daoyan">
							<span>
								主演:<span v-for="(zhuyan, index) in soonitem.casts">{{zhuyan.name}}
										<span v-if="index===soonitem.casts.length-1"></span>
										<span v-else>/</span>
									</span>
							</span>	
						</span>
					</div>
					<div class="btn">
						<mt-button type="primary" size="small" :disabled="status" v-model="text" @click="btnclick(index,soonitem)" v-if="indexarr.indexOf(index)!==-1">{{text}}</mt-button>
						<mt-button type="primary" size="small" v-model="text" @click="btnclick(index,soonitem)" v-else>想看</mt-button>
					</div>
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
 import a from '../../assets/images/a.jpg'
 import b from '../../assets/images/b.jpg'
 import c from '../../assets/images/c.jpg'
 import d from '../../assets/images/d.jpg'

import top from '../layout/header'
import { api } from '../../global/api'
import star from '../star/star'
import store from '../../store/index'


	export default {
		name:'received',
		components:{
			Top:top,
			Star:star,
			lb:Banner	
		},
		data(){
			return {
				listImg: [
                	{url: a}, {url: b}, {url: c},{url:d}
                ],
				list: [],
				selected:"1",
				coming_soonlist:null,
				in_theaterslist:null,
				text:"想看",
				status:false,
				indexarr:[],
				btnarr:[],
				user:store.state.loginuser.user,				
				
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			getData(){
				this.$http.get(api.in_theaters).then(function (response) {
			        let data=response.body;
			        let vm=this;
			        vm.in_theaterslist = data.subjects;
			        console.log("in_theaters接口数据为:",response)
			    }).catch(function (response) {
			          console.log(response)
			    });
			    this.$http.get(api.coming_soon).then(function (response) {
			        let data=response.body;
			        let vm=this;
			        vm.coming_soonlist = data.subjects;
			        console.log("coming_soonlist接口数据为:",response)
			    }).catch(function (response) {
			          console.log(response)
			    });  
			},
			showMoreMsg: function (str) {
			  const path = '/moviemsg/' + str
			  this.$router.push({path: path})
			},
			btnclick(index,soonitem){
				let user=JSON.parse(JSON.stringify(this.user))
				let date=new Date()
				console.log("时间:",date)
				let year=date.getFullYear(); 
				console.log("year",year)
				let month=date.getMonth();
				let day=date.getDate();
				let hours=date.getHours();
				let minutes=date.getMinutes();
				let seconds=date.getSeconds();
				let date1=""+year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+"";
				soonitem.date=date1
				this.btnarr.push(soonitem)
				console.log("btnarr:",this.btnarr)
				if(user!=null){
					this.indexarr.push(index)
					console.log("indexarr--",this.indexarr)
					if(this.text=="想看"){
						this.status=true;
						this.text="已想看";
					}
					
					store.dispatch('setWantInfo',soonitem); 
				
				}else{
					this.$toast({
					    message: '还未登录,请先登录!',
					    position: 'bottom',
					    duration: 2000,
					    className:"errtoast"				
					});	
				}
				
			}
			
		}
	}
</script>

<style scoped>
	.container{
		position: absolute;
		top: 37%;
		left: 0;
		right: 0;
		bottom: 0;
	}
	h2{
		font-size: 1.2rem;
		margin-bottom: 10px;
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
		margin: 8% 1%;
	}
	.box_right{
		width: 45%;
		height: 40%;
		padding-top: 1%;
		padding-bottom: 0.3rem;
	}
	.box_right span{
		font-size: 1.0rem;
		color: #666;	
	}
	.daoyan{
		padding-left: 15px;
		vertical-align: top;
		font-size: 1.0rem;
	}
	.btn{
		flex: 1;
		margin-top: 18%;
		margin-left: 3%;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #e54847;
    	color:  #e54847;
    	
	}
	.errtoast{
		background: red;
	}
</style>