$(function () {


    // 初始化文章分类
    let layer = layui.layer;
    let form = layui.form;
    // 调用函数
    initCate();
    // 封装
    function initCate() {
        // 发送请求
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                // 调用模板引擎
                let htmlStr = template('tpl-cate', { data: res.data, })
                $('[name=cate_id]').html(htmlStr);
                form.render();
            },
        });
    };


    // 初始化富文本编辑器
    initEditor();




    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 点击上传图片
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })


    // 选择文件，同步修改图片
    $('#coverFile').on('change', function (e) {
        // 拿到用户选择文件
        let file = e.target.files[0];
        // 非空校验
        if (file == undefined) {
            return;
        };
        // 根据选择的文件，创建一个对应的 URL 
        let newImgURL = URL.createObjectURL(file);
        $image.cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    });

    // 设置状态
    let state = '已发布';
    // $('#btnSave1').on('click', function () {
    //     state = '已发布';
    // })
    $('#btnSave2').on('click', function () {
        state = '草稿';
    });


    // 发布文章
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();

        // 创建 FormData 对象，收集数据
        let fd = new FormData(this);
        // 放入状态
        fd.append('state', state);
        // 放入图片
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280,
        })
            .toBlob(function (blob) {
                fd.append('cover_img', blob);

                publishArticle(fd);
            });
    });


    // 封装，添加文章的方法
    function publishArticle() {
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('文章发布成功！');
                // 跳转页面
                // location.href = '/article/art_list.html';

            },
        });
    }
});