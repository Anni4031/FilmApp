<template>
  <div>
      <T :title="(starMsg.name_en+starMsg.name)"></T>
      
      <section class="star-msg">
        <img :src="starMsg.avatars.large">
        <div>
          <h3>影星资料</h3>
          <p>{{starMsg.name}}</p>
          <p>{{starMsg.name_en}}</p>
          <p>{{starMsg.gender}}</p>
        </div>
      </section>

      <section class="star-count">
        <div @click="collect(starMsg)" v-if="isShow==true">+收藏</div>
        <div @click="delCollect(starMsg)" v-else>已收藏</div>
        <div>12346<!-- {{movieMsg.reviews_count}} -->人已收藏</div>
      </section>
     
      <section class="star-movie-wrap">
        <h3 v-if="starMsg.gender == '男'">他的代表作品</h3>
        <h3 v-if="starMsg.gender == '女'">她的代表作品</h3>
        <div class="star-movie" @click="movieMsg(item.subject.id)" v-for="item in starMsg.works">
          <div>
            <img :src="item.subject.images.small">
          </div>
          <div>
            <div>
              <p>{{item.subject.title}}</p>
              <p v-for="it in item.roles">{{it}}</p>
              <p>{{item.subject.year}}</p>
            </div>
            <div>
              <star :score="item.subject.rating.average"></star>
              {{item.subject.rating.average}}分 
              {{item.subject.collect_count}}人评价
            </div>
          </div>
        </div>
      </section>
      <Tag></Tag>
  </div>
</template>

<script>
import star from '../star/star'
import {api } from '../../global/api'
import Title from '../layout/header_title'
import store from '../../store/index'
import tag from '../layout/tag'

  export default {
    data () {
      return {
        starMsg: {
          avatars: {
            small: '',
            large: '',
            medium: '',
          },
        },
        isShow:true,
        collectarr:store.state.starcollect.collectInfo
      }
    },
    components: { star:star,T:Title,Tag:tag},
    mounted: function () {
      // 某个影星资料
      this.$http.jsonp(api.movie_celebrity + this.$route.params.id).then(function (response) {
            this.starMsg = response.body
            console.log(response)
            console.log("movie_celebrity接口数据为:"+response)

          })
          .catch(function (response) {
            console.log(response)
          })
    },
    methods: {
      movieMsg: function (str) {
        const path = '/moviemsg/' + str
        this.$router.push({path: path})
      },
      backLastPage: function () {
        window.history.go(-1)
      },
      // 收藏
      collect(msg){
        if(msg!=null){
          store.dispatch("setCollectInfo",msg)
          this.isShow=false   
        }
      },
      // 取消收藏
      delCollect(msg){
        this.isShow=true;
        let suoyin=this.collectarr.indexOf(msg)
        this.collectarr.splice(suoyin,1)
        console.log(this.collectarr)
      }

    }
  }
</script>

<style scoped>
  .star-msg {
    background-color: #b4b1b1;
    padding: 3%;
    padding-left: 0;
  }
  .star-msg img {
    width: 40%;
    height: 45%;
    margin-right: 8%;
  }
  .star-msg div {
    display: inline-block;
    font-size: 1.2rem;
    color: #f0eeee;
    vertical-align: bottom;
  }
  .star-msg h3 {
    font-size: 1.5rem;
    color: white;
  }
  .star-movie-wrap {
    padding: 3% 5%;
  }
  .star-movie-wrap h3 {
    color: #333;
    font-size: 1.0rem;
    margin-bottom: 2%;
  }
  .star-movie {
    display: flex;
    padding: 2%;
    font-size: 0.8rem;
    border-bottom: 1px solid #d6d3d3;
  }
  .star-movie img {
    padding-top: 2%;
  }
  .star-movie > div:first-child {
    width: 35%;
    margin-right: 5%;
    margin-top: 2%;
  }
  .star-movie > div:last-child {
    flex: 1
  }

  .star-count {
    display: flex;
    justify-content: center;
    padding: 3%;
  }
  .star-count div {
    margin-right: 5%;
    margin-left: 5%;
    padding: 3%;
    font-size: 1.0rem;
    text-align: center;
    width: 35%;
    height: 30%;
    color: white;
    border-radius: 5px;
    background-color: #e54847;
  }
</style>