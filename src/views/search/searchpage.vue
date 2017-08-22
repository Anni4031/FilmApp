<template>
  <div>
    <div class="search-wrap">
      <input id="inp" v-model="query.q" @keyup.enter="submit()">
      <span @click="notSubmit()">取消</span>
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <button v-for="(item,index) in hotSearch" @click="search(item.id,index)">{{item.name}}</button>
    </div>
  </div>
</template>

<script>
import store from '../../store/index'
  export default {
    data () {
      return {
        query: {
          "q": null,         //明星、导演姓名
          "tag": null,       //类型
        },
        hotSearch: [
          {name: '彭于晏', id: '1013782'},
          {name:'赵丽颖',id:'1275620'},
          {name: '张艺谋', id: '1054398'},
          {name: '吴京', id: '1000525'},
          {name: '刘亦菲', id: '1049732'},
          {name: '杨洋', id: '1276051'},
          {name: '喜剧', id: null},
          {name: '悲剧', id: null},
          {name: '悬疑', id: null},
          {name: '剧情', id: null},
          {name: '冒险', id: null},
        ]
      }
    },
    methods: {
      submit: function () {
        this.$router.push({path: '/searchResult'})
        console.log("q",this.query.q)
        this.query.tag=this.query.q
        var  par = JSON.parse(JSON.stringify(this.query))
        store.dispatch("setSearchval",par)
        this.query.q = ""

      },
      search: function (str,index) {
        if(str!==null){
          const path = '/starmsg/' + str
          this.$router.push({path: path})
        }else{
          let hot={
            q:this.hotSearch[index].name,
            tag:this.hotSearch[index].name
          }
          console.log("热门搜索:",hot)
          var  par = JSON.parse(JSON.stringify(hot))
          store.dispatch("setSearchval",par)
          this.$router.push({path: '/searchResult'})
        }
        
      },
      notSubmit: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  .search-wrap {
    display: flex;
    padding: 5%;
    height: 50%;
  }
  .search-wrap input {
    flex: 1;
    text-decoration: none;
    border: 1px solid #E5E9F2;
    border-radius: 15px;
    padding-left: 2rem;
  }
  .search-wrap span {
    margin-left: 5%;
    font-size: 1.1rem;
    align-self: center;
    cursor: pointer;
  }
  .hot-search {
    padding: 5%;
  }
  .hot-search h3 {
    font-size: 1.2rem;
  }
  .hot-search button {
    background-color: white;
    border-style: none;
    padding: 3%;
    margin-right: 3%;
    border-radius: 10px;
    margin-bottom: 3%;
    margin-top: 2%;
    color: #e54847;
  }
</style>