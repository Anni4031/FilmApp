<template>
  <div>
    <mt-header :title="movieMsg.title" class="header-title">
      <router-link to="/" slot="left">
        <mt-button icon="back"  class="i"></mt-button>
      </router-link>
    </mt-header>
    
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
        <div>{{movieMsg.wish_count}}人想看</div>
        <div>{{movieMsg.reviews_count}}人看过</div>
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

      <section class="msg-duanping">
        <h3>热门短评</h3>
        <div v-for="item in movieMsg.comments">
          <div class="msg-rating">
            <star :score="item.rating.value*2"></star>
            <span>{{item.created_at}}</span>
          </div>
          <p class="author-content">{{item.content}}</p>
          <div class="author-img">
            <img :src="item.author.avatar" :alt="item.author.alt">
            <span>{{item.author.name}}</span>
          </div>
        </div>
        <p @click="smallComment(movieMsg.id)" class="msg-all-Comment">查看全部短论</p>
        <p @click="comment(movieMsg.id)" class="msg-all-Comment">查看全部影评</p>
      </section>
    
  </div>
</template>

<script>
import star from '../star/star'
import { api } from '../../global/api'
  export default {
    components: {
      star
    },
    data () {
      return {
        guodu: true,
        movieMsg: {
          'rating': {
            'max': '',
            'average': '',
            'details': {
              '1': '',
              '3': '',
              '2': '',
              '5': '',
              '4': ''
            },
            'stars': '',
            'min': 0
          },
          trailer_urls: [],
          collect_count: '',
          'wish_count': '',
          'reviews_count': '',
          'images': {
            'small': '',
            'large': '',
            'medium': ''
          },
          'alt': '',
          'year': '',
          'pubdates': [],
          'id': '',
          'pubdate': '',
          'title': '',
          'languages': [],
          'countries': [],
          'writers': [{
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            },
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'casts': [
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'summary': '',
          'directors': [
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'durations': [],
          'genres': [],
          comments: [{
            rating: {
              max: '',
              min: '',
              value: ''
            },
            author: {
              uid: '',
              avatar: '',
              name: ''
            },
            content: '',
            create_at: ''
          }],
          comments_count: '',
          popular_reviews: ''
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
        this.$http.get(api.movie_basic + this.$route.params.id+"/comments" ).then(function (response) {
              const _this = this
               _this.movieMsg.comments = response.body
              console.log("movie_comments接口数据为:",response)
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
      }
    }
  }
</script>

<style scoped>

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
  .msg-img{
    margin-right: 2%;
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
    display: flex;
    justify-content: center;
    padding: 3%;
  }
  .msg-count div {
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
  .msg-summary {
    padding: 3%;
    font-size: 1.0rem;
    color: #555;
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
    overflow: hidden;
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
    padding: 6%;
    box-sizing: border-box;
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
  }
  .author-img {
    margin-bottom: 10%;
    border-bottom: 1% solid #d6d3d3;
  }
  .author-img:last-child {
    margin-bottom: 0;
  }
  .author-img img {
    border-radius: 50%;
  }
  .author-img span {
    vertical-align: 30%;
    margin-left: 5%;
    color: #999;
  }
  .msg-all-Comment {
    color: #e54847;
    font-weight: lighter;
    text-align: center;
    font-size: 1.2rem;
    height: 30%;
    border-bottom: 1% solid #d6d3d3;
  }
  .msg-rating {
    display: flex;
  }
  .msg-rating:last-child {
    flex: 1;
  }
</style>