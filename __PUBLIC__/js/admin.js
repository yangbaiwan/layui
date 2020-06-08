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
            sessionStorage.dataId = $(this).attr('data-id')
        });

        $(".menu-flexible").click(function () {
            $(".left-menu-all").toggle();
            $(".layui-body,.layui-footer").css("left", ($(".left-menu-all").is(":hidden")) ? "0" : "200px")
        });

        // 判断是否有本地存储
        if (sessionStorage.getItem('dataId')) {
            var dataId = sessionStorage.getItem('dataId')
            var getNowId = l_o.find("a[data-id=" + dataId + "]")
            var getNowParent = $(getNowId).parent()

            $(getNowParent).addClass('layui-this')
            // console.log($(getNowParent)[0]);
            // 判断是否需要展开
            if ($(getNowParent)[0].tagName == 'DD') {
                $(getNowId).parents('.layui-nav-item').addClass('layui-nav-itemed');
            }
        }
        // 目录
        $(document).on("click", ".mulu,.masked", function () {
            $('body').toggleClass('mulu-hide');
        });

        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
        }
        $('.login-ipone').text(getCookie('success'));

        $('.name').text(getCookie('success') + '，欢迎您！');

        document.body.addEventListener('touchstart', function () {});


        document.getElementById('overLoading').addEventListener('click', function () {
            // alert(1);

            function clearCookie() {
                var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                if (keys) {
                    for (var i = keys.length; i--;)
                        document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
                }
            };

            function getCookie(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
            }

            $.ajax({
                url: $('#urlOgin').val(),
                type: 'POST',
                data: {
                    adminPhone: getCookie('adminPhone')
                },
                success: function (res) {
                    // console.log(res);
                    if (res == 2000) {
                        clearCookie();
                        history.go(0);
                    }
                }
            });

            //菜单


        })
        $.ajax({
            url: $('#menu').val(),
            type: 'POST',
            data: {},
            success: function (res) {
                // console.log(res);
                var adminsex = res.adminsex == 2 ? '女' : '男';
                var admindate = res.admindate.split(' ')[0];
                var adminrengui = res.adminrengui == 1 ? '超人妈妈' + '-' + res.jueshequanxian[0] +
                    '-' + res.jueshequanxian[1] : '内部员工' + '-' + res.jueshequanxian[0] + '-' +
                    res.jueshequanxian[1];
                var adminState = res.adminstate == 1 ? '审核通过' : '未通过或未审核';
                var is_weixin = res.is_weixin == 0 ? '未绑定' : '绑定';
                var adminshopid = res.adminshopid ? res.adminshopid : 0;
                $('.adminname').text(res.adminname);
                $('.adminsex').text(adminsex);
                $('.adminphone').text(res.adminphone);
                $('.admindate').text(admindate);
                $('.adminshopid').text(adminshopid);
                $('.adminrengui').text(adminrengui);
                $('.adminState').text(adminState);
                $('.is_weixin').text(is_weixin);
                $('.adminimg').attr('src', res.weixintouxiang);
                $('.is_weixinadress').text(res.weixinaddress);
                // console.log(res.adminstate)
                // $('.highShow').show();
                // $('.endAdmin').show();
                // $('.endShow').show();
                // $('.modieShow').show();
                // $('.saleShow').show();
                // $('.rootShow').show();
                if (res.adminstate == 0) {
                    // $('.highShow').hide();
                    // $('.endAdmin').hide();
                    // $('.endShow').hide();
                    // $('.modieShow').hide();
                    // $('.saleShow').hide();
                    // $('.rootShow').hide();
                } else {
                    if (res.jueshequanxian[1] == '内部管理' || res.jueshequanxian[1] == '外部管理') {
                        //中层审核
                        $('.highShow').hide();
                        $('.endAdmin').hide();
                        $('.endShow').hide();
                        $('.modieShow').show();
                        $('.saleShow').hide();
                        $('.rootShow').hide();
                    }
                    if (res.jueshequanxian[1] == '内部销售' || res.jueshequanxian[1] == '超人妈妈') {
                        $('.highShow').hide();
                        $('.endAdmin').hide();
                        $('.endShow').hide();
                        $('.modieShow').hide();
                        $('.saleShow').show();
                        $('.rootShow').hide();
                    }
                    if (res.jueshequanxian[1] == '后端管理') {
                        $('.highShow').hide();
                        $('.endAdmin').show();
                        $('.endShow').hide();
                        $('.modieShow').hide();
                        $('.saleShow').hide();
                        $('.rootShow').hide();
                        // sessionStorage.setItem('dataId', 10)
                    }
                    if (res.jueshequanxian[1] == '后端转介绍') {
                        $('.highShow').hide();
                        $('.endAdmin').hide();
                        $('.endShow').show();
                        $('.modieShow').hide();
                        $('.saleShow').hide();
                        $('.rootShow').hide();
                    }
                    if (res.jueshequanxian[1] == '联合创始人') {
                        $('.highShow').show();
                        $('.endAdmin').hide();
                        $('.endShow').hide();
                        $('.modieShow').hide();
                        $('.saleShow').hide();
                        $('.rootShow').hide();
                        // sessionStorage.setItem('dataId', 11)
                    }
                    if (res.jueshequanxian[1] == 'Root') {
                        $('.highShow').show();
                        $('.endAdmin').show();
                        $('.endShow').show();
                        $('.modieShow').show();
                        $('.saleShow').show();
                        $('.rootShow').show();
                        // sessionStorage.setItem('dataId', 13)
                    }
                }


            }
        });
    });


    //禁止页面复制功能
    // document.body.onselectstart = document.body.oncontextmenu = function () {
    //     return false;
    // }
    // document.body.onselectstart = document.body.oncontextmenu = function () {
    //     return false;
    // }

    // document.body.oncontextmenu = document.body.oncontextmenu = function () {
    //     return false;
    // }

    // document.body.ondragstart = document.body.oncontextmenu = function () {
    //     return false;
    // }

    document.oncopy = function(){
        event.returnValue = false;
    }

    // document.body.oncut = document.body.oncontextmenu = function () {
    //     return false;
    // }
    // 搜索
    $(document).on('click', '#search-btn', function () {
        $('.search-res-mask').show();
        $(this).parent().siblings('.search-fix').addClass('cur');

    })

    $(document).on('click', '#search-close', function () {
        $('.search-res-mask').hide();
        $(this).parents('.search-fix').removeClass('cur');

    })

    $(document).on('click', '.search-res-mask', function () {
        $('#search-close').trigger('click');
    })

    // 移动端下拉
    $(document).on('click', '.layui-table .layui-table-first', function () {
        if ($(window).width() > 992) {
            return;
        }
        if ($(this).hasClass('cur')) {
            $(this).siblings().hide();
            $(this).removeClass('cur');
        } else {
            $($(this).siblings()).css('display', '-webkit-box');
            $(this).addClass('cur');
        }
    })


});


var header = {
    template: `  
        <!-- 头部 -->
        <div class="layui-header">
            <div class="layui-main">
                <div class="top-left">
                    <!-- logo -->
                    <a href="javascript:;" class="mulu"><i class="layui-icon layui-icon-spread-left" style="font-size: 30px; color: #fff;"></i></a>
                    <a href="javascript:;" class="logo">小神童后台管理系统</a>
                    <a href="javascript:;" class="menu-flexible ml10">
                        <i class="layui-icon">&#xe635;</i> 
                    </a>
                </div>
                <!-- 头部右侧操作 -->
                <ul class="layui-nav operate">
                    <li class="layui-nav-item">
                        <a href="javascript:;"><span class="login-ipone">123123123123</span></a>
                        <dl class="layui-nav-child">
                            <dd>
                                <a href="../Login/forget.html" class="edit-password">修改密码</a>
                            </dd>
                            <dd>
                                <a id="overLoading" href="javascript:;">退出登录</a>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        `
};


var leftSlide = {
    template: `   
        <!-- 左侧菜单 -->
        <div class="layui-side layui-bg-black left-menu-all ">
            <div class="layui-side-scroll">
                <div class="info">
                    <div class="name"></div>
                    <div class="oper box">
                        <a class="flex edit-password" href="../Login/forget.html">修改密码</a>
                        <a class="flex" id="overLoading" href="../Login/login.html">退出登录</a>
                    </div>
                </div>
                <ul class="layui-nav layui-nav-tree left-menu" lay-filter="left-menu">
                    
                    <li class="layui-nav-item sysIndex">
                            <a href="../Index/index.html" data-id="1">后台首页</a>
                    
                    
                    </li>
                    <li class="layui-nav-item saleShow" style="display: none;">
                            <a href="javascript:;">销售端展示</a>
                                <dl class="layui-nav-child">
                                    <dd>
                                        <a href="../Frontline/frontline.html" data-id="2">个人中心</a>
                                    </dd>
                                    <dd>
                                        <a href="../Frontline/feedback.html" data-id="4">问题反馈</a>
                                    </dd>
                                </dl>
                        
                        
                    </li>
                    <li class="layui-nav-item modieShow" style="display: none;">
                            <a href="javascript:;">中层审核端展示</a>
                                <dl class="layui-nav-child">
                                    <dd>
                                        <a href="../Middle/saledata.html" data-id="5">销售数据</a>
                                    </dd>
                                    <dd>
                                        <a href="../Middle/seaspool.html" data-id="6">公海池</a>
                                    </dd>
                                    <dd>
                                        <a href="../Middle/salefeedback.html" data-id="7">问题反馈</a>
                                    </dd>
                                </dl>
                        
                    </li>
                    <li class="layui-nav-item endShow" style="display: none;">
                            <a href="javascript:;">后端服务展示</a>
                            <dl class="layui-nav-child">
                                <dd>
                                    <a href="../Endserv/succuser.html" data-id="8">成单用户</a>
                                </dd>
                                <dd>
                                    <a href="../Endserv/notintrodRank.html" data-id="9">转介绍排名</a>
                                </dd>
                            </dl>
                        
                    </li>
                    <li class="layui-nav-item endAdmin" style="display: none;">
                            <a href="javascript:;">后端管理展示</a>
                            <dl class="layui-nav-child">
                                <dd>
                                    <a href="../Endadmin/endAdmin.html" data-id="10">数据展示</a>
                                </dd>
                            </dl>
                        
                    </li>
                    <li class="layui-nav-item highShow" style="display: none;">
                            <a href="javascript:;">高级审核展示</a>
                            <dl class="layui-nav-child">
                                <dd>
                                    <a href="../HighAdmin/highfeedback.html" data-id="11">问题学员</a>
                                </dd>
                                
                            </dl>
                        
                    </li>
                    <li class="layui-nav-item rootShow" style="display: none;">
                            <a href="javascript:;">root</a>
                            <dl class="layui-nav-child">
                                <dd>
                                    <a href="../Root/root.html" data-id="13">权限分配</a>
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