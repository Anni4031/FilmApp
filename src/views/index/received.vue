<template>
	<div class="received">
		
		<Top></Top>
		
		
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">正在热映</mt-tab-item>
		  <mt-tab-item id="2">即将上映</mt-tab-item>
		</mt-navbar>
		 
		
		<mt-tab-container v-model="selected">
		
		  <mt-tab-container-item id="1">
		  <!-- <div class="content"> -->
			<!--  -->
			<div class="box" >
				<div class="box_content" v-for="(item, index) in in_theaterslist">
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
			<!-- </div> -->
		  </mt-tab-container-item>
		
		  <mt-tab-container-item id="2">
		   	<div class="box">
				<div class="box_content" v-for="(soonitem, index) in coming_soonlist">
					<div class="box_img"><img :src="soonitem.images.small" :alt="soonitem.alt"></div>
					<div class="box_right">
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
					<div class="btn"><mt-button type="primary" size="small">想看</mt-button></div>
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
		name:'received',
		components:{
			Top:top,
			Star:star,
		},
		data(){
			return {
				list: [],
				selected:"1",
				coming_soonlist:null,
				in_theaterslist:null
				
			}
		},
		methods:{
			getData(){
				this.$http.get(api.in_theaters).then(function (response) {
			        let data=response.body;
			        let vm=this;
			        vm.in_theaterslist = data.subjects;
			        console.log("in_theaters接口数据为:",response)
			        // for(let i=0;i<=10;i++){
			        // 	vm.list.push(vm.in_theaterslist[i])
			        // }
			        // console.log("111",vm.list)

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
			// loadMore() {
			//   	this.loading = true;
			//   	setTimeout(() => {
			// 	    let last = this.in_theaterslist[this.list.length + 1];
			// 	    for (let i = this.list.length - 1; i <= this.in_theaterslist.length; i++) {
			// 	    	last = this.in_theaterslist[i];
			// 	      	this.list.push(last);
			// 	    }
			// 	    this.loading = false;
			// 	}, 1500);
			//   	console.log("222",this.list)
			// }
		},
		mounted(){
			this.getData()
		}
	}
</script>

<style scope>
	.content{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	h2{
		font-size: 1.2rem;
		margin-bottom: 10px;
	}
	.box{
		width: 100%;
		height: 99%;
		overflow: auto;
		text-decoration: none;
	}
	.box_content{
		background-color: #f8f8f8;
		padding: 1% 4%;
		box-sizing: border-box;
		cursor: pointer;
		clear: both;
		border-bottom: 3% solid #d6d6d6;
	}
	.box_img{
		float: left;
		width: 25%;
		margin: 7% 3%;
	}
	.box_right{
		float: left;
		width: 50%;
		height: 40%;
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
		float: left; 
		margin-top: 18%;
		margin-left: 3%;
	}
</style>