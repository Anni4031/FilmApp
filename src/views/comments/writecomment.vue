<template>
	<div>
		<T :title="title"></T>
		<div class="write">
			<p>点击星星评分</p>
			<star-rating :increment="0.1" :fixed-points="1" :rating="write.rating" v-model="write.rating" class="star"></star-rating>
			<div>	
				<mt-field placeholder="添加标题" type="text" v-model="write.title"></mt-field>
				<mt-field placeholder="添加内容" type="textarea" rows="6" v-model="write.content"></mt-field><br>
				<p class="text"><span>这是我的原创内容</span><mt-switch v-model="write.value"></mt-switch></p><br>
				<mt-button type="danger" plain class="btn" @click.native="submit">发表</mt-button>
				<mt-button  plain class="btn" @click.native="canel">取消</mt-button>
			</div>
		</div>

	</div>
</template>

<script>
import Title from '../layout/header_title'
import store from '../../store/index'
	export default {
	  components: {
	    T:Title
	  },
	  data () {
	    return {
	    	title:"写影评",  
	    	write:{
	    		title:"",
	    		content:'',
	    		id:this.$route.params.id,
	    		rating:0,
	    		value:false
	    	}
	    }
	  },
	  methods:{
	  	submit(){
	  		if(this.write.title!=''){
	  			let par=JSON.parse(JSON.stringify(this.write)) ;
	  			store.dispatch('setWriteInfo',par); 
	  			this.$router.push('/index/my')
	  		}else{
	  			this.$toast({
	  			    message: '标题不能为空!',
	  			    position: 'bottom',
	  			    duration: 2000,
	  			    className:"errtoast"				
	  			});
	  		}
	  	},
	  	canel(){
	  		this.$router.go(-1)
	  	}               
	  },
	 
	}
</script>

<style scoped>
	.write{
		width: 100%;
		margin: 2%;
	}
	.star{
		padding: 2% 12%;
	}
	.box{
		padding: 5%;
	}
	.text{
		text-align: left;
	}
	
	.mint-switch{
		width: 30%;
		float: right;
		margin-right: 30%;
	}
	.errtoast{
		background: red;
	}
</style>