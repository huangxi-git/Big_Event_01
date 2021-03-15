$(function () {
    // 自定义验证
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return '昵称长度1-6！';
            }
        }
    })
})