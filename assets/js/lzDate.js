/**
 * Created by zhoulongfei on 2018/8/8.
 * E-mail:36995800@163.com
 */
(function ($, doc, win, undefined) {
    var expando=1;
    var fn = function (opt,ele) {
        this.ele=ele;
        this.defaults = {
            year:'[data-dp="year"]',
            month:'[data-dp="month"]',
            day:'[data-dp="day"]',
            item:'[data-dp]',
            range:'[data-query="selectBox"]',
            cache:{}

        };
        this.options = $.extend(true, {}, this.defaults, opt)
    };
    fn.prototype = {
        init: function () {
            this.bindEvent();
            this.render();
            return this;
        },
        render:function(){
            var _this=this;
            var options=this.options;
            var date=new Date();
            var year=options.cache.year=date.getUTCFullYear();
            var month=date.getUTCMonth()+1;
            var $box=$(options.year,this.ele);
            var color=$box.attr('data-color');
            var temp="";
            for(var i=0;i<10;i++){
                temp+='<option style="color:'+color+'" value="'+(year+i)+'">'+(year+i)+'</option>'
            }
            $(options.year,this.ele).append(temp);
            temp="";
            for(i=1;i<13;i++){
                temp+='<option style="color:'+color+'" value="'+(i)+'">'+(i)+'</option>'
            }
            $(options.month,this.ele).append(temp)
        },
        bindEvent: function () {
            var _this=this;
            var options=this.options;
            $(options.range).off('change').on('change',options.item,function(){
                var type=this.getAttribute(options.item.slice(1,-1));
                if(type==="day") return;
                _this[type](this.value.replace(/\D/g,''),this);

            })
        },
        year:function(v,ele){
            this.options.cache.year=v;
            var $range=$(ele).closest(this.options.range);
            var m=$(this.options.month,this.ele).val();
            if(m==='2'||m==='2月'){
                $(this.options.day,$range).find('option:gt(0)').remove();
            }

        },
        month:function(v,ele){
            var $range=$(ele).closest(this.options.range);
            var map={
                1:31,
                3:31,
                5:31,
                7:31,
                8:31,
                10:31,
                12:31,
                4:30,
                6:30,
                9:30,
                11:30,
            };
            var day=map[v]||this.getFebDay();
            var temp="";
            $day= $(this.options.day,$range);
            var color=$day.attr('data-color');
            for(var i=0;i<day;i++){
                temp+='<option style="color:'+color+'" value="'+(i+1)+'">'+(i+1)+'</option>'
            }

            if(v==='2'||v==="2月"){
                $day.find('option:gt(0)').remove();

            }
            $day.append(temp);

        },
        getFebDay:function(){
            var year=this.options.cache.year;
            if(!(year%400)){
                return 29
            }
            if(year%100&&(!year%4)){
                return 29
            }
            return 28
        },
        getTime:function(range){
            var options=this.options;
            var year=$(options.year,range).val()||"";
            var month=$(options.month,range).val()||"";
            var day=$(options.day,range).val()||"";
            if(!year){
                return null
            }

            return year+'-'+month+'-'+day
        }

    };
    $(function(){
        win.xcarDateOpt={};
        $('[data-query="selectBox"]').each(function(){
            this.xcarExpando=expando;
            win.xcarDateOpt[expando]=  new fn({},this).init();
            expando++
        });

    });


})(window.jQuery, document, window);