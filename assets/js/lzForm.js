/**
 * Created by zhoulongfei on 2018/8/8.
 * E-mail:36995800@163.com
 */
;(function ($, doc, win, undefined) {
    var fn = function (ele, opt) {
        this.ele = ele;

        this.defaults = {
            server: 'data/form/save1.php',
            submit: '[data-query="submit"]',
            range: '[data-query="selectBox"]',
            check: '[data-isCheck]'
        };
        this.options = $.extend(true, {}, this.defaults, opt)
    };
    fn.prototype = {
        init: function () {
            this.bindEvent();
            var temp=win.location.href.split('/');
            temp.pop();
            //this.options.server=temp.join("/")+"/data/form/save1.php";
        },
        bindEvent: function () {
            var _this = this;
            var options = this.options;
            $(doc).off('click.lzForm').on('click.lzForm', options.submit, function (evt) {
                evt.preventDefault();
                var $range=$(this).closest(options.range);
                var data = _this.getData($range);
                if (!_this.check(_this.getCheckData($range),$range)) {
                    return
                }
                var xhr = _this.postData(data);
                xhr.done(function (rs) {
                    alert(+rs.k?"提交成功":rs.msg);

                });
                xhr.fail(function (xhr, status, tips) {
                    alert('提交失败');
                })
            })
        },
        getData: function (range) {
            var data = {};
            var time = win.xcarDateOpt[range[0].xcarExpando].getTime(range);
            var formStr = range.find('form').serialize();
            formStr += '&buy_time=' + encodeURIComponent(time);
            return formStr
        },
        getCheckData:function(range){
            var time = win.xcarDateOpt[range[0].xcarExpando].getTime(range);
            var temp = range.find('form').serializeArray();
            temp.push({name:"buy_time",value:time});
            return temp;
        },
        getRule: function (range) {
            var rule = [];
            var options = this.options;
            var temp={
                name:'if(!$.trim(data.name.replace("请输入姓名",""))){alert("请填写姓名");return false}',
                mobile:'if(!/^1\\d{10}$/.test(data.mobile)){alert("请填写正确手机号");return false}',
                gender:'if(!data.gender){alert("请选择性别");return false}',
                province:'if(!data.province){alert("请选择省份");return false}',
                city:'if(!data.city){alert("请选择城市");return false}',
                distributor:'if(!data.distributor){alert("请选择经销商");return false}',
                car_name:'if(!data.car_name){alert("请选择车型");return false}',
                time:'if(!/^\\d[\\d\\-]+$/.test(data.buy_time)){alert("请选择日期");return false}',
                car_budget:'if(!data.car_budget){alert("请选择购车预算");return false}',
                if_policies:'if(!data.if_policies){alert("请勾选相应条款");return false}',

            };
            var str="";
            $(options.check, range).each(function () {
                var ts=temp[this.getAttribute('name')||this.getAttribute('data-name')];
                str+=ts?ts:""
            });
            return new Function("data",str+"return true");
        },
        check: function (data,range) {
            var rule = this.getRule(range);
            var temp = {};
            $.each(data, function (k, v) {
                temp[v.name]=v.value;
            });

            return rule(temp,range)
        },
        postData: function (data) {
            return $.ajax({
                url: this.options.server,
                method: 'POST',
                type: 'POST',
                dataType: "json",
                data: data || {},
                timeout: 8000
            })
        }
    };

    $('[data-query="selectBox"]').each(function () {
        new fn(this).init();
    });
})(window.jQuery, document, window);