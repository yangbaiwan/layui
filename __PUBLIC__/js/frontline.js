layui.use(['jquery', 'form', 'laydate', 'layer', 'laypage', 'element', 'table'], function () {
    var $ = layui.jquery,
        laydate = layui.laydate,
        layer = layui.layer,
        laypage = layui.laypage,
        table = layui.table,
        form = layui.form,
        element = layui.element;
    $(function () {
        FastClick.attach(document.body);
    });


    $('.applic').on('click', function () {
        layer.open({
            title: '',
            content: '<div class=""><div style="margin-bottom: 10px;"><label class="layui-form-label">申请人数: </label><input type="number" id="layer-per" name="title" placeholder="" autocomplete="off" class="layui-input diyWidth"><span style="margin-left: 10px;">一次只能申请10人</span></div><div><label class="layui-form-label">申请留言: </label><textarea name="desc" placeholder="请输入留言" class="layui-textarea applicL" style="width: 215px;display: inline-block;"></textarea></div></div>',
            btn: ['确定', '取消'],
            area: '500px',
            yes: function (index, layero) {
                if ($('#layer-per').val() <= 10 && $('#layer-per').val() > 0 && $(
                        '#layer-per').val().trim() != '' && $('.applicL').val()
                    .trim() != '') {
                    $.ajax({
                        url: "{:U('Frontline/flow')}",
                        type: 'POST',
                        data: {
                            num: $('#layer-per').val(),
                            textL: $('.applicL').val()
                        },
                        success: function (res) {
                            console.log(res);
                            if (res.state == 2000) {
                                layer.close(index);
                                layer.msg('申请成功！')
                            } else if (res.state == 4005) {
                                layer.msg('申请超额！')
                            } else if (res.state == 2004) {
                                layer.msg('申请失败！')
                            }
                        }
                    });
                } else {
                    if ($('#layer-per').val() > 10 || $('#layer-per').val() <= 0) {
                        layer.msg('申请人数为1到10人！', {
                            type: 1
                        }, function (index) {
                            layer.close(index);
                        });
                        return true;
                    }
                    if ($('#layer-per').val().trim() == '' || $('.applicL').val().trim() == '') {
                        layer.msg('请将申请信息填写完整！', {
                            type: 1
                        }, function (index) {
                            layer.close(index);
                        });
                        return true;
                    }
                }


            },
            btn2: function (index, layero) {},
            cancel: function () {}
        });
    });


    $('.iconPosi').on('click', function () {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var iphone = $('#iphone').val();
        if (myreg.test(iphone)) {
            dataShow(iphone, '');
            $('.laytable-cell-1-0-7').eq(0).text('已成单');


        } else {
            layer.msg('请输入正确的手机号')
        }
    });




    form.on('select(inDate)', function (res) {
        if (res.value) {
            dataShow('', res.value);
            $('.laytable-cell-1-0-7').eq(0).text('已成单');

        }
    })
    dataShow();
    //0 带绑定状态 1 安全期 2 关键期 3 失效期
    // chengCount 已转化人数 lvCount 平均转化率  jinCount 今日新增人数 xinChengCount 新增转化人数
    function dataShow(phone, state) {
        table.render({
            elem: '#test',
            url: "{:U('Frontline/frontlineDataShow')}",
            method: 'POST',
            limits: [30],
            limit: 30,
            where: {
                phone: phone || '',
                state: state || ''
            },
            page: {
                //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'],
                groups: 1,
                first: false,
                last: false //不显示尾页

            },
            cols: [
                [{
                        field: 'wdkidimg',
                        // width: 80,
                        title: '用户头像',
                        templet: '<div style="height:auto!important;width:86px!important"><img style="width: 40%;" src="{{ d.wdkidimg}}"></div>',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        field: 'wdkidusername',
                        // width: 80,
                        title: '用户昵称',
                        totalRow: false,
                        minWidth: 120
                    },
                    {
                        field: 'wdkidbang',
                        // width: 80,
                        title: '绑定日期',
                        minWidth: 120
                    },
                    {
                        field: 'wdkidstate',
                        // width: 80,
                        title: '所处期间',
                        templet: function (row) {
                            if (row.wdkidstate == 0) {
                                return '待绑定状态'
                            } else if (row.wdkidstate == 1) {
                                return '安全期'
                            } else if (row.wdkidstate == 2) {
                                return '关键期'
                            } else if (row.wdkidstate == 3) {
                                return '失效期'
                            }
                        },
                        minWidth: 120
                    },
                    {
                        field: 'weixinhao',
                        // width: 80,
                        title: '微信号',
                        minWidth: 120
                    },
                    {
                        field: 'phone',
                        title: '手机号(选填)',
                        // width: 80,
                        minWidth: 120
                    },
                    {
                        field: 'beizhu',
                        title: '备注',
                        // width: 80
                        minWidth: 120
                    },
                    {
                        field: 'sign',
                        title: '移至公海',
                        width: 137,
                        // type: 'checkbox'
                        templet: '<div class="layui-inline layui-form layui-table-bd"><button class="layui-btn">移至公海</button></div>',
                        minWidth: 120,
                        event: 'remove'
                    },
                    {
                        field: 'sign1',
                        title: '编辑',
                        templet: '<div style="height:auto!important;width:86px!important"><i class="layui-icon layui-icon-edit hover-sty"></i></div>',
                        event: 'setSign',
                        minWidth: 120,
                        style: 'cursor: pointer;'
                    }
                ]
            ],
            page: true,
            done: function (res, curr, count) {
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                console.log(res);
                $('.userImg').attr('src', res.admin.weixintouxiang);
                $('.userName').text(res.admin.adminname);

                $('.addNum').text(res.jinCount);
                $('.addChangeNum').text(res.xinChengCount);
                $('.alreadyChange').text(res.chengCount);
                $('.conver').text(res.lvCount);
                //得到当前页码
                console.log(curr);
                $('.laytable-cell-1-0-7').eq(0).text('已成单');
                if (phone || state) {
                    $('.addNumBox').css('visibility', 'hidden');
                    $('.addChangeNumBox').css('visibility', 'hidden');
                    $('.alreadyChangeBox').css('visibility', 'hidden');
                    $('.converBox').css('visibility', 'hidden');
                } else {
                    $('.addNumBox').css('visibility', '');
                    $('.addChangeNumBox').css('visibility', '');
                    $('.alreadyChangeBox').css('visibility', '');
                    $('.converBox').css('visibility', '');
                }
                //得到数据总量
                console.log(count);
            }
        });

    }
    ////
    $('.qcode').on('click', function () {
        $.ajax({
            url: "{:U('Frontline/adminCode')}",
            type: 'POST',
            data: {},
            success: function (res) {
                console.log(res);
                layer.open({
                    title: '',
                    content: '<img style="width: 98%;display: inline-block;margin: 0 auto;" src="' +
                        res.url + '">',
                    btn: [],
                    area: ['300px', '310px'],
                    scrollbar: false
                })
            }
        });
    });



    table.on('tool(test)', function (obj) {
        var data = obj.data;
        if (obj.event === 'setSign') {
            // console.log(obj.data);
            sessionStorage.setItem('detail', JSON.stringify(obj.data));
            window.location.href = 'detail.html'
        }
        if (obj.event === 'remove') {

            layer.open({
                title: '',
                content: '<div class=""><div><label class="layui-form-label">申请留言: </label><textarea name="desc" placeholder="请输入留言" class="layui-textarea sealRemark" style="width: 300px;display: inline-block;"></textarea></div></div>',
                btn: ['确定', '取消'],
                area: '500px',
                yes: function (index, layero) {
                    if ($('.sealRemark').val().trim() == '') {
                        layer.msg('留言不能为空！', {
                            type: 1
                        }, function (index) {
                            layer.close(index);
                        });
                        return true;
                    } else {
                        $.ajax({
                            url: "{:U('Frontline/yiGongHaiAll')}",
                            type: 'POST',
                            data: {
                                text: $('.sealRemark').val(),
                                userId: obj.data.wdkidid
                            },
                            success: function (res) {
                                console.log(res);
                                if (res.state == 2000) {
                                    layer.msg('移入公海成功')
                                } else if (res.state == 4000) {
                                    layer.msg('移入公海失败')
                                } else {
                                    layer.msg('不在你的保护期不可移入公海！')
                                }
                            }
                        });
                        layer.close(index);

                    }

                },
                btn2: function (index, layero) {},
                cancel: function () {}
            });
        }
    });

    layui.form.on('checkbox', function (data) {
        console.log(data.elem); //得到checkbox原始DOM对象
        console.log(data.elem.checked); //是否被选中，true或者false
        console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        console.log(data.othis); //得到美化后的DOM对象
        if (data.elem.checked === true) {
            // layer.open({
            //     title: '请输入此成单用户的手机号',
            //     content: '<div class="layui-input-inline"><input type="text" name="title" required lay-verify="required" placeholder="" autocomplete="off" class="layui-input"></div>'
            // });
            layer.open({
                title: '请输入此成单用户的手机号',
                content: '<div class="layui-input-inline"><input type="text" id="layer-ipone" name="title" placeholder="" autocomplete="off" class="layui-input"></div>',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    if (!(/^1[34578]\d{9}$/.test($('#layer-ipone').val()))) {
                        layer.msg('请输入正确的手机号码！', {
                            type: 1
                        }, function (index) {
                            layer.close(index);
                        });
                        return true;
                    } else {
                        layer.close(index);
                    }

                },
                btn2: function (index, layero) {
                    console.log(index);
                    console.log(data.elem.checked);
                    data.elem.checked = false;
                    layui.form.render();
                },
                cancel: function () {
                    data.elem.checked = false;
                    layui.form.render();
                }
            });
        }
    });



});
