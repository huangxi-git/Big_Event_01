$(function () {
    // 为 art - template 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = padZero(new Date(dtStr));
        let y = padZero(dt.getFullYear());
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());
        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    };
    // 数字小于10，在前面加 0
    function padZero(num) {
        return num < 10 ? '0' + num : num;
    };



    // 定义查询参数
    let q = {
        pagenum: 1,     // 是	int	    页码值
        pagesize: 2,    // 是	int	    每页显示多少条数据
        cate_id: '',     // 否	string	文章分类的 Id
        state: '',      // 	否	string	文章的状态，可选值有：已发布、草稿
    };

    // 初始化列表
    let layer = layui.layer;
    initTable();

    // 封装初始化
    function initTable() {
        // 发送请求
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                // 引用模板引擎
                let htmlstr = template('tpl-table', { data: res.data });
                $('tbody').html(htmlstr);

                // 调用分页
                renderPage(res.total);

            },
        });
    };


    // 初始化文章分类
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


    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        // 赋值
        q.cate_id = cate_id;
        q.state = state;
        // 初始化文章列表
        initTable();
    });


    let laypage = layui.laypage;
    // 分页
    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox',     //注意，这里的 test1 是 ID，不用加 # 号
            count: total,         //数据总数，从服务端得到
            limit: q.pagesize,     // 每页几条
            curr: q.pagenum,       // 第几页
            // 自定义排版
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip', 'refresh'],
            limits: [2, 3, 4, 5],

            // 页面切换触发 jump 
            jump: function (obj, first) {
                if (!first) {
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    // 首次不执行
                    if (!first) {
                        // 重新渲染页面
                        initTable();
                    };
                };
            },
        });
    };


    // 删除
    // let layer = layui.layer;
    // 点击当前的删除
    $('tbody').on('click', '.btn-delete', function () {
        // 先获取当前点击 id 
        let Id = $(this).attr('data-id');
        // 显示询问框
        layer.confirm('是否删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + Id,
                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    };
                    // 页面汇总删除按钮数等于1，页码大于1
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--;
                    }
                    layer.msg('删除成功！');
                    // 删除成功，重新渲染
                    initTable();
                },
            });
            // 关闭窗口
            layer.close(index)
        });
    });





});