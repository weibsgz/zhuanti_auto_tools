import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import BaseUploader from 'baseUploader';
let tools=new Utils();
let doc=document;
let win=window;
import {common} from 'storage';
import DragClass from '../common/drag.init';
import 'jqueryUi';

let viewHTML = `

            <div data-type="Y" data-id="{{id}}" data-query="selectBox" class="stay2-consultation dragDiv" style="position: absolute; left:{{x}}px; top:{{y}}px;color: {{fontColor}};border:1px solid {{fontColor}}">
                <div class="selectDiv" ></div>
                <form>
                <div class="bg-color-two" style="background:{{colors}};opacity: {{bgColor}};filter:alpha(opacity={{bgColor*100}});"></div>   
                <ul class="stay2-consultation-ul" style="color: {{fontColor}}">
                    <li><input style="color: {{fontColor}};"  data-isCheck="1" name="name" class="stay2-consultation-ul-input" maxlength="20" type="text" data-placeholder="请输入姓名" value="请输入姓名" style="color: {{fontColor}}"></li>
                    <li><input style="color: {{fontColor}};" name="mobile" onkeyup="this.value=this.value.replace(/[^\\d]/g,'')"  class="stay2-consultation-ul-input" maxlength="11" type="text" data-placeholder="请输入手机号" value="请输入手机号" data-isCheck="1"></li>
                   {{each consultation}}
                         {{if $value.value == 2 && $value.isTrue}}   
                            <li>
                                <select data-color="{{fontColor}}" style="color: {{fontColor}};" class="stay2-consultation-ul-sel" name="gender" {{if $value.isCheck}}data-isCheck="1"{{/if}}>
                                    <option value ="" style="color: {{fontColor}};">请选择性别</option>
                                    <option value ="1" style="color: {{fontColor}};">男</option>
                                    <option value ="2" style="color: {{fontColor}};">女</option>
                                </select>
                            </li>
                         {{/if}}
                         {{if $value.value == 3  && $value.isTrue}}
                           
                         {{/if}} 
                         {{if $value.value == 4 && $value.isTrue}}  
                        <li>
                              <select data-color="{{fontColor}}" name="province" data-stype="A" data-ele="sel" style="color: {{fontColor}};" class="stay2-consultation-ul-sel select-pro" {{if $value.isCheck}}data-isCheck="1"{{/if}}>
                                 <option  data-select="selects" value =""style="color: {{fontColor}};">请选择省</option>
                              </select>
                        </li> 

                         {{/if}} 
                         {{if $value.value == 5 && $value.isTrue}}       
                            <li>
                                <select data-color="{{fontColor}}"  name="city" data-ele="sel" data-stype="B" style="color: {{fontColor}};"  class="stay2-consultation-ul-sel select-ct" {{if $value.isCheck}}data-isCheck="1"{{/if}}>
                                    <option  value ="" style="color: {{fontColor}};">请选择市</option>
                                </select>
                            </li> 
                         {{/if}} 
                         {{if $value.value == 6 && $value.isTrue}}      
                            <li>
                                <select data-color="{{fontColor}}" name="car_budget" style="color: {{fontColor}};" class="stay2-consultation-ul-sel select-obym" {{if $value.isCheck}}data-isCheck="1"{{/if}}  data-query="budget">
                                    <option  value ="" style="color: {{fontColor}};">请选择购车预算</option>
                                </select>
                            </li> 
                         {{/if}} 
                         {{if $value.value == 7 && $value.isTrue}}         
                            <li>
                                <select data-color="{{fontColor}}" name="car_name" data-ele="sel" data-stype="D" data-main={{config.checkA=='checked'?1:0}} style="color: {{fontColor}};"  class="stay2-consultation-ul-sel select-m" {{if $value.isCheck}}data-isCheck="1"{{/if}}>
                                    <option  value ="" style="color: {{fontColor}};">请选择经意向车型</option>
                                </select>
                            </li> 
                         {{/if}}  
                         {{if $value.value == 8 && $value.isTrue}}     
                            <li>
                                <select data-color="{{fontColor}}" name="distributor" data-stype="C" data-ele="sel" data-main={{config.checkB=='checked'?1:0}} style="color: {{fontColor}};"  class="stay2-consultation-ul-sel select-jxs"  data-key-liuzi5="fontColor" {{if $value.isCheck}}data-isCheck="1"{{/if}}>
                                    <option style="color: {{fontColor}}" value ="">请选择经销商</option>
                                </select>
                            </li> 
                         {{/if}}
                         {{if $value.value == 9 && $value.isTrue}} 
                            <li {{if $value.isCheck}}data-isCheck="1"{{/if}} data-name="time">
                                 <select data-color="{{fontColor}}" style="color: {{fontColor}};"  class="stay2-consultation-ul-elp" data-dp="year">
                                    <option  value ="" style="color: {{fontColor}};">请选择年</option>
                                 </select>
                                <select data-color="{{fontColor}}" style="color: {{fontColor}};"  class="stay2-consultation-ul-elp" data-dp="month">
                                    <option  value ="" style="color: {{fontColor}};">请选择月</option>
                                </select>
                                <select data-color="{{fontColor}}"  style="color: {{fontColor}};"  class="stay2-consultation-ul-elp" style="margin-left: 2px;" data-dp="day">
                                    <option   value ="" style="color: {{fontColor}};">请选择日</option>
                                </select>
                            </li>
                         {{/if}}   
                     {{/each}}
                </ul>
                <div class="stay2-consultation-pad" style="padding-top:10px;color: {{fontColor}}">
                    <input type="checkbox" name="if_policies" checked value="1" data-isCheck="1">
                    我已阅读并接受爱卡汽车隐私条款。您的个人资料有可能会提交至授权经销商或爱卡汽车客服，与您进一步沟通试驾，购车等事宜。
                </div>
                <button class="stay2-consultation-btn" style="display:block;color: {{fontColor}};background:transparent" data-query="submit">
                    立即提交
                </button>
                </form>
            </div> 
            
`;


let configHTML = `
    <div class="editorbox">
        <div class="editor_banner editor_common editor_common_syl">
            <h1 class="liuzi2_img">留咨2</h1>
            <div class="stay-sultation">
                <ul data-query="stay-sultation-box-two" id="sortable2">
                    {{each listDataconfig as value i}}
                        <li style="clear:both;min-height:20px;">
                            <div style="float:left;min-width:100px">
                                <span class="xlz stay-sultation-icon stay-sultation-icon-two {{value.isTrue?'current-liuzi':''}}" data-value="{{value.value}}"></span>
                                <span class="xlz stay-sultation-text stay-sultation-text-two">{{value.userName}}</span>
                                 {{if value.userName=='意向车型'}}
                                <input type="radio" class="carTyperadio" {{checkA}}  style="box-sizing:content-box;-webkit-appearance: radio;position: relative;top: 3px;"/>
                                {{/if}}
                                {{if value.userName=='经销商'}}
                                <input type="radio" class="Bradio" {{checkB}}  style="box-sizing:content-box;-webkit-appearance: radio;position: relative;top: 3px;"/>
                                {{/if}}
                            </div>
                            <div style="float:left;">
                                <span class="xlzCheck xlzCheck1 stay-sultation-icon {{if value.isCheck}}current-liuzi{{/if}}"></span>
                                <span class="xlzCheck stay-sultation-text">必填</span>
                            </div> 
                           
                        </li>
                     

                    {{/each}}
                </ul>
            </div>
            <div class="padTop15 clearfix bgInput">
                   <h4>excel上传&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://t.xcar.com.cn/assets/forexcel/testexcel.xls">下载样例</a></h4>
                   <dl class="clearfix">
                       <dt>
                          <input  disabled="true" class="" value="{{fileName}}" type="text" placeholder=""  >
                          <span>X：</span>
                       </dt>
                       <dd id="{{picker}}" style="position: relative">本地上传</dd>
                  </dl>
                  <i>说明：JPG.PNG</i>
                  <h4>背景颜色</h4>
                  <input type="text" data-key-liuzi2="colors,_colors"  value="{{_colors}}" class="url_input"  placeholder="请输入背景色例如#fff">
                  <i>说明：设计稿页面高度,只填入RGB颜色</i>
                   <h4>背景透明</h4>
                  <input type="text"  data-key-liuzi2="bgColor,_bgColor"  value="{{_bgColor}}" class="url_input"  placeholder="请输入透明度0.1-1">
                  <i>说明：填写0.1 到 1之间的数值</i>
                  <h4>字体颜色</h4>
                  <input type="text"  data-key-liuzi2="fontColor,_fontColor"  value="{{_fontColor}}" class="url_input"  placeholder="请输入颜色例如#fff">
                  <i>说明：只填入RGB颜色</i>
            </div>
        </div>
    </div>
`;
//数组排序从新负值
function sortDataList(){
    var dataList = [];
    var isTrues = false;
    var isCheck;
    $('.ui-sortable li ').each(function(){
        isTrues =$(this).find('.stay-sultation-icon-two').hasClass('current-liuzi');
        isCheck =$(this).find('.xlzCheck').hasClass('current-liuzi');

        let obj = {
            value:$(this).find('.stay-sultation-icon-two').attr('data-value'),
            isTrue:isTrues,
            userName:$(this).find('.stay-sultation-text-two').text(),
            isCheck
        };
        dataList.push(obj);
    });
    return dataList
}
tools.register({
    type:"Y",
    metaData:{
        html:viewHTML,
        cssDepends:['http://t.xcar.com.cn/zteditor/assets/css/liuzi2.component.css'],
        jsDepends:['http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js','http://t.xcar.com.cn/zteditor/assets/js/lzSelect.js','http://t.xcar.com.cn/zteditor/assets/js/lzDate.js','http://t.xcar.com.cn/zteditor/assets/js/lzForm.js','http://t.xcar.com.cn/zteditor/assets/js/jquery.placeholder.js'],
        css:'',
        code:''
    },
    editData:{
        // template:`<div data-type="Y" style="left:{{x}}px; top:{{y}}px;" class="dragDiv"><div class="liuzi1"  style="width:965px;height: 337px;text-align: center;"><img src="http://t.xcar.com.cn/zteditor/assets/img/liuzi2.png" alt=""></div></div>`,
        template:viewHTML,
        configTml:configHTML
    },
    getData:function(ele){
        console.log(tools.getValue($(ele)));
        return tools.getValue($(ele));
    },
    ready(ele){
        //调试临时关闭
        setTimeout(()=>{
            let dragObj = new DragClass();
            dragObj.init();
        },1)
    },
    cReady(ele){
        let $ele = ele;
        //拖拽时候触发该方法
        $( "#sortable2" ).sortable({ update: function(event, ui) {
            let tempData = tools.getValue(ele);
            let dataEl = [];
            tempData.config.listDataconfig = sortDataList();
            sortDataList().map(item =>{
                if(item.isTrue == true){
                    dataEl.push(item)
                }
            });
            tempData.consultation = dataEl;
            tools.setValue($ele, Object.assign(
                { 'consultation': dataEl },
                {isShowConfig: true,refresh: true}
            ));
        }});
        //上传Excel
        let uploader = new Uploader({
            uploaderOptions:{
                pick:{
                    id:"#demoFilePicker"
                },
                accept: {
                    title: 'file',
                    extensions: 'xls,xlsx',
                    mimeTypes: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation'
                },
                server: "http://t.xcar.com.cn/index.php?/api/readExcel/upload",
                formData:{topic_path:tools.getQueryString('folder')}
            }
        }).init();
        uploader.on( 'uploadSuccess', function( file,response ) {
            if(response.status==="success"){
                tools.setValue(ele,{
                    dropMenuData:null
                });
                tools.setValue(ele, Object.assign(
                    {
                        'fileName': file.name,
                        'dropMenuData':response.data
                    },
                    {
                        'config': {
                            'fileName': file.name
                        },
                        //isShowConfig:true,
                        refresh: true
                    }
                ));
            }else{
                alert("上传失败!")
            }
        });
        uploader.on('uploadComplete',function(){
            tools.setValue($ele, Object.assign(
                {isShowConfig: true}
            ));
        });
    }
});
export default class TestComponent{
    constructor(opt){
        this.defaults={
            addBtn:'[data-query="button9-ty"]',
            addBtnOne:'[data-query="stay-sultation-box-two"]',
            configBox:'[data-config]',
            uploaderOptions:{
                pick: "demoFilePicker",//上传按钮
            },
        };
        this.options=Object.assign(true,{},this.defaults,opt)
    }
    init(){
        this.bindEvent();
    }
    bindEvent(){
        let _this = this;
        $(doc).on('click',this.options.addBtn,()=>{
            tools.generate({
                id:`id${+(new Date())}`,
                type:"Y",
                div:"我是留咨2",
                x:tools.getX,
                y:tools.getY,
                colors:'#fff',//背景色
                bgColor:'1',//背景透明色
                fontColor:'#000',//字体颜色
                consultation:[],//后台需要的数组
                dropMenuData:'',//省市数据
                config:{//侧右配置项数据
                    picker:_this.options.uploaderOptions.pick,
                    checkA:'checked',
                    checkB:'',
                    stayConsultation:[
                    ],
                    listDataconfig:[
                        /*{
                            value:1,
                            isTrue:false,
                            userName:'姓名',
                        },*/
                        {
                            value:2,
                            isTrue:false,
                            userName:'性别',
                        },
                      /*  {
                            value:3,
                            isTrue:false,
                            userName:'手机号',
                        },*/
                        {
                            value:4,
                            isTrue:false,
                            userName:'所在省',
                        },
                        {
                            value:5,
                            isTrue:false,
                            userName:'所在市',
                        },
                        {
                            value:6,
                            isTrue:false,
                            userName:'购车预算',
                        },
                        {
                            value:7,
                            isTrue:false,
                            userName:'意向车型',
                        },
                        {
                            value:8,
                            isTrue:false,
                            userName:'经销商',
                        },
                        {
                            value:9,
                            isTrue:false,
                            userName:'购车时间',
                        },
                    ],
                    imgSrc:'',
                    _colors:'',//背景颜色
                    _bgColor:'',//背景透明色
                    _fontColor:'',//字体颜色
                    fileName:'',//上传名称
                }
            },"append",true);
        });
        //点击留咨询
        $(doc).on('click',`${this.options.addBtnOne} span.xlz`,function(e){
            let $ele = tools.getCurrentComponent();
            let type=$ele.data("data").type;
            if(type!=='Y')return;
            let tempData=tools.getValue($ele);
            let temp=[];
            $(this).closest('li').find('.stay-sultation-icon-two').toggleClass('current-liuzi');
            $(_this.options.addBtnOne).find('.stay-sultation-icon-two').each(function(index,item){
                if($(item).hasClass("current-liuzi")){
                    tempData.config.listDataconfig[index].isTrue = true;
                    tempData.config.listDataconfig = sortDataList();
                    let v=tempData.config.listDataconfig[index];
                    v&&temp.push(v);
                }
                else{
                    temp[index]="";
                    tempData.config.listDataconfig[index].isTrue = false;
                }
            });
            //tempData.consultation =tempData.config.listDataconfig.slice(0)|| temp;
            tools.setValue($ele, Object.assign(
                { 'consultation': temp },
                {isShowConfig: true,refresh: true}
            ));
        });
        //是不是必填项
        $(doc).on('click',`${this.options.addBtnOne} span.xlzCheck`,function(e){
            let $ele = tools.getCurrentComponent();
            let type=$ele.data("data").type;
            if(type!=='Y')return;
            let tempData=tools.getValue($ele);
            $(this).toggleClass('current-liuzi');
            $(_this.options.addBtnOne).find('.xlzCheck1').each(function(index,item){
                if($(item).hasClass("current-liuzi")){
                    tempData.config.listDataconfig[index].isCheck = true;
                }
                else{
                    tempData.config.listDataconfig[index].isCheck = false;
                }
            });
            tempData.consultation=tempData.config.listDataconfig.slice(0);
            tools.setValue($ele, Object.assign(
                {   consultation:tempData.config.listDataconfig.slice(0),
                    isShowConfig:true

                }
            ));
        });

        $(doc).on('change', `${this.options.addBtnOne} input[type="radio"]`, function (e) {
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data").type;
            if (type !== 'Y') return;
            let tempData = tools.getValue($ele);
            if($(this).hasClass('carTyperadio')){

                tempData.config.checkA='checked';
                tempData.config.checkB='';
            }
            else{

                tempData.config.checkB='checked';
                tempData.config.checkA='';
            }

            tools.setValue($ele, Object.assign(

                {isShowConfig: true,refresh: true}
            ));
        })
        //获取input值
        $(doc).off("input.sowingTwo").on("input.sowingTwo", "input[data-key-liuzi2]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let type = $(e.target).closest(_this.options.configBox).data("data").type;
            if(type!=='Y')return;
            let keys = $(this).attr("data-key-liuzi2").split(',');
            tools.setValue($ele, Object.assign(
                {[keys[0]]: this.value},
                {
                    'config': {
                        [keys[keys.length === 1 ? 0 : 1]]: this.value
                    },
                    refresh: true
                }
            ));
        });

    }
}

