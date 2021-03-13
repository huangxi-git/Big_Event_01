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
})