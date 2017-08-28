# projectname

> A Vue.js project

## 项目介绍

脚手架：vue-cli</br>
模板：vue2</br>
技术栈：webpack + vue + vue-router + less + vuex + mintUI + vue-star-rating</br>
预览效果：</br>
### 上映电影信息和电影详情
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/Received.gif)
![image](https://github.com/Anni4031/FilmApp/blob/master/gif/movieMsg.gif)


## 项目功能

- 正在热映、即将上映、榜单、热门、我的、电影详情页、影人详情页、短论、影评、搜索页和搜索结果展示
- 登录、注册
- 收藏/取消收藏(影人)、写影评、设置、已看过、想看
- 搜索

## Mint-ui

ui库使用的是mint-ui,直接引用使用
``` bash
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
```
## 请求豆瓣api

在proxyTable中配置代理
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
## 项目布局
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
