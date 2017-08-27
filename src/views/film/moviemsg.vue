<template>
  <div>
      <T :title="(movieMsg.title)"></T>
      <section class="msg-movie">
        <div class="msg-img">
          <img :src="movieMsg.images.medium" :alt="movieMsg.alt">
        </div>
        <div>
          <h4 class="msg-movie-title">{{movieMsg.title}}</h4>
          <star :score="movieMsg.rating.average"></star>
          <p class="msg-movie-count">{{movieMsg.rating.average}}({{movieMsg.collect_count}}人评分)</p>
          <p>{{movieMsg.year}}年</p> 
          <p>{{movieMsg.genres.join(', ')}}</p>
          <p v-for="item in movieMsg.countries">{{item}}</p>
          <p v-for="item in movieMsg.durations" v-if="item.indexOf('中国')>0">{{item}}</p>
          <p v-for="item in movieMsg.pubdates" v-if="item.indexOf('中国')>0">{{item}}</p>
        </div>
      </section>

      <section class="msg-count">
        <mt-button type="danger" @click.native="want(movieMsg)" :disabled="status1">想看</mt-button>
        <mt-button type="danger" @click.native="watched(movieMsg)" :disabled="status2">看过</mt-button>
      </section>

      <div class="msg-summary">
        {{movieMsg.summary}}
      </div>

      <section class="msg-scoll-hidden">
        <section class="msg-star-wrap">
          <h3>演职人员</h3>
          <div class="msg-scoll">

            <div class="msg-star" v-for="item of movieMsg.directors" @click="starMsg(item.id)">
              <div v-if="item.avatars.small">
                <img :src="item.avatars.small" :alt="item.alt">
              </div>
              <div class="msg-star-name">
                {{item.name}}[导演]
              </div>
            </div>
            
            <div v-for="item of movieMsg.casts" @click="starMsg(item.id)">
              <div v-if="item.avatars.small">
                <img :src="item.avatars.small" :alt="item.alt">
              </div>
              <div class="msg-star-name">
                {{item.name}}
              </div>
            </div>
          </div>
        </section>
      </section>

      <mt-navbar v-model="selected">
        <mt-tab-item id="1">热门短评</mt-tab-item>
        <mt-tab-item id="2">热门影评</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="msg-duanping">
            <div class="comment" v-for="(item,index) in comments" v-if="index<5">
              <div class="author-img">
                <img :src="item.author.avatar" :alt="item.author.alt"><br>
                <span>{{item.author.name}}</span>
              </div>
              <div class="comment_right">
                <div class="msg-rating">
                  <star :score="item.rating.value*2"></star>
                  <span>{{item.created_at}}</span>
                </div>
                <span class="author-content">{{item.content}}</span>
              </div>
            </div>
            <p @click="smallComment(movieMsg.id)" class="msg-all-Comment">查看全部短论</p>
            <Tag></Tag>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
            <div class="largeCom-wrap">
              <div>影评          <span class="write" @click="write(movieMsg.id)"><i class="fa fa-pencil" aria-hidden="true"></i>写影评</span></div>
              <div v-for="(item, index) in commentsMsg.reviews" class="largeCom-content" v-if="index<5">
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
              <p @click="comment(movieMsg.id)" class="msg-all-Comment">查看全部影评</p>
              <Tag class="tag-font"></Tag>
            </div>
        </mt-tab-container-item>
      </mt-tab-container>   
  </div>
</template>

<script>
import star from '../star/star'
import Title from '../layout/header_title'
import { api } from '../../global/api'
import store from '../../store/index'
import tag from '../layout/tag'

  export default {
    components: {
      star:star,
      T:Title,
      Tag:tag,
    },
    data () {
      return {
        selected:"1",
        user:store.state.loginuser.user,
        status1:false,
        status2:false,   
        commentsMsg: {
          
          subject: {
            title: ''
          }
        },
        contentShow:false,
        indexarr:[],
        movieMsg: {
          'rating': {
            'average': '',
          },
          'images': {
            'small': '',
            'medium': ''
          },
          'casts': [
            {
              'avatars': {
                'small': '',
                'medium': ''
              },
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'directors': [
            {
              'avatars': {
                'small': '',
                'medium': ''
              },
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'genres': [],
          comments: [{
            author: {
              uid: '',
              avatar: '',
              name: ''
            },
            content: '',
            create_at: ''
          }],
        }
      }
    },
    
    mounted: function () {
      this.getMovie()
    },
    methods: {
      getMovie(){
        this.$http.get(api.movie_basic + this.$route.params.id ).then(function (response) {
              const _this = this
               _this.movieMsg = response.body
              console.log("movie_basic接口数据为:",response)
        }).catch(function (response) {
                console.log(response)
        });
        this.$http.get(api.movie_basic + this.$route.params.id+"/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd" ).then(function (response) {
              const _this = this
               _this.comments = response.body.comments
              console.log("movie_comments短评接口数据为:",response)
              console.log("comments:",_this.comments)
        }).catch(function (response) {
                console.log(response)
        });
        this.$http.get(api.movie_basic + this.$route.params.id+"/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd" ).then(function (response) {
                  this.commentsMsg = response.body
                  console.log("movie_comments影评接口数据为:",response)
        }).catch(function (response) {
                    console.log(response)
        });
      },
        
      starMsg: function (str) {
        const path = '/starmsg/' + str
        this.$router.push({path: path})
      },
      comment: function (str) {
        const path = '/comment/' + str
        this.$router.push({path: path})
      },
      smallComment: function (str) {
        const path = '/smallComment/' + str
        this.$router.push({path: path})
      },
      backLastPage: function () {
        window.history.go(-1)
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
      write:function(str){
        if(this.user!=null){
            const path = '/moviemsg/' + str + '/writecomment'
            this.$router.push({path: path})
        }else{
          this.$toast({
              message: '还未登录,请先登录!',
              position: 'bottom',
              duration: 2000,
              className:"errtoast"        
          }); 
        }
      },
      want(str){
          this.status1=true;
          let date=new Date()
          let year=date.getFullYear(); 
          let month=date.getMonth();
          let day=date.getDate();
          let hours=date.getHours();
          let minutes=date.getMinutes();
          let seconds=date.getSeconds();
          let date1=""+year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+"";
          str.date=date1
          let par=JSON.parse(JSON.stringify(str))
          store.dispatch('setWantInfo',par); 
      },
      watched(str){
          this.status2=true;
          let date=new Date()
          let year=date.getFullYear(); 
          let month=date.getMonth();
          let day=date.getDate();
          let hours=date.getHours();
          let minutes=date.getMinutes();
          let seconds=date.getSeconds();
          let date1=""+year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds+"";
          str.date=date1
          let par=JSON.parse(JSON.stringify(str))
          store.dispatch('setWatchedInfo',par); 
      }
    }
  }
</script>

<style scoped>
  .msg-img{
    margin-right: 5%;
    margin-top: 5%;

  }
  .msg-img img {
    border: 1% solid white;
  }
  .msg-movie {
    display: flex;
    padding: 3%;
    color: #6b6868;
    background-color: #b4b1b1;
  }
  .msg-movie:last-child {
    padding-left: 5%;
  }
  .msg-movie-title {
    font-size: 1.3rem;
    color: #343232;
    margin-top: 0;
    margin-bottom: 3%;
  }
 
  .msg-count {
    /* display: flex;
    justify-content: center; */
    width: 100%;
    padding: 5% 3%;
  }
  .mint-button{
    width: 35%;
    margin-right: 5%;
  }
  .msg-summary {
    padding: 3%;
    font-size: 1.0rem;
    color: #555;
    text-align: left;
  }
  .msg-star-wrap {
    padding: 2%;
  }
  .msg-scoll {
    white-space: nowrap;
    overflow-x: scroll;
    margin-top: 5%;
  }
  .msg-scoll-hidden {
    overflow: hidden;
    height: 20%;
    margin: 0 auto;
  }
  .msg-scoll > div {
    display: inline-block;
    margin-right: 5%;
  }
  .msg-star-name {
   
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .msg-duanping {
    padding: 1%;
    box-sizing: border-box;
    overflow: auto;
    text-decoration: none;
  }
  .comment{
    display: flex;
  }
  .comment_right{
    margin-left: 5%;
    margin-top: 3%;
    width: 70%;
  }
  .msg-star-wrap h3,
  .msg-duanping h3 {
    color: #666;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 5%;
  }
  .author-content {
    color: #333;
    margin-bottom: 10%;
    margin-top: 10%;
    font-size: 0.8rem;
  }
  .author-img {
    flex: 1;
    margin-bottom: 5%;
    border-bottom: 1% solid #d6d3d3;
  }
  .author-img:last-child {
    margin-bottom: 0;
  }
  .author-img img {
    border-radius: 50%;
    margin-right: 3%;
  }
  .author-img span {
    vertical-align: 30%;
    margin-left: 3%;
    color: #999;
    font-size: 1.0rem;
  }
  .msg-all-Comment {
    color: #e54847;
    font-weight: lighter;
    text-align: center;
    font-size: 1.0rem;
    width: 100%;
    height: 30%;
    border-bottom: 1% solid #d6d3d3;
  }

  .msg-rating {
    display: flex;
  }
  .msg-rating:last-child {
    flex: 1;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid #e54847;
    color:  #e54847;  
  }
  .largeCom-wrap {
    padding: 2%;
    text-align: left;
  }
  .write{
    float: right;
    padding-right: 3%;
  }
  .largeCom-content {
    margin-bottom: 2%;
    margin-top: 3%;
    border-bottom: 1px solid #d6d6d6;
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
  .tag-font{
    text-align: center;
  }
</style>