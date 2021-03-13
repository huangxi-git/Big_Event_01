$(function () {

    // 登录页面的 点击注册按钮，显示注册页面，关闭登录页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 注册页面的 点击去登录按钮，显示登录页面，关闭注册页面
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 自定义验证规则
    let form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            // 属性选择器
            let pwd = $(".reg-box input[name=password]").val();
            // 比较
            if (value !== pwd) {
                return " 两次密码输入不一样 ";
            };
        },
    });




    // 在layui 里拿数据
    let layer = layui.layer;
    // 注册表单提交
    $('#form-reg').on('submit', function (e) {
        // console.log(1234);
        // 阻止提交
        e.preventDefault();
        // 请求
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val(),
            },
            success: (res) => {
                // console.log(res);
                // 注册提示
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('注册成功，请登录！');
                // 手动切换到登录页面
                $('#link_login').click();
                // 重置form表单，$('#form-reg') 要转为 dom 元素（[0]）
                $('#form-reg')[0].reset();
            },
        });
    });



    // 登录表单提交
    $('#form_login').on('submit', function (e) {
        // console.log(1234);
        // 阻止提交
        e.preventDefault();
        // 请求
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                // 注册提示
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('登录成功！');
                // 保存token，将来要用
                localStorage.setItem('token', res.token);
                // 跳转页面
                location.href = '/index.html';
            },
        });
    });


















});