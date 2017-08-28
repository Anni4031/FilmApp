<template>
	<div>
		<div class="user-center">
		  <div class="user">
		  	<div class="top" @click="setclick">
		  		<img src="../../assets/images/set.png" alt="">
		  	</div>
		  	<div class="xiamian">
		  		<div class="avatar">
		  		  <img src="../../assets/images/touxiang.png" alt="" >
		  		</div>
		  		<div class="name" v-if="user==null"><span @click="gologin">请登录</span></div>
		  		<div class="name" v-else>{{ user.name }}</div>
		  	</div>
		   
		  </div>  
	</div>
	<div class="container">
		<mt-navbar v-model="selected">
		    <mt-tab-item id="1">想看</mt-tab-item>
		    <mt-tab-item id="2">在看</mt-tab-item>
		    <mt-tab-item id="3">看过</mt-tab-item>
		    <mt-tab-item id="4">影评</mt-tab-item>
		    <mt-tab-item id="5">影人</mt-tab-item>

		</mt-navbar>

		<mt-tab-container v-model="selected">
		
			<mt-tab-container-item id="1">
				<div class="bg" v-if="user!=null">
					<header>{{ number }}部</header>
					<div v-if="number!=0">
						<div class="box_content"  v-for="(item, index) in wantlist" >
							<div class="box_img"><img :src="item.images.small" :alt="item.alt"></div>
							<div class="box_right"  @click="showMoreMsg(item.id)">
								<h2>{{ item.title }}</h2>
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
							<div class="date">{{item.date}}</div>
						</div>	
					</div>
					<div v-else class="wu">暂无标记相关内容</div>
					<Tag></Tag>
				</div>
				<div class="bgimg" v-else><img src="../../assets/images/err.png" alt="" width="50%"></div>
			</mt-tab-container-item>
			
			<mt-tab-container-item id="2">
			   	<div class="bg" v-if="user!=null">
					<header>{{ number }}部</header>
					<div v-if="number!=0">
						该功能还未实现
					</div>
					<div v-else class="wu">
						暂无标记相关内容
					</div>
					<Tag></Tag>
				</div>
				<div class="bg" v-else><img src="../../assets/images/err.png" alt="" width="50%"></div>
			</mt-tab-container-item>

			<mt-tab-container-item id="3">
			   	<div class="bg" v-if="user!=null">
					<header>{{ number3 }}部</header>
					<div v-if="number3!=0">
						<div class="box_content"  v-for="(item, index) in watchedlist" >
							<div class="box_img"><img :src="item.images.small" :alt="item.alt"></div>
							<div class="box_right"  @click="showMoreMsg(item.id)">
								<h2>{{ item.title }}</h2>
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
							<div class="date">{{item.date}}</div>
						</div>
					</div>
					<div v-else class="wu">
						暂无标记相关内容
					</div>
					<Tag></Tag>
				</div>
				<div class="bg" v-else><img src="../../assets/images/err.png" alt="" width="50%"></div>
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
			   	<div class="bg" v-if="user!=null">
					<header>{{ number4 }}篇</header>
					<div v-if="number4!=0">
						<div v-for="(item, index) in commentlist" class="largeCom-content" >
						  <div class="largeCom-content-header">
						  	<h3 v-if="item.title.length<=15">标题：{{item.title}}</h3>
						  	<h3 v-else>标题：<span>{{item.title.substr(0,14)}}...</span></h3>
						    <star :score="item.rating*2" class="largeCom-star"></star>
						    <p>{{item.rating*2}}分</p>
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
					<div v-else class="wu">
						你还未发表任何影评
					</div>
					<Tag></Tag>
				</div>
				<div class="bg" v-else><img src="../../assets/images/err.png" alt="" width="50%"></div>
			</mt-tab-container-item>
			<mt-tab-container-item id="5">
			   	<div class="bg" v-if="user!=null">
					<header>{{ number5 }}人</header>
					<div v-if="number5!=0">
						<div class="box">
					   		<div class="item" v-for="(item,index) in collectarr" @click="starMsg(item.id)">
								<img :src="item.avatars.small" ><br>
						    	<span>{{ item.name }}</span>		
					   		</div>	
				   		</div>
					</div>
					<div v-else class="wu">
						暂无标记相关内容  
					</div>
					
				</div>
				<div class="bg" v-else><img src="../../assets/images/err.png" alt="" width="50%"></div>
				<Tag></Tag>
			</mt-tab-container-item>
		</mt-tab-container> 
	</div>
	
		
	</div>
</template>

<script>
import star from '../star/star'
import store from '../../store/index'
import { api } from '../../global/api'
import tag from '../layout/tag'
	export default {
		name:'my',
		components: {
		  star,
		  Tag:tag,
		},
		data(){
			return {
				selected:'1',
				number:0,
				number3:0,
				number4:0,
				number5:0,
				user:store.state.loginuser.user,//登录用户信息
				wantlist:store.state.want.wantInfo,//想看列表
				collectarr:store.state.starcollect.collectInfo,//收藏影人列表
				commentlist:store.state.write.writeInfo,//写影评列表
				watchedlist:store.state.watched.watchedInfo,//已看过列表
				contentShow:false,
				indexarr:[],
			}
		},
		mounted:function(){
			this.showWant()
			this.showWatched()
			this.showStar()
			this.showcomment()
			console.log("my",this.user)
		},
		methods:{
			//想看
			showWant:function(){
				if(this.user==null){
					this.wantlist=null
				}else{
				    let vm=this; 
				    console.log("wantlist数据为:",vm.wantlist)
					vm.number=vm.wantlist.length
				}
			},
			//收藏影人
			showStar:function(){
				if(this.user==null){
					this.collectarr=null
				}else{
				    let vm=this; 
					this.number5=this.collectarr.length
					console.log("5",this.number5)
					console.log("collectarr:",this.collectarr)
				}
			},
			// 影评
			showcomment(){
				if(this.user==null){
					this.commentlist=null
				}else{
				    let vm=this; 
					this.number4=this.commentlist.length
					console.log("4",this.number4)
					console.log("commentlist:",this.commentlist)
				}
			},
			// 已看过
			showWatched(){
				if(this.user==null){
					this.watchedlist=null
				}else{
				    let vm=this; 
					this.number3=this.watchedlist.length
					console.log("3",this.number3)
					console.log("watchedlist:",this.watchedlist)
				}
			},

			gologin:function(){
				this.$router.push('/login')
			},
			showMoreMsg: function (str) {
			  const path = '/moviemsg/' + str
			  this.$router.push({path: path})
			},
			starMsg: function (str) {
			  const path = '/starmsg/' + str
			  this.$router.push({path: path})
			},
			// 显示全部内容(影评)
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
			// 设置
			setclick:function(){
				this.$router.push('/set')
			}
		}
	}
</script>

<style scoped>
	.user-center{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 82%;
	    background:  #e54847;
	    overflow: hidden;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #e54847;
    	color:  #e54847;
    	
	}
	.user{
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      margin: 5%;
      
  	}
  	.top{
  		float: right;
  		margin-right: 10%;
  	}
  	.mint-button{
		height: 20%;
  	}
  	.mint-button--default{
  		background:  #e54847;
  		color: #fff;
  	}
  	.xiamian{
  		display: flex;
  		padding-bottom: 5%;
  		align-items: center;
  	}
  	.avatar{
		flex: 35% 0 0;
		width: 35%;  
  	}
  	.avatar img{
  		border-radius: 50%;
  		width: 70%;
  	}
  	.name{
  		color: #FFECDE;
  	}
  	.name span{
  		text-decoration: underline;
  		color: #FFF;
  	}
  	.container{
		position: absolute;
		top: 17%;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.bg{
		background: #F8F8F8;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		text-decoration: none;
	}
	.bgimg{
		padding-top: 30%;
		padding-bottom: 35%;
		background: #F8F8F8;
		width: 100%;
		height: 99%;
		overflow-y: auto;
		text-decoration: none;
	}
	header{
		font-size: 1.0rem;
		width: 100%;
		padding: 2%;
		margin-left: 3%;
		text-align: left;
	}
	.wu{
		padding-top: 30%;
		padding-bottom: 30%;
		margin: 20%;
	}
	.box_content{
		background-color: #FFF;
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		border-bottom: 1px solid #d6d6d6;
	}
	.box_img{
		width: 25%;
		padding: 4% 2%;
	}
	.box_right{
		width: 45%;
		height: 40%;
		padding-top: 1%;
		padding-bottom: 0.3rem;
	}
	.box_right span{
		font-size: 0.8rem;
		color: #666;
		padding-top: 4%;	
	}
	.daoyan{
		padding-left: 15px;
		vertical-align: top;
		font-size: 1.0rem;
	}
	.date{
		flex: 1;
		margin-top: 6%;
		margin-left: 3%;
		font-size: 0.8rem;
		
	}
	h2{
		font-size: 1.2rem;
		margin-bottom: 10px;
	}
	.box{
		width: 100%;
		height: auto;
		text-decoration: none;
		padding: 1% 1%;
		box-sizing: border-box;
		cursor: pointer;
	}
	.item {
        float: left;
        box-sizing: border-box;
        width: 33.33333%;
        padding-left: 4%;
        padding-right: 4%;
        overflow: hidden;
        background-color: #FFF;
        text-decoration: none;
        color: #9b9b9b;
    }
    .item span{
    	font-size: 0.9rem;
    }
    .largeCom-content {
      margin-bottom: 2%;
      padding: 2%;
      background: #fff;
      text-align: left;
      border-bottom: 1px solid #d6d6d6;
    }
    .largeCom-content h3 {
      font-size: 1.0rem;
      margin-right: 3%;
    }
    .largeCom-content-header {
      display: flex;
    }
    .largeCom-content-header span {
      align-self: center;

    }
    .largeCom-content-header-rating {
      flex: 1;
      margin-left: 3%;  
    }
    .largeCom-content footer {
      text-align: right;
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