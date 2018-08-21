/**
 * Created by zhoulongfei on 2018/8/7.
 * E-mail:36995800@163.com
 */
(function ($, doc, win,data, undefined) {
    if(!data)return;
    var selMap = {
        A: '[data-stype="A"]',
        B: '[data-stype="B"]',
        C: '[data-stype="C"]',
        D: '[data-stype="D"]'
    };
    var fn = function (map, ele, type,mainKey,data) {
        this.map = $.extend({},map);
        this.ele = ele;
        this.type = type;

        this.selMap = {
            A: '[data-stype="A"]',
            B: '[data-stype="B"]',
            C: '[data-stype="C"]',
            D: '[data-stype="D"]',
            budget:'[data-query="budget"]'

        }
    };
    fn.prototype = {
        init: function (data,ele,type) {
            this.data=$.extend(true,{},data);
            if (this.type.length < 1)return;
            this.bindEvent(this.ele);
            $(ele).data('type',type);
            this.render()
        },
        bindEvent: function (ele) {
            var _this = this;

            $(doc).off('change.lzSelect').on('change.lzSelect', '[data-ele="sel"]', function (evt) {

                var $range=$(this).closest('[data-query="selectBox"]');
                _this.type=$range.data('type');
                _this.data=data[$range.attr('data-id')];
                var type=this.getAttribute('data-stype');
                if(type === _this.type.slice(0).pop()){
                    return
                }
                var nType=_this.findNext(type)[0];
                var $next=$(_this.selMap[nType],$range);
                if(!$next)return;
                _this.resetNextAll(type,this);
                _this[type+nType]&&_this[type+nType](_this.getId(this),this);

            });
        },
        getId:function(ele){
            return $('option:checked',ele).attr('data-v')
        },
        findNext:function(type){
            for(var i=0,l=this.type.length;i<l;i++){
                if(type===this.type[i]){
                    return this.type.slice(i+1,i+2)
                }
            }
        },
        resetNextAll:function(type,ele){
            var temp;
            var $range=$(ele).closest('[data-query="selectBox"]');
            for(var i=0,l=this.type.length;i<l;i++){
                if(type===this.type[i]){
                    temp=this.type.slice(i+1);
                    break;
                }
            }
            for(var j=0,len=temp.length;j<len;j++){
                $(this.selMap[temp[j]],$range).find("option:gt(0)").remove();
            }
        },
        render: function () {
            this[this.type.slice().shift()]();
            var temp="";
            var $box=$(this.selMap.budget,this.ele);
            var color=$box.attr('data-color');

            $.each(this.data.obym,function(k,v){
                temp+='<option style="color:'+color+'" value="'+v+'">'+v+'</option>'
            });
            $box.append(temp);
        },
        getData: function (type) {
            var _type = this.map[type].slice(0).pop();
            var key;
            var _scope;
            var p, c, j, c;
            if (!_type) return;
            key = $(this.selMap[_type]).val();
            if (_type === "A") {
                c = this.data.ct[key];

            }

        },
        A: function () {
            var str="";
            var $box=$(this.selMap.A,this.ele);
            var color=$box.attr('data-color');
            $.each(this.data.pro,function(k,v){

                str+='<option style="color:'+color+'" data-v="'+k+'" value="'+v+'">'+v+'</option>'
            });
            $box.append(str);
        },
        B: function () {
            this.addItem(this.selMap.B,'ct');
        },
        C: function () {
            this.addItem(this.selMap.C,"jxs")
        },
        D: function () {
            this.addItem(this.selMap.D,"m_id",true)
        },
        addItem:function(selector,key,isD){
            var str="";
            var  $box=$(selector,this.ele);
            var color=$box.attr('data-color');
            $.each(this.data[key],function(k,v){

                var id=k,name;
                $.each(v,function(kc,vc){
                    id=isD?id:kc;
                    name=vc;
                });
                name=Object.prototype.toString.apply(name)==="[object Array]"?name[0]:name;
                str+='<option style="color:'+color+';" data-v="'+id+'" value="'+name+'">'+name+'</option>'
            });
            $box.append(str);
        },
        AB: function (v,ele) {
            var $range=$(ele).closest('[data-query="selectBox"]');
            var _this=this;
            var $box=$(_this.selMap['B'],$range);
            var color=$box.attr('data-color');
            var str='';
            $.each(this.data.ct[v],function(k,v){
                str+='<option style="color:'+color+'" data-v="'+k+'" value="'+v+'">'+v+'</option>'
            });
            $box.append(str);

        },
        AC: function (v,ele) {

            var _this=this;
            var $range=$(ele).closest('[data-query="selectBox"]');
            var str="";
            var cityList=[];
            var jxsList={};
            var $box=$(_this.selMap['C'],$range);
            var color=$box.attr('data-color');

            $.each(this.data.ct[v],function(k,v){
                cityList.push(k);
            });
            $.each(cityList,function(k,v){
                $.extend(true,jxsList,_this.data.jxs[v])
            });
            $.each(jxsList,function(k,v){
                str+='<option style="color:'+color+'" data-v="'+k+'" value="'+v+'">'+v+'</option>'
            });
            $box.append(str);
        },
        AD: function (v,ele) {

            var _this=this;
            var str="";
            var cityList=[];
            var jxsList={};
            var cars=[];
            var list=[];
            var $range=$(ele).closest('[data-query="selectBox"]');
            var $box=$(_this.selMap['D'],$range);
            var color=$box.attr('data-color');

            $.each(this.data.ct[v],function(k,v){
                cityList.push(k);
            });
            $.each(cityList,function(k,v){
                $.extend(true,jxsList,_this.data.jxs[v])
            });
            $.each(jxsList,function(k,v){
                list.push(k);
            });
            $.each(list,function(k,v){
                cars=cars.concat(_this.data.jxstom[v]);
            });
            $.each(cars,function(k,v){
                str+='<option style="color:'+color+'" data-v="'+k+'" value="'+_this.data.m_id[v][0]+'">'+_this.data.m_id[v][0]+'</option>'
            });
            $box.append(str);

        },
        BC: function (v,ele) {

            var _this=this;
            var $range=$(ele).closest('[data-query="selectBox"]');
            var str="";
            var $box=$(_this.selMap['C'],$range);
            var color=$box.attr('data-color');
            $.each(this.data.jxs[v],function(k,v){
                str+='<option style="color:'+color+'" data-v="'+k+'" value="'+v+'">'+v+'</option>';
            });
            $box.append(str);
        },
        BD: function (v,ele) {
            var _this=this;
            var str="";
            var jxsList=[];
            var cars=[];
            var list=[];
            var $range=$(ele).closest('[data-query="selectBox"]');
            var $box=$(_this.selMap['D'],$range);
            var color=$box.attr('data-color');
            $.each(this.data.jxs[v],function(k,v){
                k&&jxsList.push(k);
            });
            $.each(jxsList,function(k,v){
                cars=cars.concat(_this.data.jxstom[v]);
            });
            $.each(cars,function(k,v){
                if(typeof v==='undefined') return;
                str+='<option style="color:'+color+'" data-v="'+v+'" value="'+_this.data.m_id[v][0]+'">'+_this.data.m_id[v][0]+'</option>';
            });
            $box.append(str);

        },
        CD: function (v,ele) {
            var str="";
            var _this=this;
            var $range=$(ele).closest('[data-query="selectBox"]');
            var $box=$(this.selMap['D'],$range);
            var color=$box.attr('data-color');
            $.each(this.data.jxstom[v],function(k,v){
                str+='<option style="color:'+color+'" data-v="'+k+'" value="'+_this.data.m_id[v][0]+'">'+_this.data.m_id[v][0]+'</option>';
            });
            $box.append(str);
        },
        DC:function(v,ele){
            var str="";
            var _this=this;
            var $range=$(ele).closest('[data-query="selectBox"]');
            var $box=$(this.selMap['C'],$range);
            var color=$box.attr('data-color');
            $.each(this.data.mtojxs[v],function(k,v){
                str+='<option style="color:'+color+'" data-v="'+v+'" value="'+_this.data.idtoj[v]+'">'+_this.data.idtoj[v]+'</option>';
            });
            $box.append(str);

        }
    };

    $('[data-query="selectBox"]').each(function () {
        var list = [];
        var $C;
        var map = {};
        var $D;
        var mainKey=$('[data-main=1]',this).attr('data-stype');
        $(selMap.A, this).length > 0 && list.push('A');
        $(selMap.B, this).length > 0 && list.push('B');
        $D = $(selMap.D, this);
        $C = $(selMap.C, this);

        if ($C.length > 0 && $D.length > 0) {
            (+$C.attr('data-main')) ? (list.push("C"), list.push("D")) : (list.push("D"), list.push("C"))
        } else {
            $C.length > 0 && list.push("C");
            $D.length > 0 && list.push("D");
        }

        for (var i = 0, l = list.length; i < l; i++) {
            map[list[i]] = list.slice(0, i);
        }

        new fn(map, this, list.slice(0),mainKey).init(data[this.getAttribute('data-id')],this,list.slice(0));
    });

})(jQuery, document, window,window._xcarData.lz);