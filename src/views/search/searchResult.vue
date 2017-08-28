<template>
	<div class="result">
    <Top></Top>
		<h1 class="title">'{{val.q}}'的搜索结果,共{{search_result.total}}条信息 </h1><!--  -->
		<div  class="res-theaters-area">
		  <div class="res-movies-wrap" >
		    <div class="res-movies-show" v-for="(item, index) in search_result.subjects" @click="search(item.id)">
		      <div class="res-movies-show-child">
		        <div><img :src="item.images.small" :alt="item.alt"></div>
		        <div class="res-movieMsg">
		          <h2>{{ item.title }}</h2>
		          <star :score="item.rating.average"></star>
		          <p>{{ item.rating.average }}分({{ item.collect_count }}评价)</p>
		          <p>{{ item.year }}年</p>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
    <Tag></Tag>
	</div>
</template>

<script>
import top from '../layout/header'
import star from '../star/star'
import {api } from '../../global/api'
import store from '../../store/index'
import tag from '../layout/tag'

  export default {
    data () {
      return {
        val: store.state.search.searchval,
        search_result: {
        }
      }
    },
    created: function () {
      this.showMoreMsg()
    },
    components: {
      Top:top,
      star: star,
      Tag:tag,
    },
    watch: {
      $route: 'showMoreMsg'
    },
    methods: {
      // 搜索结果
      showMoreMsg: function () {
        let par=JSON.parse(JSON.stringify(this.val))
        this.$http.get(api.movieSearch,{params: par}).then(function (response) {
          this.search_result = response.body
          console.log(response)
        }).catch(function (response) {
          console.log(response)
        })
      },
      search: function (str) {
        const path = '/moviemsg/' + str
        this.$router.push({path: path})
      }
    }
  }
</script>

<style scoped>
  .res-theaters-area {
    font-size: 0;
  }
  .res-movies-wrap {
    text-decoration: none;
    font-size: 0;
  }
  .res-movies-show {
    padding: 4% 8%;
    background-color: #f8f8f8;
    cursor: pointer;
    font-size: 0;
  }
  .res-movies-show-child {
    display: flex;
    align-items: center;
    padding-bottom: 4%;
    border-bottom: 1px solid #d6d6d6;
  }
  .res-movieMsg {
    flex: 1;
    padding-left: 8%;
    vertical-align: top;
  }
  .res-movieMsg h2 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 3%;
  }
  .res-movies-show p {
    font-size: 0.8rem;
    line-height: 2;
    color: #666;
  }
  .title {
    font-size: 1.4rem;
    font-weight: 700;
    padding-top: 4%;
    padding-bottom: 4%;
    text-align: center;
    background-color: #f2fbfb;
  }
</style>