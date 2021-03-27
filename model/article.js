// 1.引入mongoose模块
const string = require('joi/lib/types/string');
const mongoose = require('mongoose');
// 2.创建文章结合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, '请填写文章标题']
    },
    author: { //作者字段实际上存储的是用户集合中的_id字段
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: { //发布时间
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }

});
// 3.根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// 4.将集合规则作为模块成员进行导出
module.exports = {
    Article: Article
};