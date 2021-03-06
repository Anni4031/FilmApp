//接口配置

//把全体接口封装在的前端配置文件（序号与接口文档一一对应），多个环境配置时可快速切换整站式的全部接口，不用逐个页面去改。
const config = require('../../config');

let url = {
    apiUrl: "/ccp-web/api", //接口路径
    //ctxPath: "/ccp-web/dist", //tomcat服务dist目录
    ctxPath: "/dist", //node服务dist目录

    //staticPath:config.dev.staticPath,       //开发环境静态资源路径  
    staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath
};

//----------------请注意：如果正式环境，不需要本地json数据模拟，请删除以上代码和api中的模拟接口。----------------

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

