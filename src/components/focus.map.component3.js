import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
let tools = new Utils();
import BaseUploader from 'baseUploader';
let doc = document;
let win = window;
import DragClass from '../common/drag.init';



let pageHtml = `
                    <div class="editorbox">
                        <div class="editor_banner editor_common editorbox-body">
                         {{each arrList}}
                            <div data-item="{{$index}}">
                             <h1 class="banner_img">图片{{$index + 1}}<span data-query="DelBannerBtn3" style="display:block;cursor:pointer;margin-left:10px;float:right;width:36px;height:16px;line-height:14px;font-size:12px;text-align:center;border: 1px solid #B6BECD;border-radius: 4px;">删除</span></h1> 
                            <h4>图片上传</h4>
                            <dl class="clearfix">
                                <dt>
                                    <input value="{{$value.oldSrc}}"  disabled="true" class="" type="text" placeholder="{{$value.fileUrl}}"  data-name="$value.fileUrl">
                                    <span>X：</span>
                                </dt>
                                <dd id={{picker}}{{$index}}>本地上传</dd>
                            </dl>
                            <i>说明：JPG.PNG</i>
                            <div class="padTop15">
                                <h4>标题</h4>
                                <input data-key-banner3="title,_title" maxlength="20" placeholder="" value="{{$value.title}}"   type="text" class="url_input">
                            </div>
                            <div class="padTop15">
                                <h4>跳转链接</h4>
                                  <input type="text" data-key-url3="regURl" data-key-banner3="url,_url" placeholder=""  value="{{$value.url}}" class="url_input">
                            </div>
                            <br>
                            <br>
                            <br>
                           {{/each}} 
                            <div class="padTop20">
                                <button class="padTop20-btn" data-query="button12">+增加图片</button>
                            </div>
                            </div>
                        </div>
                    </div>
`;
let pageHtmlOne = `
    <div class="playerdata banner3" style="left:{{x}}px; top:{{y}}px;">
                <div class="box-content-tt"  id="featured-area">
                    <ul>
                        {{each list}}
                             <li>
                             {{if $value.url}}
                                <a {{if $value.url}}href="{{$value.url}}" target="_blank"{{/if}} style="position: relative;cursor:pointer;">
                                    <img src="{{$value.fileUrl}}" alt="{{$value.title}}" />
                                    <div class="_blank-style-box" style="bottom:3px;">
                                       {{$value.title}}
                                    </div>
                                </a>
                                {{/if}}
                                {{if !$value.url}}
                                <a {{if $value.url}}href="{{$value.url}}" target="_blank"{{/if}} style="position: relative;cursor:default;">
                                    <img src="{{$value.fileUrl}}" alt="{{$value.title}}" />
                                    <div class="_blank-style-box" style="bottom:3px;">
                                       {{$value.title}}
                                    </div>
                                </a>
                                {{/if}}
                             </li>
                        {{/each}}
                    </ul>
               </div>
    </div>
`;

let viewHTML = `
<div class="playerdata banner3 dragDiv" style="position:absolute;left:{{x}}px;top:{{y}}px;width:960px;height:360px;box-sizing:content-box;cursor:pointer;">
<div class="selectDiv" ></div>
       
<div class="box-content-tt"  id="featured-area" style="box-sizing:content-box">
    <ul class="roundabout-holder" style="padding: 0px; position: relative;">
        {{each Leftlist as value i}}
        {{if i==0}}
        <li class="roundabout-moveable-item roundabout-in-focus" style="position: absolute;box-sizing:content-box; left: -73px; top: -32px; width: 640px; height: 360px; opacity: 1; z-index: 280; font-size: 12px;">
                <a  style="display:block;height:100%;position: relative;cursor:move">
                    <img src="{{value.fileUrl}}" alt="{{value.title}}" />
                    <div class="_blank-style-box">
                       {{value.title}}
                    </div>
                </a>
             </li>
{{/if}}
{{if i==1}}
<li class="roundabout-moveable-item" style="position: absolute;box-sizing:content-box; left: 249px; top: 23px; width: 448px; height: 252px; opacity: 0.7; z-index: 190; font-size: 8.4px;">
<a  style="display:block;height:100%;position: relative;cursor:move;">
<img src="{{value.fileUrl}}" alt="{{value.title}}" />
<div class="_blank-style-box">
   {{value.title}}
</div>
</a>
</li>
{{/if}}
{{if i!=Leftlist.length-1||i!=0||i!=1}}
<li class="roundabout-moveable-item" style="position: absolute;box-sizing:content-box; left: 120px; top: 77px; width: 256px; height: 144px; opacity: 0.4; z-index: 100; font-size: 4.8px;">
<a style="display:block;height:100%;position: relative;cursor:move;">
<img src="{{value.fileUrl}}" alt="{{value.title}}" />
<div class="_blank-style-box">
   {{value.title}}
</div>
</a>
</li>
{{/if}}

{{if i==Leftlist.length-1}}
<li class="roundabout-moveable-item" style="position: absolute;box-sizing:content-box; left: -202px; top: 23px; width: 448px; height: 252px; opacity: 0.7; z-index: 190; font-size: 8.4px;">
<a  style="display:block;height:100%;position: relative;cursor:move;">
<img src="{{value.fileUrl}}" alt="{{value.title}}" />
<div class="_blank-style-box">
   {{value.title}}
</div>
</a>
     </li>
{{/if}}
        {{/each}}
    </ul>
</div>
</div>
`;
let $ele;
let _scrollTop;

tools.register({
    type: "C",
    metaData: {
        html: pageHtmlOne,
        cssDepends: ['http://t.xcar.com.cn/zteditor/assets/css/banner3.component.css'],
        jsDepends: ['http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js', 'http://icon.xcar.com.cn/wxs/moban/js/jquery.roundabout-1.0.min.js', 'http://icon.xcar.com.cn/wxs/moban/js/jquery.easing.1.3.js', 'http://t.xcar.com.cn/zteditor/assets/js/banner3.component.js', 'http://t.xcar.com.cn/zteditor/assets/js/banner3-init.js'],
        css: 'body{font-family: "Microsoft YaHei";}',
        code: ''
    },
    editData: {
        template: viewHTML,
        configTml: pageHtml
    },
    getData: function (ele) {
        let data = tools.getValue($(ele));
        for (let i = 0; i < data.list.length; i++) {
            if (!tools.regHttp(data.list[i].url)) {
                return 'false'
            }
        }
        let temp = [];
        for (let v of data.list) {
            v.fileUrl && temp.push(v)
        }
        data.list = temp.slice(0);
        if (data.list.length < 4) {
            alert('组件【焦点图3】，至少需要填充4张图片');
            return 'false'
        }
        return data
    },
    ready(ele) {

        setTimeout(() => {
            let dragObj = new DragClass();
            dragObj.init();
        }, 1)
    },
    //右侧配置项结构ready回调
    cReady(ele) {
        let tempData = tools.getValue(ele);
        let tempArr = tempData.config.arrList;
        for (let i = 0, l = tempArr.length; i < l; i++) {
            let promise = new BaseUploader({ pick: { id: '#filePicker' + i } }).init();
            promise.then((rs) => {

                if (rs.status === "success") {
                    tempArr[i] = Object.assign(tempArr[i], { fileUrl: rs.msg, oldSrc: rs.data.oldimgname });
                    tempData.list = tempArr.slice(0);
                    tempData.Leftlist[i].fileUrl = rs.msg
                    tempData.imgSrc = rs.msg
                } else {
                    alert(rs.msg);
                }
                tools.setValue(ele, Object.assign(
                    { 'imgSrc': tempArr[0].fileUrl || 'http://t.xcar.com.cn/zteditor/assets/img/banner3.png' },
                    {

                        isShowConfig: true,
                        refresh: true
                    }
                ));
            }).catch(() => {

                tools.setValue(ele, Object.assign(
                    { 'imgSrc': tempArr[0].fileUrl || 'http://o7pp28l2f.bkt.clouddn.com/topic_diy/2018/day_0725/b7ab404a79505710a56a7ee61cb870d8.jpg' },
                    {
                        isShowConfig: true,
                        refresh: true
                    }
                ));
            });
        }

        $('[data-config] >div')[0].scrollTop = typeof _scrollTop !== "undefined" ? _scrollTop :0;
    }
});

export default class TestComponent {
    constructor(opt) {
        this.defaults = {
            addBtn: '[data-query="button3_ty"]',
            configBox: '[data-config]',
            addBtnOne: '[data-query="button12"]',
            DelBannerBtn3: '[data-query="DelBannerBtn3"]',
            uploaderOptions: {
                pick: "filePicker",//上传按钮
            },
        };
        this.options = Object.assign(true, {}, this.defaults, opt)
    }
    init() {
        this.bindEvent();
    }
    bindEvent() {
        let _this = this;
        let options = _this.options;

        $(doc).off("input.banner").on("input.banner", "input[data-key-banner3],textarea[data-key-banner3]", function (e) {
           let that=$(this);
            let $ele = tools.getCurrentComponent();
            let type = $(e.target).closest(_this.options.configBox).data("data").type;
            if (type !== "C") {
                return
            }
            let value = $(this).val();
            //     if($(this).attr('data-key-banner3')=='title,_title'){
            //         var count=tools.Gblen($(this).val(),40);
            //         value=value.substring(0,count);
            //         $(this).val(value);
            //    }
            //    if($(this).attr('data-key-banner3')=='describe,_describe'){
            //        var count=tools.Gblen($(this).val(),100);
            //        value=value.substring(0,count);
            //        $(this).val(value);
            //    }
            let $range = $(this).closest('[data-item]');
            let index = $range.attr('data-item');
            let keys = $(this).attr("data-key-banner3").split(',');
            let tempData = tools.getValue($ele);
            tempData.config.arrList[index] = Object.assign(tempData.config.arrList[index], {
                [keys[0]]: this.value
            });
            tempData.list = tempData.config.arrList.slice(0);
            tempData.Leftlist[index][keys[0]] = this.value;
            tools.setValue($ele, {
                refresh: that.attr("data-key-banner3")=='url,_url'?false:true
            })
        });
        $(doc).on("change.banner", "input[data-key-url3]", function (e) {
            tools.regHttp(e.currentTarget.value)
        });
        function GenNonDuplicateID(randomLength) {
            return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
        }
        //点击按钮事件
        $(doc).on('click', this.options.addBtn, () => {
            tools.generate({
                type: "C",
                imgSrc: 'http://t.xcar.com.cn/zteditor/assets/img/banner3.png',
                list: [
                    {
                        fileUrl: '',
                        title: '',
                        describe: '',
                        url: '',
                        oldSrc: ''
                    }
                ],
                Leftlist: [
                    {
                        fileUrl: 'http://pic.xcarimg.com/img/xbb/pic/2017/12/c_cacf2754eae92291c702e843f38201ee.jpg',
                        title: '标题',
                        describe: '',
                        url: '',
                        oldSrc: ''
                    },
                    {
                        fileUrl: 'http://pic.xcarimg.com/img/xbb/pic/2017/12/c_89fe7c09c91045dfe661843e32f88d87.jpg',
                        title: '标题',
                        describe: '',
                        url: '',
                        oldSrc: ''
                    },
                    {
                        fileUrl: 'http://pic.xcarimg.com/img/xbb/pic/2017/12/c_f5cc6eaa5d2c7449824a15a36e6a4665.jpg',
                        title: '标题',
                        describe: '',
                        url: '',
                        oldSrc: ''
                    },
                    {
                        fileUrl: 'http://pic.xcarimg.com/img/xbb/pic/2017/11/c_f255df0aab39df345d3eb3e4c99cc00e.jpg',
                        title: '标题',
                        describe: '',
                        url: '',
                        oldSrc: ''
                    }
                ],
                x: tools.getX,
                y: tools.getY,
                componentId: "focus" + GenNonDuplicateID(),
                config: {//侧右配置项数据
                    picker: _this.options.uploaderOptions.pick,
                    arrList: [
                        {
                            fileUrl: '',
                            title: '',
                            describe: '',
                            url: '',
                        },
                        {
                            fileUrl: '',
                            title: '',
                            describe: '',
                            url: '',
                        },
                        {
                            fileUrl: '',
                            title: '',
                            describe: '',
                            url: '',
                        },
                        {
                            fileUrl: '',
                            title: '',
                            describe: '',
                            url: '',
                        }
                    ]
                }
            }, "append", true);
        });
        //绑定增加图片事件
        $(doc).on('click', this.options.addBtnOne, function (evt) {
            evt.stopPropagation();
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data").type;

            if (type !== 'C') return;
            let tempData = tools.getValue($ele);


            _scrollTop = $ele[0].scrollTop + 10000;

            if (tempData.config.arrList.length < 15) {

                tempData.list.push({
                    fileUrl: '',
                    title: '',
                    describe: '',
                    url: '',
                    oldSrc: ''
                });
                tempData.Leftlist.push({
                    fileUrl: '',
                    title: '',
                    describe: '',
                    url: '',
                    oldSrc: ''
                });
                tempData.config.arrList.push({
                    fileUrl: '',
                    title: '',
                    describe: '',
                    url: '',
                    oldSrc: ''
                });
                tools.setValue($ele, {
                    isShowConfig: true,
                    refresh: true
                })
            } else {
                alert('创建数量过多')
            }
            //$(options.configBox)[0].scrollTop=_scrollTop||10000000;

        });
        var self;
        //删除焦点图片
        $(doc).on("click.focusczh3", options.DelBannerBtn3, function (e) {
            //e.stopPropagation();
            self = $(this);
            //添加增加的代码
            let $ele = tools.getCurrentComponent();
            let obj = tools.getValue($ele);

            if(obj.Leftlist.length == 4){
                alert('删除张数必须大于5张');
                return
            }
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'C') return;
            $(".bgDelBox").show();
            $(".ztDelBoxSmall").show(200);
        });

        $(doc).on('click.focusczh3', '.ztOperateDelBtnSmall', function (e) {
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'C') return;
            let BannerIndex = self.closest('[data-item]').attr('data-item');

            var obj = tools.getValue($ele);
            obj.config.arrList.splice(BannerIndex, 1);
            obj.list.splice(BannerIndex,1)
            obj.Leftlist.splice(BannerIndex, 1);
            tools.setValue($ele, {
                isShowConfig: true,
                refresh: true
            })
            $(".bgDelBox").hide();
            $(this).closest(".ztDelBoxSmall").hide(200);
        })
        $(".ztOperateCancelBtnSmall,.ztCloseBtnSmall").on('click.focusczh3', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(".bgDelBox").hide();
            $(this).closest(".ztDelBoxSmall").hide(200);
            return;
        })
        // 位置
        $(doc).off('click.lty1').on('click.lty1', options.configBox, function () {
            let $ele = $(this).find('.editorbox-body');
            if ($ele.length < 1) return;
            _scrollTop = $ele[0].scrollTop;

        });
    }
}

