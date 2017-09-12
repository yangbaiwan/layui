layui.use(["element", "layer"], function () {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer;
        $(function () {
        var l_o = $(".left-menu"),
            tab = "top-tab",
            l_m = "left-menu",
            t_m = "top-menu";
        var mainHeight = $(window).height() - 60;
        l_o.on("click", "li", function () {
            $(this).siblings().removeClass("layui-nav-itemed")
        });

        // 本地存储
        l_o.find("a[data-id]").click(function () {
            sessionStorage .dataId = $(this).attr('data-id')
        });

        $(".menu-flexible").click(function () {
            $(".left-menu-all").toggle();
            $(".layui-body,.layui-footer").css("left", ($(".left-menu-all").is(":hidden")) ? "0" : "200px")
        });


        // 判断是否有本地存储
        if (sessionStorage .getItem('dataId')) {
            var dataId = sessionStorage .getItem('dataId')
            var getNowId = l_o.find("a[data-id=" + dataId + "]")
            var getNowParent = $(getNowId).parent()

            $(getNowParent).addClass('layui-this')
            console.log($(getNowParent)[0]);
            // 判断是否需要展开
            if ($(getNowParent)[0].tagName == 'DD') {
                $(getNowId).parents('.layui-nav-item').addClass('layui-nav-itemed');
            }
        }
        // 目录
        $(document).on("click", ".mulu,.masked", function () {
            $('body').toggleClass('mulu-hide');
        });

        document.body.addEventListener('touchstart', function () { });

    });
});


var header = {
    template:
    `  
        <!-- 头部 -->
        <div class="layui-header">
            <div class="layui-main">
                <div class="top-left">
                    <!-- logo -->
                    <a href="javascript:;" class="mulu"><img src="img/mulu.png" alt=""></a>
                    <a href="javascript:;" class="logo">E-Bank Service 商户管理平台</a>
                    <a href="javascript:;" class="menu-flexible ml10">
                        <i class="layui-icon">&#xe635;</i> 
                    </a>
                </div>
                <!-- 头部右侧操作 -->
                <ul class="layui-nav operate">
                    <li class="layui-nav-item">
                        <a href="javascript:;">137****6116</a>
                        <dl class="layui-nav-child">
                            <dd>
                                <a href="修改密码.html" class="edit-password">修改密码</a>
                            </dd>
                            <dd>
                                <a href="登录.html">退出登录</a>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>

        `
};


var leftSlide =
    {
        template: `   
        <!-- 左侧菜单 -->
        <div class="layui-side layui-bg-black left-menu-all ">
            <div class="layui-side-scroll">
                <div class="info">
                    <div class="name">13800138000，欢迎您！</div>
                    <div class="oper box">
                        <a class="flex edit-password" href="修改密码.html">修改密码</a>
                        <a class="flex" href="登录.html">退出登录</a>
                    </div>
                </div>
                <ul class="layui-nav layui-nav-tree left-menu" lay-filter="left-menu">
                    <li class="layui-nav-item ">
                        <a href="首页.html" data-id="1">后台首页</a>
                    </li>
                    <li class="layui-nav-item">
                        <a href="javascript:;">财务管理</a>
                        <dl class="layui-nav-child">
                            <dd>
                                <a href="商户提现.html" data-id="3">模板</a>
                            </dd>
                        </dl>
                    </li>
                    <li class="layui-nav-item">
                        <a href="javascript:;">系统设置</a>
                        <dl class="layui-nav-child">
                            <dd>
                                <a href="商户查询.html" data-id="6">商户查询</a>
                            </dd>
                            <dd>
                                <a href="接口文档.html" data-id="7">接口文档</a>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        `
    }

// 创建根实例
new Vue({
    el: '#header',
    components: {
        'header-component': header
    }

})

new Vue({
    el: '#leftSlide',
    components: {
        'leftslide-component': leftSlide
    }
})


