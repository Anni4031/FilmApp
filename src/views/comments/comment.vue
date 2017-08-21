<template>
  <div>
    
    <mt-header :title="('影评--'+commentsMsg.subject.title)" class="header-title">
      <router-link to="/" slot="left">
        <mt-button icon="back"  class="i"></mt-button>
      </router-link>
    </mt-header>
    
    <section class="largeCom-wrap">
      <div v-for="(item, index) in commentsMsg.reviews" class="largeCom-content">
        <h3 v-if="item.title.length<=15">标题：{{item.title}}</h3>
        <h3 v-else>标题：<span>{{item.title.substr(0,14)}}...</span></h3>
        <div class="largeCom-content-header">
          <img :src="item.author.avatar" :alt="item.author.alt">
          <span>{{item.author.name}} </span>
          <star :score="item.rating.value*2" class="largeCom-star"></star>
          <span>{{item.created_at}}</span>
        </div>
        <div v-if="indexarr.indexOf(index)===-1">
            {{ item.summary }}
          <span @click="showContent(index)" class="msg-all-Comment"><详情</span>
        </div>
        
        <div v-else >
            {{ item.content }}
            <span @click="showContent(index)" class="msg-all-Comment"><收起</span>
        </div>

        <footer>
          {{item.useful_count}}赞同
          {{item.useless_count}}反对
        </footer>
      </div>
    </section>
   
  </div>
</template>

<script >
import star from '../star/star'
import { api } from '../../global/api'
  export default {
    data () {
      return {
        commentsMsg: {
          
          subject: {
            title: ''
          }
        },
        contentShow:false,
        indexarr:[]
      }
    },
    components: {
      star: star
    },
    mounted: function () {
          this.$http.get(api.movie_basic + this.$route.params.id+"/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd" ).then(function (response) {
                    this.commentsMsg = response.body
                  console.log("movie_comments影评接口数据为:",response)
            }).catch(function (response) {
                    console.log(response)
            });
    },
    methods: {
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
       backLastPage: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style scope>
  .i{
    float: left;
    padding-top: 1%;
    padding-left: 1%;
    font-size: 1.5rem;
  }
  .header-title {
    display: flex;
    height: 24%;
    width: 100%;
    background-color: #e54847;
    box-sizing: border-box;
    font-size: 1.5rem;
  }
  
  .largeCom-wrap {
    padding: 2%;
  }
  .largeCom-content {
    margin-bottom: 2%;
    margin-top: 3%;
  }
  .largeCom-content h3 {
    font-size: 1.0rem;
  }
  .largeCom-content img {
    width: 15%;
    height: 15%;
    border-radius: 24px;  
    margin-right: 2%;
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
    /* line-height: 48px; */
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
