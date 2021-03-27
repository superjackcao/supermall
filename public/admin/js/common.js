// 获取表单中用户输入的值
// 值的格式为{input的名字：value值}  例：{email: 2498032525@qq.com, password: '1234566'}
function serializeToJson(form) {
    let result = {};
    // serializeArray()方法获取到表单中用户输入的内容 返回值是一个[], 数组中存储着对象[{name:'email', value:'用户输入的内容'}]，对象数量取决于表达那中有多少个控件
    let loginValue = form.serializeArray();
    loginValue.forEach(function(item) {
        //result.email
        result[item.name] = item.value;
    });
    return result;
};