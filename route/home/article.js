// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //接受客户端传递过来的文章id值
    const id = req.query.id;
    // 根据id查询文章详细信息
    let result = await Article.findOne({ _id: id }).populate('author');
    // 查询当前文章所对应的品论信息
    let result1 = await Comment.find({ aid: id }).populate('uid');


    // 转换json格式问题
    let str = JSON.stringify(result);
    let article = JSON.parse(str);

    let str1 = JSON.stringify(result1);
    let comments = JSON.parse(str1);

    res.render('home/article.art', {
        article: article,
        comments: comments
    });
};