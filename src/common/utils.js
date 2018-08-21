import Template from 'template'
import ComponentMap from 'componentMap';
import template from 'art-template/lib/template-web';
import {
    common,
    storage,
    destroyList
} from 'storage';

import * as $ from 'jquery';
let doc = document;
export default class Utils {

    constructor(opt) {
        this.common = common;
        this.defaults = {
            cache: {},
            box: '[data-query="canvasBox"]',
            configBox: '[data-query="configBox"]'
        };
        this.options = $.extend(true, {}, this.defaults, opt);
    }

    //生成前台页面的HTML模板  前台模板在template.js文件中存放着
    makeHtml(data) {
        let cssDepends = [];
        let jsDepends = [];
        let code = [];
        let css = [];
        let body = [];
        let codeTemp={};
        this.common.cache.push(this.common.lzcache);
        for (let v of data) {
            //根据type获取前台页面对应的组件结构
            let temp = ComponentMap.get(v.type);
             //获取前台组件所依赖的JS结构
            jsDepends = jsDepends.concat(temp.jsDepends);
            //获取前台组件所依赖的JS结构
            cssDepends = cssDepends.concat(temp.cssDepends);
            code.push(temp.code);
            css.push(temp.css);
            if(v.type==="Y"||v.type==="V"){
                this.common.lzcache.value[v.id]=v.dropMenuData
            }
            let eleStr = template.compile(temp.html)(v);
            body.push(eleStr);

        }
        for(let v of this.common.cache){
            codeTemp[v.key]=v.value;
        }
        let titleCode=[`window._xcarData=${JSON.stringify(codeTemp)}`];
  //最后将每个前台页面组件拼装起来  并通过Es6的new Set给数组去重过滤掉重复的依赖
        let render = template.compile(Template.page);
        let temp={
            title: this.common.ztTitle||this.common.title||"",
            keyWords:this.common.keyWords||'',
            des:this.common.writeZt||'',
            bgImg: this.common.bgImg || '',
            height: this.common.canvasHeight,
            mainWidth: this.common.mainWidth,
            thirdPartCode:[],
            linkTopic:this.common.linkTopic
        };
        if(/^http.+\.js.*$/.test(this.common.thirdPartCode1)){
            temp.thirdPartCode.push(this.common.thirdPartCode1)
        }
        if(/^http.+\.js.*$/.test(this.common.thirdPartCode2)){
            temp.thirdPartCode.push(this.common.thirdPartCode2)
        }
        let metaData=Object.assign({},temp,{list:data});
        let html = render(Object.assign({},temp, {
            titleCode:[...new Set(titleCode)],
            cssDepends: [...new Set(cssDepends)],
            jsDepends: [...new Set(jsDepends),...temp.thirdPartCode],
            code: [...new Set(code)].join('\n\r;'),
            body: body.join(' \n\r'),
            css: [...new Set(css)].join(' \n\r')
        }));
        return {html,metaData}
    }
    //此方法主要是注册前台 后台 所需模板和样式 以及根据组件类型注册组件中的ready cready getData方法
    //必须的属性为:组件类型type  前台模板metaData对象包括属性(css依赖数组形式(cssDepends)js依赖数组形式(cssDepends) css('style形式')，code('<script>alert(''1'')</script>形式'))
    //  后台模板:editData对象包括属性(中间模板template 右侧模板configTml)
    register(opt) {
        //用ES6的Map数据结构设置对应的组件类型的对应的模板
        ComponentMap.set(opt.type, opt.metaData);
        let cache = this.options.cache;
        let _this = this;
        //生成后台中间组件模板
        this.constructor.prototype["fn" + opt.type] = function (data) {
            let tempFn = opt.type + "Render";
            cache[tempFn] = cache[tempFn] ? cache[tempFn] : template.compile(opt.editData.template);
            return cache[tempFn](data);
        };
        //生成后台组件右侧模板
        this.constructor.prototype["fnConfig" + opt.type] = function (data) {
            let tempFn = opt.type + "ConfigRender";
            cache[tempFn] = cache[tempFn] ? cache[tempFn] : template.compile(opt.editData.configTml || '');
            return cache[tempFn](data);
        };

        for (let i in opt) {
           
            if (!opt.hasOwnProperty(i)) continue;
            if (typeof opt[i] === "function") {
                //通过暴露出此方法调用对应组件内部中getData ready ，cready方法
                ;
                (function (i) { // 闭包
                    _this.constructor.prototype[i + opt.type] = function (ele, isText) {

                        return opt[i](ele, isText) || {}
                    };
                })(i);

            }
        }

    }
    //通过此方法可以调用到对应组件中的getData方法
    getData(type, ele, isText) {
        return this["getData" + type] && this["getData" + type](ele, isText)
    }
    //将对应组件插入到画布中
    generate(opt, insert, isReadyDo, isNoConfig, target) {
        //获取对应组件的后台模板 返回值方便传入到对应组件的getData方法中
        let eleStr = this["fn" + opt.type] && this["fn" + opt.type](opt);
        let options = this.options;
        let $ele;
        let _this = this;
        opt.internalKey = this.common.expando;
        opt.$data = Object.assign({}, opt);
        Object.defineProperty(opt, "$data", {
            enumerable: false,
            configurable:false
        });
        //通过Es6的代理对象和Map数据结构将组件所需的数据和组件唯一标识关联起来
        storage.set(this.getCacheKey(), new Proxy(opt, {
            set(target, key, value, receiver) {
              
                //如果此属性为true 会对右侧配置结构清空重新渲染
                if (key === "isShowConfig" && value) {
                    opt.isShowConfig=null;
                    _this.generateConfig(opt);
                    return true;
                }
                if(key==="refresh"&&value){
                    _this.getCurrentComponent().remove();
                    _this.generate(opt.$data,'append',true,true);
                    _this.getCurrentComponent().find('.selectDiv').show();
                }
                //为了安全性考虑加此一步防止不存在的属性导致页面报错
                return Reflect.set(target, key, value, receiver)
            }
        }));
       //编辑组件功能   通过点击生成的组件重新渲染右侧组件

        $(doc).off(`click.${opt.type}`).on(`click.${opt.type}`, `[data-type="${opt.type}"]`, function () {

            _this.common.$currentComponent = $(this);

            $(this).find('.selectDiv').show();
            $(this).siblings().find('.selectDiv').hide();
            $(".component-Right-Header span").eq(0).addClass("cur").siblings().removeClass("cur");
            $(".configBox").css("left",0);
            $(".bgBox").css("left",'500px')
            _this.setValue($(this), {
                'isShowConfig': true
            });
        });

        if (insert) {
            this.common.$currentComponent = $ele = $(eleStr);
            $ele.attr("data-type", opt.type);
            $ele.data('data', opt);
            !isNoConfig && this.generateConfig(opt);
            target ? target[insert]($ele) : $(options.box).append($ele);
            isReadyDo && setTimeout(function () {
                _this['ready' + opt.type]($ele);
            }, 1)

        } else {
            return eleStr
        }

    }
    //生成右侧模板
    generateConfig(opt) {
        //获取对应组件的右侧结构模板
        let eleStr = this["fnConfig" + opt.type] && this["fnConfig" + opt.type](opt.config);
        let $ele = $(eleStr);
        if (destroyList.size > 0) {
            //生成模板的同时 销毁之前已经创建好的上传实例对象
            //循环每一个上传实例 然后调用每一个上传实例的destroy方法 销毁上传实例
            //目的是提高性能
            for (let v of destroyList.values()) {
                v.destroy();
            }
            destroyList.clear();
        }
        $ele.attr("data-config", opt.type);
        $ele.data("data", opt);
        $(this.options.configBox).empty().append($ele);
        setTimeout(() => {
            this['cReady' + opt.type] && this['cReady' + opt.type]($ele);
        }, 1)
    }
    //获取对应组件的唯一标识
    getCacheKey() {
        return Symbol.for(this.common.expando++);
    }
     //字数限制
   Gblen(str,numLimit){
    var count=0;
    if(str.length<1)return 0;
    var regExp=/[^\x00-\xff]/;
    for(var i=0, len=str.length;i<len;i++){
        regExp.test(str[i])?count+=2:count++;
        if(count>numLimit){
            break
        }
    }
    return i;
}
    //根据对应的组件唯一标识设置对应的组件所需的数据
    setValue(internalKey, opt) {
        //设置对应组件的唯一标识
        internalKey = typeof internalKey === "string" ? internalKey : internalKey.data("data") && internalKey.data("data")['internalKey'];
        if (!internalKey) return;
        let keys = Object.keys(opt);
        //根据唯一标识获取对应的组件所需的数据
        let data = storage.get(Symbol.for(internalKey));
        for (let i = 0, l = keys.length; i < l; i++) {
            //如果对应的属性值为对象形式则进行深度拷贝,否则进行浅拷贝直接赋值
            //data[keys[i]] = typeof opt[keys[i]] === "object" ? $.extend(true, {}, data[keys[i]], opt[keys[i]]) : opt[keys[i]];
            data[keys[i]] = Object.prototype.toString.call(opt[keys[i]]) === "[object Object]" ? $.extend(true, {}, data[keys[i]], opt[keys[i]]) : opt[keys[i]];
            data["$data"][keys[i]] = data[keys[i]];
        }
    }
    //根据对应的组件唯一标识获取对应的组件所需的数据
    getValue(internalKey) {
        return typeof internalKey === "string" ? storage.get(Symbol.for(internalKey)).$data : internalKey.data('data').$data;
    }
    //根据对应的组件唯一标识删除对应的组件所需的数据以及对应的已经生成的页面结构
    removeComment(ele) {
     
        let internalKey = ele.data('data').internalKey;
        let key = Symbol.for(internalKey);
        storage.delete(key);
        //销毁对应组件的上传的实例
        if (destroyList.size > 0 && destroyList.has(key)) {
            destroyList.delete(key);
        }
        //移出对应的组件元素
        ele.remove();
        $(this.options.configBox).empty()
    }
    //获取当前组件 右侧配置数据时会用到
    getCurrentComponent() {
        return this.common.$currentComponent;
    }

    getX() {
        return $('.component-Main').scrollLeft();
    }

    getY() {
        return $('.component-Main').scrollTop();
    }

    regHttp(value){
        let reg=/^(http|https)\:\/\//;
        if(reg.test(value) || value == '' || value==='###'){
            return true;
        } else{
            alert("请输入含有http://或https://的正确链接地址。");
            return false;
        }
    }
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURIComponent(window.location.search).substring(1).replace('param=',"").match(reg);
        
    //     var s = "?param=topicId%3D390%26name%3Dtestz2%26folder%3D201808%2Fz2%26createTime%3D1533630791%26plat%3Dpc"
    //     var r = decodeURIComponent(s).substring(1).match(reg)
    //    console.log(r)
      
        return r && decodeURIComponent(r[2]);
    }

}