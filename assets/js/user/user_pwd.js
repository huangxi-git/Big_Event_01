$(function () {

    // 点击 提交（button） 按钮时，会自动产生 submit事件，
    // 下面的 forn 遇到 submit 会自动提交
    // 定义密码规则
    let form = layui.form;
    form.verify({
        // 所有密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须要6-12'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码不能和旧密码一致';
            };
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码面必须一致';
            };
        },
    });



    // 修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.messge);
                }
                layui.layer.msg('修改密码成功！');
                // 清空输入框
                $('.layui-form')[0].reset();
            },
        });
    })

})