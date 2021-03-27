// 导入用户集合
const { User } = require('../../model/user')

// 导入bcrypt模块
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    // 接收客户端传递过来的请求参数
    const { username, email, role, state } = req.body;
    // 即将要修改的用户id
    const id = req.query.id

    // res.send(body.password);
    let user = await User.findOne({ _id: id });

    // 密码比对
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) {
        //密码比对成功
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });

        // 重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        //密码比对失败
        // 触发错误中间件 重定向到/admin/user-edit页面 并把错误信息显示出来
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息修改', id: id };
        next(JSON.stringify(obj));
    }
}