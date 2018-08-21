import Utils from 'utils';
import * as $ from 'jquery';
import DragClass from '../common/drag.init';
let tools = new Utils();
let doc = document;
let win = window;

tools.register({
    type: "videos",
    metaData: {
        html: `<div  class="playerdataczh" data-width="{{width}}" data-height="{{height}}" style="position:absolute;width:{{width}}px;height:{{height}}px;left:{{x}}px;top:{{y}}px" data-flag="{{flagShow?'nolive':'live'}}" data-src="{{liveVideoDataFont}}" data-videoId="{{VideoDataFont}}">
        <div class="box-contentBig" id="{{componentId}}">
             <div class="focusczh videoBig">
                 <!-- 左右按钮 -->
                 <a href="javascript:void(0)" class="prevBig btnprev"><span></span></a>
                 <a href="javascript:void(0)" class="nextBig btnnext"><span></span></a>
                 <!-- 图片列表 -->
                 <div class="view">
                     <ul>
                     {{each VideoBigDataFontArr as value i}}
                     {{if value.length>0}}
                   
                         <li></li>
                       
                       
                         {{/if}}
                         {{/each}}
                        
                     </ul>
                 </div>
             </div>
            
         </div>
         <div class="singalvideoBig" id="bbb{{componentId}}">
        
         </div>
    </div>`,
        cssDepends: ['http://t.xcar.com.cn/zteditor/assets/css/base.css', 'http://t.xcar.com.cn/zteditor/assets/css/videoBig.component.css'],
        jsDepends: ['http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js', 'http://t.xcar.com.cn/zteditor/assets/js/player.js', 'http://t.xcar.com.cn/zteditor/assets/js/player-live.js', 'http://t.xcar.com.cn/zteditor/assets/js/videoFocus.component.js', 'http://t.xcar.com.cn/zteditor/assets/js/videoBig.init.js'],
        css: '',
        code: ''
    },
    editData: {
        template: `<div id="{{componentId}}"  data-type="videos" class="dragDiv" style="width:{{width}}px;height:{{height}}px;left:{{x}}px;top:{{y}}px;">
        <div class="selectDiv" ></div>

        <span class="bg-lefts"></span><span class="bg-rights"></span><div style="width: 100%;height:100%;position:absolute;"><img src='{{imgBigSrc}}' width='100%' height='100%'/></div></div>`,
        configTml: `<div><div class="editorbox">
        <div class="editor_banner editor_common">
            <h1 class="video_img">播放器</h1>
            <ul class="clearfix tabbtn">
            {{each Btn as value i}}
                <li class="{{index==i?'active':''}}">{{value}}</li>
                {{/each}}
            </ul>
            <div class="video_box">
          
               
                {{if show==0}}
                <section>
                {{each VideoData as value i}}
                <div data-video="{{i}}">
                    <h4>视频id{{i+1}}<span data-query="DelBigVideoBtn" style="display:block;cursor:pointer;margin-left:10px;float:right;width:36px;height:16px;line-height:14px;font-size:12px;text-align:center;border: 1px solid #B6BECD;border-radius: 4px;">删除</span></h4>
                   
                    <input style="margin-top:10px;margin-bottom:10px;" data-id="{{i}}" data-key="videoId{{i}}" type="text" class="url_input" placeholder="" value="{{value}}">
                    </div>
                    {{/each}}
                    {{if VideoData.length<=4}}
                    <div class="padTop20">
                        <button data-query="add-videoBtn">+增加视频</button>
                    </div>
                    {{/if}}
                    </section>
                    {{/if}}
                    {{if show!=0}}
                    <section>
                    <h4>直播链接</h4>
                    <input type="text" data-key="onlive" value="{{liveVideoData}}" class="url_input" placeholder="">
                    </section>
                    {{/if}}
                </section>
            </div>
        </div>
    </div></div>`

    },
    getData: function (ele) {
        console.log(ele)
        return tools.getValue($(ele));
    },
    ready(ele) {
        // var x1=tools.getX();
        // var y1=$(".component-Main").scrollTop();
        //  var x2=x1+960;
        // var y2=y1+468;
        // $('#target').Jcrop({
        //       id:tools.getValue(ele).componentId,
        //     setSelect: [x1,y1,x2,y2],
        //     ele:ele
        // },function(){
        //     console.log(this)
        //     window.jcropapi=this;
        //     // console.log(this)
           
        // });
        setTimeout(() => {
            let dragObj = new DragClass();
            dragObj.init();
           
        }, 1)
    }
});
export default class VideoComponent {
    constructor(opt) {
        this.defaults = {
            addBtn: '[data-query="video-button"]',
            DelBigVideoBtn:'[data-query="DelBigVideoBtn"]',
            configBox: '[data-config]'
        };
        this.options = Object.assign(true, {}, this.defaults, opt)
    }
    init() {
        this.bindEvent();
    }
    bindEvent() {
        let _this = this;
        let options=_this.options;
        $('body').on('click.czh', '.tabbtn li', function () {
            var index = $(this).index();
            let $ele = $(this).closest(_this.options.configBox);
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'videos') return;
            var obj = tools.getValue($ele);
            obj.config.VideoData = [""];
            obj.VideoBigDataFontArr = obj.config.VideoData;
            obj.VideoDataFont = "";
            obj.liveVideoDataFont = "";
            obj.config.liveVideoData = "";
            obj.config.index = index;
            obj.config.show = index;
            if (index == 0) {
                obj.flagShow = true;
                var $leftself = tools.getCurrentComponent();
                $leftself.find(".bg-left,.bg-right").show();
               

            } else {
                obj.flagShow = false;
                var $leftself = tools.getCurrentComponent();
                $leftself.find(".bg-left,.bg-right").hide();
            }
            tools.setValue($ele, {
                isShowConfig: true
            })
        })
        $(doc).off("click.czh").on("click.czh", '[data-query="add-videoBtn"]', function (e) {
           e.stopPropagation();
            let $ele = $(this).closest(_this.options.configBox);
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'videos') return;
          
            var obj = tools.getValue($ele);
            var value = "";

            obj.config.VideoData.push(value);
            obj.VideoBigDataFontArr = obj.config.VideoData;
            tools.setValue($ele, {
                isShowConfig: true
            })


        })
        //删除视频
        var self;
        $(doc).on("click.czhDB", options.DelBigVideoBtn, function (e) {
            e.stopPropagation();
             self=$(this);
             let $eles = self.closest(options.configBox);
             let type = $eles.data("data") && $eles.data("data").type;
             if (!type || type !== 'videos') return;
            $(".bgDelBox").show();
            $(".ztDelBoxSmall").show(200);
           
        })
        $(doc).on('click.czhDB','.ztOperateDelBtnSmall',function(e){
          
           
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'videos') return;
            let VideoIndex=self.closest('[data-video]').attr('data-video');
           
            var obj = tools.getValue($ele);
            obj.config.VideoData.splice(VideoIndex,1)
           obj.VideoDataFont=obj.config.VideoData.join(',');
           obj.VideoBigDataFontArr=obj.config.VideoData
           // obj.VideoBigDataFontArr.splice(VideoIndex,1)
            tools.setValue($ele, {
                isShowConfig: true
            })
            $(".bgDelBox").hide();
            $(this).closest(".ztDelBoxSmall").hide(200);
        })
        $(".ztOperateCancelBtnSmall,.ztCloseBtnSmall").on('click.czhDB',function(event){
            event.preventDefault();
            event.stopPropagation();
            $(".bgDelBox").hide();
            $(this).closest(".ztDelBoxSmall").hide(200);
            return;
        }) 
        $(doc).off("input.czh").on("input.czh", "input[data-key]", function (e) {

            let $self = $(this)
            let $ele = $(this).closest(_this.options.configBox);
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'videos') return;
            let id = $(this).attr("data-id");
            let keys = $(this).attr("data-key");


            var obj = tools.getValue($ele);

            obj.config.VideoData[id] = $self.val();
            obj.VideoBigDataFontArr = obj.config.VideoData;
            if ($(this).attr('data-key') == 'onlive') {
                obj.VideoDataFont = obj.config.VideoData.join(',');
                obj.liveVideoDataFont = $self.val();
                obj.config.VideoData = [""];
                obj.VideoBigDataFontArr = obj.config.VideoData;
                obj.config.liveVideoData = $self.val()
            } else {

                obj.VideoDataFont = obj.config.VideoData.join(',');
                obj.liveVideoDataFont = "";
                obj.config.liveVideoData = "";
            }

        });

        function GenNonDuplicateID(randomLength) {
            return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
        }
        $(doc).on('click', this.options.addBtn, () => {
            tools.generate({
                type: "videos",
                imgBigSrc: "http://t.xcar.com.cn/zteditor/assets/images/video-noarrow.png",
                flagShow: true,
                componentId: "focus" + GenNonDuplicateID(),
                x: tools.getX,
                y: tools.getY,
                width:960,
                height:468,
                VideoDataFont: "",
                VideoBigDataFontArr: [""],
                liveVideoDataFont: '',
                config: { //右侧配置项数据
                    show: 0,
                    index: 0,
                    Btn: ['点播', '直播'],

                    VideoData: [""],

                    liveVideoData: '',
                }
            }, "append", true);

        })
    }
}