// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 导入bcrypt模块
const bcrypt = require('bcrypt');

// 引入joi模块
const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        unique: true, // 保证邮箱地址不重复
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: { //admin为超级管理员   normal为普通管理员
        type: String,
        require: true
    },
    state: { //字段值为0，启用状态   字段为1，禁用状态
        type: Number,
        default: 0
    }

});

// 使用集合规则创建集合
const User = mongoose.model('User', userSchema);

// 对用户创建数据库中的密码进行加密
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    // 创建数据到数据库中
    const user = await User.create({
        username: 'caoxudong',
        email: 'caoxudong@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    });
};
// createUser();

// 验证用户信息
const validateUser = user => {

    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合规则')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    // 实施验证
    return Joi.validate(user, schema);

};

// 将用户集合作为模块成员进行导出
module.exports = {
    User, // User: User 在es6中如果对象的键和值名称一样，可以省略掉值
    validateUser
};