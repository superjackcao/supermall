// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 接收客户端传递过来的页码
    const page = req.query.page;
    // 标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'article';

    // 查询所有文章数据
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 像数据库发送查询请求
    let result = await pagination(Article).page(page).size(2).display(3).find().populate('author').exec();

    //使用stringify()方法和parse()方法，将对象转换为字符串，然后再次使用parse()方法转换为JSON格式。
    //注意：传递数据的时候是传递转换后的json变量。
    let str = JSON.stringify(result);
    let articles = JSON.parse(str);

    // res.send(articles);
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles
    });
};