/**
 * Created by zhoulongfei on 2018/7/3.
 * E-mail:36995800@163.com
 */

import * as $ from 'jquery';
import Utils from 'utils';
import BaseUploader from 'baseUploader';
import DragClass from '../common/drag.init';

let tools = new Utils();
let doc = document;
let item = `{{each list}}     {{set type = $value.type}}  {{set tabIndex = $index}}                            
                            <div data-tab="{{$index}}">
                            <div class="headerTab" style="overflow:hidden;margin-top:10px;">                                
                            <span style="display:block;float:left;padding: 0 5px;">标签 {{$index+1}}</span><h4 style="float:left;width:115px;margin-top:7px;text-align:center;border-bottom:1px solid #ccc"></h4><span class="DelTabBtn" style="display:block;cursor:pointer;margin-left:10px;float:left;width:36px;height:16px;line-height:14px;font-size:12px;text-align:center;border: 1px solid #B6BECD;border-radius: 4px;">删除</span>
                            </div> 
                            <br>
                                <div class="swich_wrap">
                                    <h5>切换内容</h5>
                                    <ul class="clearfix"  data-query="tabTcT" data-p="type">
                                        <li {{if type==="img"}}class="active"{{/if}} data-v="img">图片</li>
                                        <li {{if type==="article"}}class="active"{{/if}} data-v="article">文章</li>
                                        <li {{if type==="video"}}class="active"{{/if}} data-v="video">视频</li>    
                                    </ul>
                                </div>                                 
                                <h4>标签{{$index+1}}图片</h4>
                                <dl class="clearfix">
                                    <dt>
                                        <input type="text" disabled placeholder="{{$value.fileName}}">
                                        <span>X：</span>
                                    </dt>
                                    <dd id="filePickerTab" data-file="tabSrc,{{$index}}">本地上传</dd>
                                </dl>                                
                                {{if type!=="video"}}
                                    {{each $value.list}}
                                    <div class="headerTabInner" data-item="{{$index}}" style="overflow:hidden;margin-top:10px;">     
                                    <span style="display:block;float:left;padding: 0 5px;">图片 {{$index+1}}</span><h4 style="float:left;width:115px;margin-top:7px;text-align:center;border-bottom:1px solid #ccc"></h4><span class="DelImgBtn" style="display:block;cursor:pointer;margin-left:10px;float:left;width:36px;height:16px;line-height:14px;font-size:12px;text-align:center;border: 1px solid #B6BECD;border-radius: 4px;">删除</span>
                                    </div>
                                     
                                    <div data-item="{{$index}}" class="padTop15">
                                        <h4>图片上传</h4>
                                        <dl class="clearfix">
                                            <dt>
                                                <input type="text" [(change)] disabled placeholder="{{$value.fileName}}">
                                                <span>X：</span>
                                            </dt>
                                            <dd id="filePickerTab" data-file="src,{{tabIndex}},{{$index}}">本地上传</dd>
                                        </dl>
                                       
                                        <div class="padTop15">
                                            <h4>标题</h4>
                                            <input type="text" [(change)] data-key="title" maxlength="20" value="{{$value.title}}"  class="url_input" placeholder="20个字符之内">
                                        </div>
                                        {{if type==='article'}}
                                            <div class="padTop15">
                                                <h4>描述</h4>
                                                <textarea [(change)] data-key="des"  maxlength="50"  placeholder="这里输入描述">{{$value.des}}</textarea>
                                            </div>
                                        {{/if}}
                                        <div class="padTop15">
                                            <h4>跳转链接</h4>
                                            <input data-key-url11="regURl" type="text" [(change)] data-key="link" value="{{$value.link}}" class="url_input" placeholder="这里输入跳转链接">
                                        </div>
                                    </div>
                                    {{/each}}
                                    <div class="padTop20">
                                        <button data-query="addTabImgBtn">+{{if type !== 'article'}}增加图片{{/if}}{{if type === 'article'}}增加文章{{/if}}</button>
                                    </div>
                                {{/if}}
                                {{if type==="video"}}
                                    {{each $value.list}}
                                        <div data-item="{{$index}}">
                                            <div class="padTop15">
                                            <div class="headerTabInner" data-item="{{$index}}" style="overflow:hidden;margin:10px 0;">     
                                            <span style="display:block;float:left;padding: 0 5px;">视频id{{$index+1}}</span><h4 style="float:left;width:110px;margin-top:7px;text-align:center;border-bottom:1px solid #ccc"></h4><span class="DelVideoBtn" style="cursor:pointer;display:block;pointer;margin-left:10px;float:left;width:36px;height:16px;line-height:14px;font-size:12px;text-align:center;border: 1px solid #B6BECD;border-radius: 4px;">删除</span>
                                            </div>
                                                <input type="text" [(change)] data-key="videoId" value="{{$value.src}}" class="url_input" placeholder="">
                                            </div>
                                        </div>
                                    {{/each}}
                                    <div class="padTop20">
                                        <button data-query="addTabVideoBtn">+增加视频</button>
                                    </div>
                                {{/if}}                             
                            </div>
                            <br>
                            {{/each}}`;

let articleSliderStr = `
            <div class="div-el playerdata2 " style="display: block;">
                <div class="box-content" id="{{$value.id}}">
                    <div class="xfocus_06" style="float: left">
                        <!-- 左右按钮 -->
                        <a href="javascript:void(0)" class="prev prev4" style="display: none;"><span></span></a>
                        <a href="javascript:void(0)" class="next next4" style="display: none;"><span></span></a>
                        <!-- 图片列表 -->
                        <div class="view">
                            <ul>
                            {{each $value.list}}
                                <li><a  {{if $value.link}} href="{{$value.link}}"{{/if}} target="_blank"><img src="{{$value.src}}" alt="" title="{{$value.title}}" width="540" height="495"></a></li>
                            {{/each}}
                            </ul>
                        </div>
                    </div>
                    <div class="box-content-list1" style="float: left">
                        <div class="text">
                            <ul style="list-style: none;padding: 0">
                                {{each $value.list}}
                                <li class="current">
                                    <a style="cursor:default;text-decoration:none;">{{$value.title}}</a>
                                    <div class="current-box">{{$value.des}}</div>
                                    <div style="position:absolute;right:0px;bottom:20px;">
                                        {{if $value.link}}<a class="fix-a" target="_blank"  href="{{$value.link}}" style="color: red;text-align: right; font-size: 16px;
                                        font-family:'Microsoft YaHei'">查看更多>></a>{{/if}}
                                    </div>
                                </li>
                                {{/each}}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
`;

let imgSliderStr = `
<div class="playerdata" style="display: block;">
                <div class="xfocus_07 box-content" id="{{$value.id}}">
                    <!-- 左右按钮 -->
                    {{if $value.list.length>=1}}
                    <a href="javascript:void(0)" class="prev prev1" style="display: none;"><span></span></a>
                    <a href="javascript:void(0)" class="next next1" style="display: none;"><span></span></a>
                    {{/if}}
                    <!-- 图片列表 -->
                    <div class="view">
                        <ul>
                            {{each $value.list}}
                            <li><a {{if $value.link}} href="{{$value.link}}"{{/if}}  target="_blank"><img src="{{$value.src}}" alt="" title="{{$value.title}}" width="770" height="495"></a></li>
                            {{/each}}

                        </ul>
                    </div>
                    <!-- 按钮列表 -->
                    <!-- 图注列表 -->
                    <div class="text text-pp" style="height:80px;padding:0">
                        <ul>
                            {{each $value.list}}
                            <li class="current" style="display: none;height:80px">
                                <a style="cursor:default;text-decoration:none">{{$value.title}}</a>
                            </li>
                            {{/each}}
                        </ul>
                    </div>
                </div>
            </div>`;

let html = `<div data-query="tabBox" class="tab-component-box clearfix dragDiv" style="position:absolute;left:{{x}}px;top:{{y}}px;overflow:hidden">
                        
<div style="width:300%">
                         {{if position === "T" || position === 'L'}}
                             <div class="{{if position === 'L'}}left tabLeft{{/if}}{{if position === 'T'}}tabTop{{/if}} clearfix">
                                <ul data-query="zTab">
                                    {{each list}} <li data-trigger="{{trigger}}"><img src="{{$value.tabSrc}}" /></li>{{/each}}
                                </ul>
                            </div>     
                        {{/if}}                  
                        <div class="tab-switching itemBox clearfix {{if position === 'L' || position === 'R'}}left{{/if}}">
                            {{each list}}
                        <div style="width: 770px;height: 495px;" class="div-el" {{if $index===0}} style="display: block;"{{/if}}>
                           {{if $value.type==="img"}}
                                ` + imgSliderStr + `
                           {{/if}}
                           {{if $value.type==="article"}}                    
                               ` + articleSliderStr + ` 
                           {{/if}}
                            {{if $value.type==="video"}}
                                <div  class="playerdataczhTab"  data-flag="nolive"  data-videoId="{{$value.videoIds}}">
                                    <div class="box-content box-contentBigTab" id="{{$value.id}}">
                                         <div class="focusczh videoBigTab">
                                             <!-- 左右按钮 -->
                                             <a href="javascript:void(0)" class="prevTab btnprev"><span></span></a>
                                             <a href="javascript:void(0)" class="nextTab btnnext"><span></span></a>
                                             <!-- 图片列表 -->
                                             <div class="view">
                                                 <ul>
                                                 {{each $value.list}}                                                                      
                                                     <li></li>                                         
                                                 {{/each}}                                        
                                                 </ul>
                                             </div>
                                         </div>                            
                                     </div>
                                </div>                                    
                            {{/if}}                   
                            </div>
                        {{/each}}   
                        </div>
                        {{if position === 'B' || position === 'R'}}
                            <div class="{{if position === 'R'}}left tabRight{{/if}} {{if position === 'B'}}tabBottom {{/if}}clearfix">
                                <ul data-query="zTab">
                                    {{each list}} <li data-trigger="{{trigger}}"><img src="{{$value.tabSrc}}" /></li>{{/each}}
                                </ul>
                            </div>
                        {{/if}}
                       </div>
                    </div>`;


let _scrollTop;
tools.register({
    type: "tab",
    metaData: {
        //html:'<div style="left:{{x}}px; top:{{y}}px;"><h1>{{h1}}</h1></div>',
        html: `${html}`,
        cssDepends: [
            'http://t.xcar.com.cn/zteditor/assets/css/base.css',
            'http://t.xcar.com.cn/zteditor/assets/css/videoTab.component.css',
            'http://t.xcar.com.cn/zteditor/assets/css/tab-banner1.css',
            'http://t.xcar.com.cn/zteditor/assets/css/tab-banner2.css',
            'http://t.xcar.com.cn/zteditor/assets/css/tab.css',
            'http://t.xcar.com.cn/zteditor/assets/css/tab.component.css',
        ],
        jsDepends: [
            'http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js',
            'http://t.xcar.com.cn/zteditor/assets/js/player.js',
            'http://t.xcar.com.cn/zteditor/assets/js/tab.js',
            'http://t.xcar.com.cn/zteditor/assets/js/videoFocus.component.js',
            'http://t.xcar.com.cn/zteditor/assets/js/videoTab.init.js',
            'http://t.xcar.com.cn/zteditor/assets/js/tab-banner1.js',
            'http://t.xcar.com.cn/zteditor/assets/js/tab-banner1-int.js',
            'http://t.xcar.com.cn/zteditor/assets/js/tab-banner2.js',
            'http://t.xcar.com.cn/zteditor/assets/js/tab-banner2-int.js',

        ],
        css: '',
        code: ''
    },
    editData: {
        template: `<div class="tab-component-box clearfix dragDiv" style="position:absolute;left:{{x}}px;top:{{y}}px;opacity:1;overflow:hidden">
        <div class="selectDiv" ></div>
                
        <div style="width:200%">
                         {{if position === "T" || position === 'L'}}
                             <div class="{{if position === 'L'}}left tabLeft{{/if}}{{if position === 'T'}}tabTop{{/if}} clearfix">
                                <ul>
                                    {{each list}} <li><img src="{{$value.tabSrc}}" /></li>{{/each}}
                                </ul>
                            </div>     
                        {{/if}}                  
                        <div class="itemBox clearfix {{if position === 'L' || position === 'R'}}left{{/if}}">
                            <div class="item">
                                {{if config.current.type==="img"}}
                                    <h5 class="itemH5">{{config.current.title}}</h5>
                                    <img src="{{config.current.src}}"  width="770" height="495" />
                                {{/if}}
                                {{if config.current.type==="article"}}
                                    <div class="tabImgBox left"><img src="{{config.current.src}}" width="540" height="495"></div>
                                    <div class="tabDesBox left">
                                        <h5>{{config.current.title}}</h5>
                                        <p>{{config.current.des}}</p>
                                        {{if config.current.link}}<a style="color: red;font-size: 16px;
                                        font-family:'Microsoft YaHei'">查看更多>></a>{{/if}}
                                        
                                    </div>
                                {{/if}}
                                {{if config.current.type==="video"}}
                                    <canvas class="vCanvas" width="770" height="495"></canvas>
                                    
                                {{/if}}
                            </div>
                        </div>
                        {{if position === 'B' || position === 'R'}}
                            <div class="{{if position === 'R'}}left tabRight{{/if}} {{if position === 'B'}}tabBottom {{/if}}clearfix">
                                <ul>
                                    {{each list}} <li><img src="{{$value.tabSrc}}" /></li>{{/each}}
                                </ul>
                            </div>
                        {{/if}}
                         </div>                   
                    </div>`,
        configTml: ` <div class="editorbox" style="position:absolute;min-height:550px;left:0;top:0;bottom:0;right:0;overflow-y:auto;">
                        <div class="editor_banner editor_common">
                            <h1 class="tab_img">标签</h1>
                            <ul class="clearfix tagbox" data-query="tabTc" data-p="position">
                                <li {{if position==="T"}}class="active"{{/if}} data-v="T">上</li>
                                <li {{if position==="B"}}class="active"{{/if}} data-v="B">下</li>
                                <li {{if position==="L"}}class="active"{{/if}} data-v="L">左</li>
                                <li {{if position==="R"}}class="active"{{/if}} data-v="R">右</li>
                            </ul>
                            <h4>组件</h4>                             
                            <i>说明：JPG.PNG</i>
                            
                            <div class="swichbox clearfix">
                                <p>切换方式：</p>
                                <ul  data-query="tabTc" data-p="trigger">
                                    <li {{if trigger==="hover"}}class="active"{{/if}} data-v="hover">悬停</li>
                                    <li {{if trigger==="click"}}class="active"{{/if}} data-v="click">点击</li>
                                </ul>
                            </div>                                                      
                            ${item}
                            <div class="padTop20">
                                <button data-query="addTabsBtn">+增加标签</button>
                            </div>    
                        </div>
                    </div>`
    },
    getData: function (ele) {
        let data = Object.assign({}, tools.getValue($(ele)));
        let regExp = /^https?\:\/\//;
        for (let v of data.list) {
           console.log(v)
            if (v.type === 'video'){
                let tempStr=[];
                for(let key of v.list){
                    tempStr.push(key.videoId);
                }
                v.videoIds=tempStr.join(',');
              
                continue
            }
            for (let vv of v.list) {
                if (!vv.link.trim()) {
                    continue;
                }
                if (!regExp.test(vv.link.trim())) {
                    alert("请输入含有http://或https://的正确链接地址。");
                    return 'false'
                }
            }
        }
        return data;
    },
    ready(ele) {
        setTimeout(() => {
            let dragObj = new DragClass();
            dragObj.init();
        }, 1);
        let canvas=doc.getElementsByClassName('vCanvas');
        for(let v of canvas){
            let  ctx = v.getContext('2d');
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.moveTo(359.5,222.5);
            ctx.lineTo(359.5,272.5);
            ctx.lineTo(405.5,247.5);
            ctx.lineTo(359.5,222.5);
            ctx.closePath();
            ctx.strokeStyle='rgba(255,255,255,0.9)';
            ctx.stroke();
            ctx.beginPath();
            //ctx.moveTo(384.5,247.5);
            ctx.lineWidth = 1.5;
            ctx.arc(374.5,247.5,55,0,6.28);
            ctx.closePath();
            ctx.stroke();
        }
    },
    //右侧配置项结构ready回调
    cReady(ele) {
        let tempData = tools.getValue(ele);
        let count = 0;
        console.log('cReady', tempData);
        $('[data-file]').each((index, _this) => {
            let arr = _this.getAttribute('data-file').split(',');
            let id = 'filePicker' + count++;
            let property = arr[0];
            let tabIndex = arr[1];
            let indexItem = arr[2];
            _this.setAttribute('id', id);
            let promise = new BaseUploader({
                pick: {
                    id: `#${id}`
                }
            }).init();
            promise.then((rs) => {
                if (rs.status === "success") {
                    arr.length > 2 ?
                        Object.assign(tempData.config.list[tabIndex].list[indexItem], {
                            [property]: rs.msg,
                            fileName: rs.data.oldimgname
                        })
                        : Object.assign(tempData.config.list[tabIndex], {
                        [property]: rs.msg,
                        fileName: rs.data.oldimgname
                    });
                    tempData.list = tempData.config.list.slice(0);
                    if(arr.length > 2){
                        tempData.config.current=Object.assign({type:tempData.config.list[tabIndex].type},tempData.config.list[tabIndex].list[indexItem])
                    }

                } else {
                    alert(rs.msg);
                }
                tools.setValue(ele, Object.assign(tempData, {isShowConfig: true, refresh: true}));
            }).catch(() => {
                tools.setValue(ele, Object.assign(tempData, {isShowConfig: true, refresh: true}));
            });

        });
        $('[data-config]')[0].scrollTop = typeof _scrollTop !== "undefined" ? _scrollTop : 10000000;

    }
});


export default class TabComponent {
    constructor(opt) {
        this.defaults = {
            cache: {},
            addBtn: '[data-query="addTabBtn"]',//添加控件
            addTabBtn: '[data-query="addTabsBtn"]',//添加tab
            addImgBtn: '[data-query="addTabImgBtn"]',//添加img
            addVideoBtn: '[data-query="addTabVideoBtn"]',//添加视频
            DelVideoBtn: '.DelVideoBtn',//删除视频
            DelTabBtn: '.DelTabBtn',//删除tab标签
            DelImgBtn: '.DelImgBtn',//删除图片
            configBox: '[data-config]',
            box: '[data-query="configBox"]',
            tab: '[data-query="tabTc"] li',
            tabT: '[data-query="tabTcT"] li',
            pick: "filePicker",//上传按钮id
            tabItem: '[data-tab]',
            item: '[data-item]',
            picker: '[data-file]',
            imgLimit: 5,
            videoLimit: 5


        };
        this.options = $.extend(true, {}, this.defaults, opt);
    }

    init() {
        this.initStyle();
        this.bindEvent();
    }

    bindEvent() {
        let cache = this.options.cache;
        let options = this.options;
        let _this = this;

        let types = {
            type: 'img',
            position: 'T',
            trigger: 'hover'
        };
        let tempImg = '';
        let typeDefault = {
            img: {
                type: 'img',
                tabSrc: tempImg,
                list: [{
                    link: '',
                    src: '',
                    title: ''
                }]
            },
            article: {
                type: 'article',
                tabSrc: tempImg,
                list: [{
                    title: '',
                    des: '',
                    link: '',
                    src: ''
                }]
            },
            video: {
                type: 'video',
                tabSrc: tempImg,
                list: [
                    {
                        videoId: '',
                        src: ''
                    }

                ]
            }
        };
        $(doc).off('click.zlf').on('click.zlf', options.configBox, function () {
             _scrollTop = this.scrollTop;
         });
        $(doc).on('click', options.tabT, function (evt) {
            evt.stopPropagation();
            _scrollTop = $(options.configBox)[0].scrollTop;
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            let type = this.getAttribute('data-v');
            let $ele = tools.getCurrentComponent();
            let data = tools.getValue($ele);
            let tabIndex = $(this).closest(options.tabItem).attr('data-tab');
            data.list[tabIndex] = $.extend(true, {id: `id${+(new Date())}`}, typeDefault[type]);
            data.config.list[tabIndex] = $.extend(true, {id: `id${+(new Date())}`}, typeDefault[type]);
            tools.setValue($ele, {
                isShowConfig: true,
                refresh: true
            });

        });
        $(doc).on('click', options.tab, function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            let property = $(this).closest('ul').attr('data-p');
            types[property] = this.getAttribute('data-v');
            let $ele = tools.getCurrentComponent();
            let data = tools.getValue($ele);
            Object.assign(data, {
                trigger: types.trigger,
                position: types.position
            });
            Object.assign(data.config, {
                trigger: types.trigger,
                position: types.position
            });
            tools.setValue($ele, data, {refresh: true});

        });
        $(doc).on('click', this.options.addBtn, function () {
            tools.generate({
                type: "tab",
                x: tools.getX,
                y: tools.getY,
                trigger: 'hover',//click
                position: 'T',
                list: [],
                config: {//侧右配置项数据
                    position: "T",//L,R,B,
                    trigger: 'hover',//click
                    list: [],
                    current:{}

                }
            }, "append", true);
        });
        $(doc).on("click", this.options.addTabBtn, (evt) => {
            evt.stopPropagation();
            if ($(`${options.configBox} ${options.tabItem}`).length >= 5) {
                alert('最多添加5个标签!');
                return
            }
            let $ele = tools.getCurrentComponent();
            let data = tools.getValue($ele);
            _scrollTop = $(options.configBox)[0].scrollTop + 1000;
            console.log(_scrollTop, 11222222)
            data.config.list.push($.extend(true, {}, Object.assign(typeDefault['img']), {
                id: `id${+(new Date())}`
            }));
            tools.setValue($ele, {
                list:data.config.list.slice(0),
                isShowConfig: true,
                refresh: true
            });

        });

        $(doc).on('click', options.addImgBtn, function (evt) {
            evt.stopPropagation();
            let tabIndex = $(this).closest(options.tabItem).attr('data-tab');
            let $ele = tools.getCurrentComponent();
            let data = tools.getValue($ele);
            let list = data.config.list[tabIndex].list;
            _scrollTop = $(options.configBox)[0].scrollTop;

            if (list.length >= 5) {
                alert('图片最多添加5张！');
                return;
            }
            list.push({
                title: '',
                des: '',
                link: '',
                src: ''
            });
            tools.setValue($ele, {
                list:data.config.list.slice(0),
                isShowConfig: true,
                refresh: true
            });
        });

        $(doc).on('click.zlf', options.addVideoBtn, function (evt) {
            evt.stopPropagation();
            let tabIndex = $(this).closest(options.tabItem).attr('data-tab');
            let $ele = tools.getCurrentComponent();
            let data = tools.getValue($ele);
            let list = data.config.list[tabIndex].list;
            _scrollTop = $(options.configBox)[0].scrollTop;
            if (list.length >= 5) {
                alert('视频最多添加5个！');
                return
            }

            //console.log(_scrollTop,11222224)
            list.push({
                videoId: '',
                src: ''
            });
            tools.setValue($ele, {
                isShowConfig: true,
                refresh: true
            });

        });
        var self;
        //删除图片视频
        $(doc).on('click.tab1', options.DelImgBtn + ',' + options.DelTabBtn + ',' + options.DelVideoBtn, function (evt) {
            evt.stopPropagation();

            self = $(this);
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'tab') return;
            $(".bgDelBox").show();
            $(".ztDelBoxSmall").show(200);

        });
        $(doc).on('click.tab1', '.ztOperateDelBtnSmall', function (e) {
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'tab') return;
            console.log(self)
            let tabIndex = self.closest(options.tabItem).attr('data-tab');
            let itemIndex = self.closest(options.item).attr('data-item');
             console.log(itemIndex)
            if (itemIndex) {
                console.log('A')
                let $ele = tools.getCurrentComponent();
                let data = tools.getValue($ele);
                data.config.list[tabIndex].list.splice(itemIndex, 1);

                data.list[tabIndex].list.splice(itemIndex, 1);
                _scrollTop = $(options.configBox)[0].scrollTop + 1000;
                tools.setValue($ele, {
                    data:{
                        list:data.list
                    },
                    isShowConfig: true,
                    refresh: true
                });
            }
            else {
                console.log('B')
                let $ele = tools.getCurrentComponent();
                let data = tools.getValue($ele);
                console.log(data)
                data.config.list.splice(tabIndex, 1);
                data.list.splice(tabIndex, 1);
                _scrollTop = $(options.configBox)[0].scrollTop + 1000;
                tools.setValue($ele, {
                    isShowConfig: true,
                    refresh: true
                });
            }

            $(".bgDelBox").hide();
            $(this).closest(".ztDelBoxSmall").hide(200);
        })
        $(".ztOperateCancelBtnSmall,.ztCloseBtnSmall").on('click.tab', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(".bgDelBox").hide();
            $(this).closest(".ztDelBoxSmall").hide(200);
            return;
        })
        $(doc).off("input.tab").on('input.tab', `${options.box} input[data-key],${options.box} textarea[data-key]`, function (e) {
            let $ele = tools.getCurrentComponent();
            if (!$ele) return;
            let data = $ele.data('data');
            if (!data || data.type !== 'tab') return;
            let tabIndex = $(this).closest(options.tabItem).attr('data-tab');
            let index = $(this).closest(options.item).attr('data-item');
            //console.log(tabIndex,index);
            let keys = $(this).attr("data-key").split(',');
            let tempData = tools.getValue($ele);
            let v = this.value;
            let temp = {[keys[0]]: v};
            if (keys[0] === 'videoId') {
                temp.src = this.value;
                if (!/^\d+$/.test(this.value)) {
                    let id = _this.getId(this.value);
                    v = id ? id : v;
                }
                Object.assign(tempData.config.list[tabIndex].list[index], {
                    src: this.value
                });
                setTimeout(() => {
                    let ids = [];
                    for (let v of tempData.list[tabIndex].list) {
                        ids.push(v.videoId);
                    }
                    tempData.list[tabIndex].videoIds = ids.join(',');
                    tempData.list = tempData.config.list.slice(0);
                }, 50);

            }

            Object.assign(tempData.config.list[tabIndex].list[index], {
                [keys[0]]: v
            });
            tempData.list = tempData.config.list.slice(0);
            tempData.config.current=Object.assign({type:tempData.config.list[tabIndex].type},tempData.config.list[tabIndex].list[index]);
            tools.setValue($ele, Object.assign(tempData, {refresh: true}));
            console.log(tempData);
        });
        $(doc).on("change.tab", "input[data-key-url11]", function (e) {
            let reg = /^(http|https)\:\/\//;
            if (!reg.test(this.value)) {
                alert("请输入含有http://或https://的正确链接地址。");
            }
        });


    }

    getId(url) {
        var temp = url.match(/youku\.com.+?\/id_([\w\=]+)\.html|http\:\/\/xtv\.xcar\.com\.cn\/.+?\.php\?(videoid|vid)\=([\w\=]+)/);
        //return temp?"http://player.youku.com/player.php/sid/"+temp[1]+"/v.swf":false;
        return temp && (temp[1] || temp[3]) || 1111
    }

    initStyle() {

    }
}