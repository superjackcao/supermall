// 导入bcrypt模块
const bcrypt = require('bcrypt');


async function run() {
    // 生成随机字符串
    // genSalt()方法接收一个数值
    // 数值越大生成的随机字符串复杂度越高
    // 数值越小生成的随机字符串复杂度越低
    // 默认是10
    // 返回值是随机字符串
    let salt = await bcrypt.genSalt(10);

    // 对密码进行加密
    //  1.要加密的明文
    //  2.随机字符串
    // 返回值是加密后的密码
    let pass = await bcrypt.hash('明文密码', salt);

    console.log(salt);
    console.log(pass);
}
run();