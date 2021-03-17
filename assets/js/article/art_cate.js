$(function () {

    // 渲染页面
    initArtCateList();

    // 封装函数，其他模块要用
    function initArtCateList() {
        // 发送请求
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                // 模板引擎
                let str = template('tpl-art-cate', { data: res.data })
                $('tbody').html(str);
            },
        });
    };


    // 空变量保存添加弹出层
    let indexAdd = null;
    // 弹出层--显示添加文章
    var layer = layui.layer;
    $('#btnadd').on('click', function () {
        // 弹出一个添加文章分类信息的层
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            // 将 HTML 中的模板引擎内容放到弹窗内
            content: $('#dialog-add').html(),
        });
    });

    // 提交文章分类添加--事件委托
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 添加成功，重新渲染页面
                initArtCateList();
                layer.msg('添加成功！');
                // 关闭弹出层
                layer.close(indexAdd);
            },
        });
    });


    // 空变量保存编辑弹出层
    let indexEdit = null;
    // 弹出层--显示添加文章
    var layer = layui.layer;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个添加文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            // 将 HTML 中的模板引擎内容放到弹窗内
            content: $('#dialog-edit').html(),
        });

        // 拿到当前点击编辑的 索引
        let Id = $(this).attr('data-id');
        // alert(Id);
        // 发送请求，把数据渲染到 编辑弹出框
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            success: (res) => {
                // console.log(res);
                form.val('form-edit', res.data);
            },
        });
    });


    // 修改文章分类--事件委托
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 添加成功，重新渲染页面
                initArtCateList();
                layer.msg('修改成功！');
                // 关闭弹出层
                layer.close(indexEdit);
            },
        });
    });


    // 删除按钮
    $('tbody').on('click', '.btn-delete', function () {
        // 获取当前点击的 id 
        let Id = $(this).attr('data-id');
        // 显示询问框---layui 提供的询问框
        layer.confirm('是否确认删除', {
            icon: 3,
            title: '提示',
        }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + Id,
                data: {},
                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('删除成功！');
                    layer.close(index);
                    // 重新渲染
                    initArtCateList();
                },
            });
        });
    });









});