<template>
	<div>
    	<T :title="(datalist.title)"></T>
	  	<div class="content">
	  		<div class="box"  v-if="bangdan!=2" >	
		    	<div class="box_content" v-for="(item, index) in datalist.subjects" @click="showMoreMsg(item.id)">
		    		<div class="number">{{ index+1 }}</div>
		    		
	    			<div class="box_img"><img :src="item.images.small" :alt="item.alt"></div>
		    		<div class="box_right">
		    			<h2>{{ item.title }}</h2>
		    			<Star :score="item.rating.average"></Star>
		    			<span>{{ item.rating.average }}分</span><br>
		    		</div> 
		    		
		    	</div>
			</div>

			<div class="box"  v-else >
				<div class="box_content" v-for="(item, index) in datalist.subjects" @click="showMoreMsg(item.subject.id)">
					<div class="number">{{ index+1 }}</div>
					<div class="box_img"><img :src="item.subject.images.small" ></div>
					<div class="box_right">
						<h2>{{ item.subject.title }}</h2>
						<Star :score="item.subject.rating.average"></Star>
						<span>{{ item.subject.rating.average }}分</span>
					</div>
				</div>
			</div>
		</div>
		<Tag></Tag>
	</div>
</template>

<script>
import star from '../star/star'
import Title from '../layout/header_title'
import { api } from '../../global/api'
import tag from '../layout/tag'
export default {
	components: {
      Star: star,
      T:Title,
      Tag:tag,
    },
	data () {
	    return {
	    	bangdan:this.$route.params.id,
	    	apiarr:[
	    		api.new_movies+'?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd',
		    	api.movietop,
		    	api.movie_weekly+'?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd'
	    	],
	    	datalist:{
	    		title:"",
	    	}//三大榜单之一的全部内容
	    }   
	},
	methods:{
	  	showData(){
	  		this.$http.get(this.apiarr[this.bangdan]).then(function (response) {
	  		        this.datalist = response.body
	  		        console.log("三大榜单之一接口数据为:"+response.body)
	  		    })
	  		    .catch(function (response) {
	  		        console.log(response)
	  		    })
	  	},
	  	showMoreMsg: function (str) {
			const path = '/moviemsg/' + str
			this.$router.push({path: path})
		},
	},
	mounted: function () {
	    this.showData()
	},
}
</script>

<style scoped>
	.content{
		width: 100%;
		height: 98%;
		overflow: auto;
		text-decoration: none;
	}
	.box{
		width: 100%;
		height: auto;
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
</style>