// 入口函数
$(function () {

    // 调用函数
    getUserInfo()

    // 点击退出按钮
    let layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // 框架提供的询问框
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地 token 
            localStorage.removeItem('token');
            // 跳转页面
            location.href = '/login.html'
            // 关闭询问窗口
            layer.close(index);
        })
    })

});

// 获取用户信息，封装到入口函数外面
// 声明全局函数，其他地方/模块可以调用
function getUserInfo() {
    // 发送请求
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 获取登录
        //     Authorization: localStorage.getItem("token") || "",
        // },
        success: (res) => {
            // console.log(res.data);
            if (res.status != 0) {
                // 传入错误，提示
                return layui.layer.msg(res.message);
            };
            // 请求成功，渲染头像
            // 调用函数
            renderAvatar(res.data);
        },
    });
};


// 头像函数
function renderAvatar(user) {
    // 渲染名称 user.nickname 优先,如果没有，就用 user.username
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎 ' + name);
    // 渲染头像
    if (user.user_pic !== null) {
        // 判断有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        // 拿到用户名第一个字符并转为大写
        let text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }
}