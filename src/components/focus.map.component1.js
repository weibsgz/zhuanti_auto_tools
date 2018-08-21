import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import BaseUploader from 'baseUploader';
let tools=new Utils();
let doc=document;
let win=window;
import DragClass from '../common/drag.init';

let configHTML = `
     <div class="editorbox editorbox-body">
        <div class="editor_banner editor_common">
        {{each arrList}}
        <div data-item="{{$index}}">
            <h1 class="banner_img">图片{{$index + 1}}<span data-query="DelBannerBtn1" style="display:block;cursor:pointer;margin-left:10px;float:right;width:36px;height:16px;line-height:14px;font-size:12px;text-align:center;border: 1px solid #B6BECD;border-radius: 4px;">删除</span></h1>                     
                <h4>图片上传</h4>
                <dl class="clearfix">
                    <dt>
                        <input value="{{$value.oldSrc}}"  disabled="true" class="" type="text" placeholder=""  data-name="$value.fileUrl">
                        <span>X：</span>
                    </dt>
                    <dd id="{{picker}}{{$index}}">本地上传</dd>
                </dl>
                <i>说明：JPG.PNG</i>
                <div class="padTop15">
                    <h4>标题</h4>
                    <input type="text" maxlength="20"  data-key-banner1="title,_title" placeholder="" value="{{$value.title}}"  class="url_input">
                </div>
                <div class="padTop15">
                    <h4>描述</h4>
                    <textarea maxlength="180" data-key-banner1="describe,_describe" placeholder="" >{{$value.describe}}</textarea>
                </div>
                <div class="padTop15">
                    <h4>跳转链接</h4>
                    <input type="text" data-key-url1="regURl"  data-key-banner1="url,_url" value="{{$value.url}}" placeholder="" class="url_input">
                </div>
                <br>
                <br>
                <br>
                </div>
             {{/each}}   
            <div class="padTop20" >
                <button class="padTop20-btn" data-query="button10">+增加图片</button>
            </div>
        </div>
    </div>`;

let pageHtmlOne = `<div class="playerdata" style="position: absolute; left:{{x}}px; top:{{y}}px;">
                   <div class="box-contentFocus"  id="{{componentId}}" >
                        <div class="xfocus_04" style="float: left">
                            <!-- 左右按钮 -->
                            {{if list.length>1}}
                            <a href="javascript:void(0)" class="prev4"><span></span></a>
                            <a href="javascript:void(0)" class="next4"><span></span></a>
                            {{/if}}
                            <!-- 图片列表 -->
                            <div class="view">
                                <ul>
                                {{each list}}
                                    <li><a {{if $value.url}}href="{{$value.url}}" target="_blank"{{/if}}><img src="{{$value.fileUrl}}" alt="" title="{{$value.title}}" width="350" height="388"></a></li>
                                {{/each}}
                                </ul>
                            </div>
                        </div>
                        <div class="box-content-listFocus" style="float: left">
                            <div class="text" >
                                <ul>
                                    {{each list}}
                                    <li class="current">
                                        <a  class="titleA"  style="display:block;font-size:22px;padding:18px 0 5px 0;cursor:default;font-weight:bold;">
                                            {{$value.title}}
                                        </a>
                                        <div class="current-box">
                                            {{$value.describe}}
                                        </div>
                                        <div class="all-nav-title">
                                        {{if $value.url.length>0}}
                                           <a {{if $value.url}}href="{{$value.url}}" target="_blank"{{/if}} class="moreA" style="color: red;" >查看更多>></a>
                                        {{/if}}
                                        </div>
                                    </li>
                                    {{/each}}
                                </ul>
                            </div>
                        </div>
                    </div>
               </div>`;
let pageHtmlTwo = `<div class="box-content dragDiv banner1" style="left:{{x}}px; top:{{y}}px;">
<div class="selectDiv" ></div>
       
     <div class="box-contentFocus" id="focus20izk7uu07400000000">
     <div class="xfocus_04" style="float: left">
         <!-- 左右按钮 -->
         <a href="javascript:void(0)" class="prev4"><span></span></a>
         <a href="javascript:void(0)" class="next4"><span></span></a>
         <!-- 图片列表 -->
         <div class="view">
             <ul>
             
                 <li style="display: list-item;"><a><img src="{{imgSrc}}" alt="" title="" width="350" height="388"></a></li>
             
             </ul>
         </div>
     </div>
     <div class="box-content-listFocus" style="float: left">
         <div class="text">
             <ul>
                 
                 <li class="current" style="display: list-item;">
                     <a class="titleA" style="display:block;font-size:22px;padding:18px 0 5px 0;cursor:default;font-weight:bold;">
                     {{title0}}
                     </a>
                     <div class="current-box">
                   {{describe0}}
                     </div>
                     <div class="all-nav-title">
                     <a href="javascript:;" target="_blank" class="moreA" style="color: red;">查看更多&gt;&gt;</a>
                     </div>
                 </li>
                 
             </ul>
         </div>
     </div></div>
</div>`;

let $ele;
let _scrollTop;

tools.register({
    type:"E",
    metaData:{
        html:pageHtmlOne,
        cssDepends:['http://10.20.26.69/blog/wp-content/themes/xcarfe/style.css','http://t.xcar.com.cn/zteditor/assets/css/banner1.component.css'],
        jsDepends:['http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js','http://t.xcar.com.cn/zteditor/assets/js/banner1.component.js','http://t.xcar.com.cn/zteditor/assets/js/banner1-init.js'],
        css:'body{font-family: "Microsoft YaHei";}',
        code:''
    },
    editData:{
        template:pageHtmlTwo,
        configTml:configHTML
    },

    getData:function(ele){
        let data = tools.getValue($(ele));
       
        for(let i = 0;i<data.list.length;i++){
            if(!tools.regHttp(data.list[i].url)) {
                return 'false'
            }
        }
        return data;
    },
    ready(ele){
        setTimeout(()=>{
            let dragObj=new  DragClass();
            dragObj.init();
        },1)
    },
    //右侧配置项结构ready回调
    cReady(ele){
        let tempData=tools.getValue(ele);
        let tempArr=tempData.config.arrList;
        for(let i=0,l=tempArr.length;i<l;i++){
            let promise =new BaseUploader({pick:{id:'#filePicker'+i}}).init();
            promise.then((rs)=>{
                if(rs.status==="success"){
                 
                    tempArr[i]=Object.assign(tempArr[i],{fileUrl:rs.msg,oldSrc:rs.data.oldimgname});
                    tempData.list=tempArr.slice(0);
                }else{
                    alert(rs.msg);
                }
                tools.setValue(ele, Object.assign(
                    {'imgSrc':tempArr[i].fileUrl||""},
                    {
                      
                        isShowConfig:true,
                        refresh:true
                    }
                ));
            }).catch((e)=>{
                tools.setValue(ele, Object.assign(
                    {'imgSrc':tempArr[i].fileUrl||''},
                    {
                        isShowConfig:true,
                        refresh:true
                    }
                ));
            });
        }
        $('[data-config]')[0].scrollTop=typeof _scrollTop !=="undefined" ?_scrollTop:0;


    }
});
export default class TestComponent{
    constructor(opt){
        this.defaults={
            addBtn:'[data-query="button1_ty"]',
            addBtnOne:'[data-query="button10"]',
            DelBannerBtn1:'[data-query="DelBannerBtn1"]',
            configBox:'[data-config]',
            uploaderOptions:{
                pick: "filePicker",//上传按钮
            },
        };
        this.options=Object.assign(true,{},this.defaults,opt)
    }
    init(){
        this.bindEvent();
    }

    bindEvent(){
        let _this=this;
        let options=this.options;
        $(doc).off("keyup.sowing").on("keyup.sowing", "input[data-key-banner1],textarea[data-key-banner1]", function (e) {
           
            let $ele = $(this).closest(_this.options.configBox);
            let type=$(e.target).closest(_this.options.configBox).data("data").type;
            if(type!=='E')return;
            let value=$(this).val();
            if($(this).attr('data-key-banner1')=='title,_title'){
                //  var count=tools.Gblen($(this).val(),40);
                //  value=value.substring(0,count);
                //  $(this).val(value);
                // if($(this).closest('[data-item]').attr('data-item')=='0'){
                  
                    tools.setValue($ele, Object.assign(
                        {'title0': value},
                        {
                            
                            refresh:true
                        }
                    ));
               // }
            }
            if($(this).attr('data-key-banner1')=='describe,_describe'){
                // var count=tools.Gblen($(this).val(),100);
                // value=value.substring(0,count);
                // $(this).val(value);
               // if($(this).closest('[data-item]').attr('data-item')=='0'){
                  
                    tools.setValue($ele, Object.assign(
                        {'describe0': value},
                        {
                            
                            refresh:true
                        }
                    ));
               // }
            }
            let $range=$(this).closest('[data-item]');
            let index=$range.attr('data-item');
            let keys = $(this).attr("data-key-banner1").split(',');
            let tempData=tools.getValue($ele);
            tempData.config.arrList[index]=Object.assign(tempData.config.arrList[index],{
                [keys[0]]: this.value
            });
            tempData.list=tempData.config.arrList.slice(0);
        });
        $(doc).on("change.sowing", "input[data-key-url1]", function (e) {
            tools.regHttp(e.currentTarget.value)
        });
        $(doc).on('click',this.options.addBtn,()=>{
            tools.generate({
                type:"E",
                describe0:'描述',
                title0:'标题',
                imgSrc:'http://pic.xcarimg.com/img/xbb/cover_img/201712/AQTcHVg2Sr1512538770345758151253877034.jpg?imageView/1/w/670/h/335',
                x:tools.getX,
                y:tools.getY,
                componentId:"focus"+GenNonDuplicateID(),
                list:[{
                    fileUrl:'',
                    title:'',
                    describe:'',
                    url:'',
                    oldSrc:''
                }],

                config:{//侧右配置项数据
                    picker:_this.options.uploaderOptions.pick,
                    arrList:[
                        {
                            fileUrl:'',
                            title:'',
                            describe:'',
                            url:'',
                        },
                    ]
                }
            },"append",true);
            // $(options.configBox)[0].scrollTop=10000000;
        });
        function GenNonDuplicateID(randomLength){
            return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
        }
        //绑定增加图片事件
        $(doc).on('click',this.options.addBtnOne,function(evt){
            evt.stopPropagation();
            let $ele =tools.getCurrentComponent();
            let type=$ele.data("data").type;
            if(type!=='E')return;
            let tempData=tools.getValue($ele);

            if(tempData.config.arrList.length <=14){
                tempData.list.push({  fileUrl:'',
                    title:'',
                    describe:'',
                    url:'',
                });
                tempData.config.arrList.push({
                    fileUrl:'',
                    title:'',
                    describe:'',
                    url:'',
                });
                tools.setValue($ele,{
                    isShowConfig:true
                })
            }else{
                alert('创建数量过多')
            }
            _scrollTop=$(options.configBox)[0].scrollHeight-650;
        });
        var self;
       //删除焦点图片
       $(doc).on("click.focusczh1", options.DelBannerBtn1, function (e) {
        //e.stopPropagation();
        self=$(this);
        let $ele = tools.getCurrentComponent();
        let type = $ele.data("data") && $ele.data("data").type;
        if (!type || type !== 'E') return;
        $(".bgDelBox").show();
        $(".ztDelBoxSmall").show(200);
    })

    $(doc).on('click.focusczh1','.ztOperateDelBtnSmall',function(e){
        let $ele = tools.getCurrentComponent();
        let type = $ele.data("data") && $ele.data("data").type;
        if (!type || type !== 'E') return;
        let BannerIndex=self.closest('[data-item]').attr('data-item');
       
        var obj = tools.getValue($ele);
        obj.config.arrList.splice(BannerIndex,1)
        obj.list.splice(BannerIndex,1)
        $('[data-config]').scrollTop=0
        tools.setValue($ele, {
            isShowConfig: true
        })
        $(".bgDelBox").hide();
        $(this).closest(".ztDelBoxSmall").hide(200);
       
       
    })
    $(".ztOperateCancelBtnSmall,.ztCloseBtnSmall").on('click.focusczh1',function(event){
        event.preventDefault();
        event.stopPropagation();
        $(".bgDelBox").hide();
        $(this).closest(".ztDelBoxSmall").hide(200);
        return;
    }) 
        // 位置
        $(doc).off('click.lty').on('click.lty',options.configBox,function(){
            _scrollTop=this.scrollTop
        });
    }
}

