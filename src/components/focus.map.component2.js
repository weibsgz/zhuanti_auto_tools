import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
let tools=new Utils();
import BaseUploader from 'baseUploader';
let doc=document;
let win=window;
import DragClass from '../common/drag.init';

let configHTML = `
     <div class="editorbox">
                <div class="editor_banner editor_common editorbox-body">
                {{each arrList}}
                <div data-item="{{$index}}">
                    <h1 class="banner_img">图片{{$index + 1}}<span data-query="DelBannerBtn2" style="display:block;cursor:pointer;margin-left:10px;float:right;width:36px;height:16px;line-height:14px;font-size:12px;text-align:center;border: 1px solid #B6BECD;border-radius: 4px;">删除</span></h1>                     
                        <h4>图片上传</h4>
                        <dl class="clearfix">
                            <dt>
                                <input value="{{$value.fileUrl}}" disabled="true"  class="" type="text" placeholder=""  data-name="$value.fileUrl">
                                <span>X：</span>
                            </dt>
                            <dd id={{picker}}{{$index}}>本地上传</dd>
                        </dl>
                        <i>说明：JPG.PNG</i>
                        <div class="padTop15">
                            <h4>标题</h4>
                            <input type="text" data-key-banner2="title,_title"  value="{{$value.title}}"  placeholder="" class="url_input">
                        </div>
                        <!--<div class="padTop15">-->
                            <!--<h4>描述</h4>-->
                            <!--<textarea data-key-banner2="describe,_describe" placeholder="" >{{$value.describe}}</textarea>-->
                        <!--</div>-->
                        <div class="padTop15">
                            <h4>跳转链接</h4>
                            <input type="text"  data-key-url2="regURl" data-key-banner2="url,_url" placeholder="" value="{{$value.url}}" class="url_input">
                        </div>
                        <br>
                        <br>
                        <br>
                        </div>
                     {{/each}}   
                    <div class="padTop20" >
                        <button class="padTop20-btn" data-query="button11">+增加图片</button>
                    </div>
                </div>
            </div>
`;

let pageHtmlOne = `
    <div class="playerdata" style="position: absolute;left:{{x}}px; top:{{y}}px;">
                   <div class="xfocus_05 box-content" id="{{componentId}}">
                        <!-- 左右按钮 -->
                        <a href="javascript:void(0)" class="prev1"><span><em>0</em><i>0</i></span></a>
                        <a href="javascript:void(0)" class="next1"><span><em>0</em><i>0</i></span></a>
                        <!-- 图片列表 -->
                        <div class="view">
                           <ul>
                               {{each list}}
                                  <li><a href="{{$value.url}}" target="_blank"><img src="{{$value.fileUrl}}" alt="" title="{{$value.title}}" width="350" height="388"></a></li>
                               {{/each}}
                           </ul>
                        </div>
                        <!-- 按钮列表 -->
                        <!-- 图注列表 -->
                        <div class="text">
                            <ul>
                                {{each list}}
                                <li class="current">
                                    <a href="{{$value.url}}" target="_blank">
                                        {{$value.title}}
                                    </a>
                                </li>
                                {{/each}}
                            </ul>
                        </div>
                    </div>
           </div>
`;
let pageHtmlTwo = `
     <div class="box-content dragDiv banner2"  style="left:{{x}}px; top:{{y}}px;">
     <span class="bg-left"></span>
     <span class="bg-right"></span>
     <p style="position:absolute;right:0;bottom:0;width:100%;height:77px;font:bold 22px/77px 'microsoft yahei';color:#FFFFFF;text-align:center;background:#000;">{{title0}}</p>
                         <div class="view">
                               <ul>
                                    <li class="current" style="width: 960px;height: 480px;"><img src="{{imgSrc}}" alt="" title="综合性能出众 爱卡高原试驾别克昂科威" width="388" height="100%"></li>
                               </ul>
                         </div>
               </div>
`;

let $ele;
tools.register({
    type:"P",
    metaData:{
        html:pageHtmlOne,
        cssDepends:['http://10.20.26.69/blog/wp-content/themes/xcarfe/style.css','http://t.xcar.com.cn/zteditor/assets/css/banner2.component.css'],
        jsDepends:['http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js','http://t.xcar.com.cn/zteditor/assets/js/banner2.component.js','http://t.xcar.com.cn/zteditor/assets/js/banner2-init.js'],
        css:'',
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
            else {
                return data
            }
        }
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
                    tempArr[i]=Object.assign(tempArr[i],{fileUrl:rs.msg});
                    tempData.list=tempArr.slice(0);
                }else{
                    alert(rs.msg);
                }
             
                tools.setValue(ele, Object.assign(
                    {'imgSrc':tempArr[0].fileUrl||'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532340039743&di=484813c5e0046291e1186e53b9818eaa&imgtype=0&src=http%3A%2F%2Fwww.qctsw.com%2Ftemp%2Fupfiles%2Farticle%2F2014%2F08%2F27%2F14091038761005.png'},
                    {
                        isShowConfig:true,
                        refresh:true
                    }
                ));
            }).catch(()=>{
                tools.setValue(ele, Object.assign(
                    {'imgSrc':tempArr[0].fileUrl||'http://o7pp28l2f.bkt.clouddn.com/topic_diy/2018/day_0725/b7ab404a79505710a56a7ee61cb870d8.jpg'},
                    {
                        isShowConfig:true,
                        refresh:true
                    }
                ));
            });
        }
        $('[data-config] div.editorbox-body')[0].scrollTop=10000000;
    }
});

export default class TestComponent{
    constructor(opt){
        this.defaults={
            addBtn:'[data-query="button2_ty"]',
            addBtnOne:'[data-query="button11"]',
            DelBannerBtn2:'[data-query="DelBannerBtn2"]',
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
        let options=_this.options;
        $(doc).off("keyup.banner2").on("keyup.banner2", "input[data-key-banner2],textarea[data-key-banner2]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let type=$(e.target).closest(_this.options.configBox).data("data").type;
            if(type!=='P')return;
            let value=$(this).val();
            if($(this).attr('data-key-banner2')=='title,_title'){
                var count=tools.Gblen($(this).val(),40);
                value=value.substring(0,count);
                $(this).val(value);
                if($(this).closest('[data-item]').attr('data-item')=='0'){
                  
                    tools.setValue($ele, Object.assign(
                        {'title0': value},
                        {
                            
                            refresh:true
                        }
                    ));
                }

           }
           
            let $range=$(this).closest('[data-item]');
            let index=$range.attr('data-item');
            let keys = $(this).attr("data-key-banner2").split(',');
            let tempData=tools.getValue($ele);
            tempData.config.arrList[index]=Object.assign(tempData.config.arrList[index],{
                [keys[0]]: this.value
            });
            tempData.list=tempData.config.arrList.slice(0);

        });
        function GenNonDuplicateID(randomLength){
            return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
        }
        $(doc).on("change.banner2", "input[data-key-url2]", function (e) {
            tools.regHttp(e.currentTarget.value)
        });
        $(doc).on('click',this.options.addBtn,()=>{
            tools.generate({
                imgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532340039743&di=484813c5e0046291e1186e53b9818eaa&imgtype=0&src=http%3A%2F%2Fwww.qctsw.com%2Ftemp%2Fupfiles%2Farticle%2F2014%2F08%2F27%2F14091038761005.png',
                type:"P",
                title0:'我爱北京天安门，天安门上太阳升',
                list:[
                    {
                        fileUrl:'',
                        title:'',
                        describe:'',
                        url:'',
                    }
                ],
                x:tools.getX,
                y:tools.getY,
                componentId:"focus"+GenNonDuplicateID(),
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
        });
        //绑定增加图片事件
        $(doc).on('click',this.options.addBtnOne,function(){
            let $ele =tools.getCurrentComponent();
            let type=$ele.data("data").type;
            if(type!=='P')return;
            let tempData=tools.getValue($ele);
            if(tempData.config.arrList.length<=4){
                tempData.list.push({  fileUrl:'',
                    title:'',
                    describe:'',
                    url:'',});
                tempData.config.arrList.push({
                    fileUrl:'',
                    title:'',
                    describe:'',
                    url:'',
                });
                tools.setValue($ele,{
                    isShowConfig:true
                })
            }else {
                alert('创建数量过多')
            }
            $(options.configBox)[0].scrollTop=10000000;
        });

var  self;
        //删除焦点图片
        $(doc).on("click.focusczh2", options.DelBannerBtn2, function (e) {
            e.stopPropagation();
            self=$(this);
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'P') return;
            $(".bgDelBox").show();
            $(".ztDelBoxSmall").show(200);
        })
    
        $(doc).on('click.focusczh2','.ztOperateDelBtnSmall',function(e){
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data") && $ele.data("data").type;
            if (!type || type !== 'P') return;
            let BannerIndex=self.closest('[data-item]').attr('data-item');
           
            var obj = tools.getValue($ele);
            obj.config.arrList.splice(BannerIndex,1)
            tools.setValue($ele, {
                isShowConfig: true
            })
            $(".bgDelBox").hide();
            $(this).closest(".ztDelBoxSmall").hide(200);
        })
    $(".ztOperateCancelBtnSmall,.ztCloseBtnSmall").on('click.focusczh2',function(event){
        event.preventDefault();
        event.stopPropagation();
        $(".bgDelBox").hide();
        $(this).closest(".ztDelBoxSmall").hide(200);
        return;
    }) 
    }
}

