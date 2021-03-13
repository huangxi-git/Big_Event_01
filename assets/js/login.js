$(function () {

    // 点击注册按钮，显示注册页面，关闭登录页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击去登录按钮，显示登录页面，关闭注册页面
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });






});