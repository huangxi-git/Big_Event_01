// 开发环境服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net';
// 测试环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';
// 生产环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net';
// 截取所有api请求，get(),post(),ajax()
$.ajaxPrefilter(function (options) {

    // http://127.0.0.1:5500/index.html
    // 拿到所有数据
    // console.log(options);
    // 拼接对应环境的服务器地址
    options.url = baseURL + options.url;

    // 身份验证
    if (options.url.indexOf('/my/') !== -1) {
        options.header = {
            Authorization: localStorage.getItem('token') || '',
        }
    };


    // 拦截所有响应，判断身份验证信息
    params.complete = function (res) {
        console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.messge == '身份验证失败！') {
            // 清空本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
        }
    }
});