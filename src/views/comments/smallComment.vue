<template>
  <div>
     
    <T :title="('短评--'+commentsMsg.subject.title)"></T>
      <section class="all-smallCom"> 
        <div v-for="item in commentsMsg.comments" class="smallCom">
          <div class="smallCom-rating">
            <star :score="item.rating.value*2" class="smallCom-star"></star>
            <span class="">{{item.created_at}}</span>
          </div>
          <div class="smallCom-content">
            {{item.content}}
          </div>
          <div class="smallCom-author">
            <img :src="item.author.avatar" :alt="item.author.alt">
            <div class="smallCom-author-msg">
              <span class="smallCom-author-name">{{item.author.name}}</span>
              <span class="smallCom-agreecount">{{item.useful_count}}赞同</span>
            </div>
          </div>
        </div>
      </section>
      <Tag></Tag>
  </div>
</template>

<script>
import star from '../star/star'
import Title from '../layout/header_title'
import { api } from '../../global/api'
import tag from '../layout/tag'

  export default {
    data () {
      return {
        commentsMsg: {
          subject:{}
        }
      }
    },
    components: {
      star: star,
      T:Title,
      Tag:tag,
    },
    mounted: function () {
      // 短评
      this.$http.jsonp(api.movie_basic + this.$route.params.id+"/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd" ).then(function (response) {
               this.commentsMsg = response.body
               this.commentsMsg.subject=response.body.subject
              console.log("movie_smallcomments接口数据为:",response)
        }).catch(function (response) {
                console.log(response)
        });
    },
    methods: {
      backLastPage: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .all-smallCom {
    padding: 3%;
  }
  .smallCom {
    border-bottom: 1px solid #d6d3d3;
  }
  .smallCom-rating {
    margin-top: 3%;
    color: #999;
  }
  .smallCom-star {
    display: inline-block;
  }
  .smallCom-content {
    color: #333;
    font-size: 0.9rem;
    margin-bottom: 3%;
    margin-top: 3%;
  }
  .smallCom-author {
    display: flex;
    margin-bottom: 3%;
  }
  .smallCom-author img {
    height: 15%;
    width: 15%;
    border-radius: 24px;
  }
  .smallCom-author-msg {
    flex: 1;
    /* line-height: 100%; */
    margin-left: 3%;
    margin-top: 3%;
    color: #999;
  }
  .smallCom-agreecount {
    float: right;
    margin-right: 3%;
  }
</style>
