<template>
  <div class="bg">
    <div class="search-wrap">
      <div class="search bar7">
        <input type="text" v-model="query.q" @keyup.enter="submit()" ><img src="../../assets/images/search.png" alt="" width="7%">
        <div @click="notSubmit()">取消</div>
        
      </div>
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
          "q": null,         //影片、明星、导演姓名
          "tag": null,       //类型
        },
        hotSearch: [
          {name: '金刚狼3', id: '25765735'},
          {name: '一条狗的使命', id: '6873143'},
          {name: '生化危机:终章', id: '20471852'},
          {name: '乐高蝙蝠侠', id: '26145033'},
          {name: '爱乐之城', id: '25934014'},
          {name: '欢乐好声音', id: '26354572'},
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
          const path = '/moviemsg/' + str
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
.bar7 {
    height:30%;
    flex: 1;
}
.bar7 input {
  width:55%;
  height: 2rem;
  border-radius:42px;
  border:2px solid #e54847;
  background:#F9F0DA;
  transition:.3s linear;
  float:left;
  font-size: 1.2rem;
  padding-left: 12%;
}
.bar7 input:focus {
  width:70%;
  background: #fff;
}
.bar7 img{
    position: absolute;
    top: 7.5%;
    left: 10%;
    border: none;
    cursor: pointer; 
}
  .bg{
    background-color: #eaeaea;
    width: 100%;
    height: 100%;
    padding-bottom: 85%;
  }
  .search-wrap {
    display: flex;
    height: 30%;
    padding: 10% 5%;
    
  }
  .bar7 div {
    font-size: 1.1rem;
    text-align: center;
    cursor: pointer;
    padding-top: 2%;
  } 
  .hot-search {
    padding: 0 5%;
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