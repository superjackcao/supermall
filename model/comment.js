// 引入mongoose模块
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: ObjectId,
        ref: 'Article'
    },
    // 用户id
    uid: {
        type: ObjectId,
        ref: 'User'
    },
    // 评论时间
    time: {
        type: Date
    },
    // 评论内容
    content: {
        type: String
    }
});

// 应用评论集合规则创建评论集合
const Comment = mongoose.model('Comment', commentSchema);

// 将评论集合构造函数作为模块成员导出
module.exports = {
    Comment
}

// mongodb://root:root@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}?authSource=admin