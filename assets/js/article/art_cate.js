$(function () {

    // 渲染页面
    initArtCateList();
    // 封装函数，其他模块要用
    function initArtCateList() {

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


});