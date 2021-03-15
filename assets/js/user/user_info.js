$(function () {
    // 自定义验证
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return '昵称长度1-6！';
            };
        },
    });

    // 渲染用户信息，其他模块要用,封装
    initUserInfo();
    // 导出layer
    let layer = layui.layer;
    function initUserInfo() {
        // 发送请求
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                // 提交失败
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                // 提交成功
                form.val('formUserInfo', res.data);
            },
        });
    };


    // 点击重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // 用上面函数渲染
        initUserInfo();
    });


    // 修改用户信息
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                };
                layer.msg('修改成功');
                // 调用父级页面中更新用户信息的函数，需要用到windows.parent获取到父级
                window.parent.getUserInfo();
            },
        });

    })

})