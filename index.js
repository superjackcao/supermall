// 引入express框架
const express = require('express');
// 引入系统路径拼接模块
const path = require('path');
// 引入body-parser模块
const bodyParser = require('body-parser');
// 引入express-session模块
const session = require('express-session');
// 导入art-template引擎模块
const template = require('art-template');
// 引入时间格式化第三方模块dateformat
const dateFormat = require('dateformat');
// 引入第三方模块morgan
const morgan = require('morgan');
// 导入config模块
const config = require('config');



// 创建网站服务器
const server = express();

// 引入数据连接模块
require('./model/connect');

// 创建初始化用户
// require('./model/user');

// 处理post请求参数
server.use(bodyParser.urlencoded({ extended: false }));

// 配置session
server.use(session({ secret: 'secret key' }));

// 当渲染后缀为art的模板时，所使用的模板引擎是什么
server.engine('art', require('express-art-template'));
// 告诉express框架模板的所在位置
server.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
server.set('view engine', 'art');
// 向模板内部导入dateformate变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
server.use(express.static(path.join(__dirname, 'public'))); // 访问首页内容localhost/home/default

console.log(config.get('title'));

// 获取系统环境变量 返回值是对象
// if (process.env.NODE_ENV == 'development') {
//     // 当前是开发环境
//     console.log('当前是开发环境');
//     server.use(morgan('dev'));
// } else {
//     // 当前是生产环境
//     console.log('当前是生产环境');
// }

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求，判断用户登录状态
server.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径
server.use('/home', home);
server.use('/admin', admin);

// 错误处理中间件
server.use((err, req, res, nex) => {
    // 将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口
server.listen(80);
console.log('网站服务器成功建立')