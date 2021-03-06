# projectname

> A Vue.js project

## 项目介绍

脚手架：vue-cli</br>
模板：vue2</br>
技术栈：webpack + vue + vue-router + vue-resource + less + vuex + mintUI + vue-star-rating</br>
部分效果图：</br>
### 上映电影信息和电影详情
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/Received.gif)
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/movieMsg.gif)
### 影星信息和短论、影评
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/starMsg.gif)
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/comment.gif)
### 我的和找片
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/my.gif)
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/eye.gif)
### 搜索和设置
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/search.gif)
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/set.gif)


## 项目功能

- 正在热映、即将上映、榜单、热门、我的、电影详情页、影人详情页、短论、影评、搜索页和搜索结果展示
- 登录、注册
- 收藏/取消收藏(影人)、写影评、设置、已看过、想看
- 搜索、三大榜单之一的全部内容
- 购票、在看功能未实现

## Mint-ui

ui库使用的是mint-ui,直接引用使用
``` bash
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
```
## 请求豆瓣api
第一种方式:在proxyTable中配置代理
``` bash
proxyTable: {
        '/v2': {
            target: 'http://api.douban.com',
            changeOrigin : true,
            pathRewrite: {
              '^/v2': '/v2'
            }
        }
    },
```

项目中使用了以下api
- /v2/movie/in_theaters 正在上映的电影
- /v2/movie/coming_soon 即将上映的电影
- /v2/movie/top250 Top250
- /v2/movie/new_movies?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd 新片榜
- /v2/movie/weekly?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd 口碑榜
- /v2/movie/subject/:id  单个电影信息
- /v2/movie/celebrity/:id  单个影人信息
- /v2/movie/search?q={text}&tag={text} 电影搜索

第二种方式:jsonp
如:
``` bash
this.$http.jsonp(api.movietop).then(function (response) {
    let data= response.body;
    this.title1=data.title;
    this.listarr.push(data)
    console.log(this.listarr)
    console.log("movietop接口数据为:",response)

}).catch(function (response) {
      console.log(response)
});
api.js
let filmApiBaseUrl="http://api.douban.com" 
export const api = {   
    "in_theaters":filmApiBaseUrl+"/v2/movie/in_theaters",  //正在热映 获取电影列表
    "movieSearch":filmApiBaseUrl+"/v2/movie/search",    //搜索
    "coming_soon":filmApiBaseUrl+"/v2/movie/coming_soon", //即将上映
    "movietop":filmApiBaseUrl+"/v2/movie/top250",  //排行250
    "movie_basic":filmApiBaseUrl+"/v2/movie/subject/", //电影条目
    "movie_box":filmApiBaseUrl+"/v2/movie/us_box", //北美榜
    "movie_celebrity":filmApiBaseUrl+"/v2/movie/celebrity/", //影人信息
    "new_movies":filmApiBaseUrl+"/v2/movie/new_movies",//新片榜
    "movie_weekly":filmApiBaseUrl+"/v2/movie/weekly",//口碑榜
    "hot":url.staticPath+"dataJson/hot.json",//热门
}
 ```      
### vue-resource

这里使用vue-resource进行数据交互

## Vuex

vuex用来管理全局状态，用起来很方便，可以查看vuex文档进行学习

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```



For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
