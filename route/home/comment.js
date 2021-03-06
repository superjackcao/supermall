// 导入评论集合构造函数
const { Comment } = require('../../model/comment');
const ObjectId = require('mongodb').ObjectId;

module.exports = async(req, res) => {
    // res.send('ok');
    // // 接受客户端传递过来的请求参数
    let { content, uid, aid } = req.body;
    // const {  } = ObjectId(req.body);
    uid = uid.replace("\"", "").replace("\"", "");
    // // 将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });


    // // 将页面重定向回文章详情页面
    res.redirect('/home/article?id=' + aid);
};