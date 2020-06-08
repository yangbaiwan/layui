layui.use(['jquery', 'form', 'laydate', 'layer', 'laypage', 'element'], function () {
    var $ = layui.jquery,
        laydate = layui.laydate,
        layer = layui.layer,
        laypage = layui.laypage,
        element = layui.element;
    $(function () {
        FastClick.attach(document.body);
    });

    // 分页
    laypage.render({
        elem: 'table-pages',
        count: 5,
        layout: ['prev', 'page', 'next', 'count', 'skip'],
        jump: function (obj, first) {
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if (!first) {
                //do something
            }
        }
    });

    // 开始时间及截止时间
    laydate.render({
        elem: '#time',
        range: true,
        type: 'date' // 'month'  'date' 'datetime'
            ,
        done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        },
        trigger: 'click'
    });

    //首页数据
    $.ajax({
        url: $('#indexShow').val(),
        type: 'POST',
        data: {},
        success: function (res) {
            console.log(res);
            var adminsex = res.adminsex == 2 ? '女' : '男';
            var admindate = res.admindate.split(' ')[0];
            var adminrengui = res.adminrengui == 1 ? '超人妈妈' + '-' + res.jueshequanxian[0] + '-' + res.jueshequanxian[1] : '内部员工' + '-' + res.jueshequanxian[0] + '-' + res.jueshequanxian[1];
            var adminState = res.adminState == 1 ? '审核通过' : '未通过或未审核';
            var is_weixin = res.is_weixin == 0 ? '未绑定' : '绑定';
            $('.adminname').text(res.adminname);
            $('.adminsex').text(adminsex);
            $('.adminphone').text(res.adminphone);
            $('.admindate').text(admindate);
            $('.adminrengui').text(adminrengui);
            $('.adminState').text(adminState);
            $('.is_weixin').text(is_weixin);
            $('.adminimg').attr('src', res.weixintouxiang);
            $('.is_weixinadress').text(res.weixinaddress);
            // console.log(res.adminstate)
            // if (res.adminstate == 0) {
            //     $('.highShow').hide();
            //     $('.endAdmin').hide();
            //     $('.endShow').hide();
            //     $('.modieShow').hide();
            //     $('.saleShow').hide();
            // }


        }
    });


    //判断是否成单
    $(document).on('click', '#check', function () {
        console.log(1);
    })
    layui.form.on('checkbox', function (data) {
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //是否被选中，true或者false
        console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        console.log(data.othis); //得到美化后的DOM对象
        if (data.elem.checked === true) {
            layer.open({
                title: '请输入此成单用户的手机号',
                content: '<div class="layui-input-inline"><input type="text" name="title" required lay-verify="required" placeholder="" autocomplete="off" class="layui-input"></div>'
            });
        }
    });



});