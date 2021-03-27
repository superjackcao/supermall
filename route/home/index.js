// 引入文章集合构造函数
const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    // 接收客户端传递过来的get参数
    const page = req.query.page

    // 从文章集合中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // res.send(result);
    // return;
    let str = JSON.stringify(result);
    let articles = JSON.parse(str);
    // 渲染模板并传递数据
    res.render('home/default.art', {
        articles: articles
    })
};