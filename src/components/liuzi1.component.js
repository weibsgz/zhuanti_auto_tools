import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
let tools = new Utils();
import 'jqueryUi';
import {common} from 'storage';
let doc = document;
let win = window;
import DragClass from '../common/drag.init';


let viewHTML = `
   <div class="stay-consultation" data-query="selectBox" style="position: absolute; left:{{x}}px; top:{{y}}px;color: {{fontColor}}">
                <form>
                <div class="bg-color-one" style="background:{{colors}};opacity: {{bgColor}};filter:alpha(opacity={{bgColor*100}});"></div>
                    <div class="stay-img-box1" style="color: {{fontColor}}">
                         预约试驾
                        <img src="http://t.xcar.com.cn/zteditor/assets/img/SIGNUP.jpg" alt="预约试驾">
                    </div>
                    <ul class="stay-consultation-body">
                    {{each consultation}}
                        {{if $value.value==1}}
                            <li style="padding-left:60px">
                                <div class="stay-consultation-chl">姓名</div>
                                <div class="stay-consultation-fil">
                                    <input {{if $value.isCheck}}data-isCheck="1"{{/if}} name="name" class="stay-consultation-input" type="text" maxlength=20  data-placeholder="" value="" style="color: {{fontColor}}">
                                </div>
                            </li>
                        {{/if}}
                        {{if $value.value== 2}}       
                           <li style="padding-left:60px">
                                <div class="stay-consultation-chl">性别</div>
                                <div class="stay-consultation-fil stay-consultation-age">
                                    <input type="radio" checked name="gender" value="1">先生
                                    <input type="radio" name="gender" value="2">女士
                                </div>
                            </li>  
                        {{/if}} 
                        {{if $value.value== 3}} 
                            <li style="padding-left:60px">
                                <div class="stay-consultation-chl">手机号</div>
                                <div class="stay-consultation-fil">
                                    <input name="mobile" {{if $value.isCheck}}data-isCheck="1"{{/if}} class="stay-consultation-input" maxlength="11" onkeyup="this.value=this.value.replace(/[^\\d]/g,'')" type="text"  data—placeholder="" value="" style="color: {{fontColor}}">
                                </div>
                            </li>  
                        {{/if}}
                        {{if $value.value === 45}}
                             <li style="padding-left:61px;width:170px;clear:left">                      
                                <div class="stay-consultation-fil stay-consultation-fil-s" style="width:170px;margin-left:0;">                      
                                    <div class="stay-consultation-chl">省份</div>
                                    <select class="stay-consultation-fil-select" data-ele="sel" data-stype="A" name="province" {{if $value.c4}}data-isCheck="1"{{/if}}>
                                        <option value ="">省份</option>
                                     
                                    </select>
                                </div>
                            </li> 
                            <li style="padding-left:6px;width:170px;">                      
                                <div class="stay-consultation-fil stay-consultation-fil-s" style="width:100%;margin-left:0;">
                                    城市
                                    <select class="stay-consultation-fil-select" data-ele="sel" data-stype="B" name="city" {{if $value.c5}}data-isCheck="1"{{/if}}>
                                        <option value ="">城市</option>                                       
                                    </select>                           
                                </div>
                            </li>
                             
                        {{/if}}
                        {{if $value.value== 4}}    
                        <li style="padding-left:61px;width:170px;clear:left">                      
                            <div class="stay-consultation-fil stay-consultation-fil-s" style="width:170px;margin-left:0;">                      
                                <div class="stay-consultation-chl">省份</div>
                                <select class="stay-consultation-fil-select" data-ele="sel" data-stype="A" name="province" {{if $value.c4}}data-isCheck="1"{{/if}}>
                                    <option value ="">省份</option>
                                   
                                </select>
                            </div>
                        </li> 
                        {{/if}}                    
    
                        {{if $value.value== 5}}    
                        <li style="padding-left:61px;width:170px;clear:left">                      
                            <div class="stay-consultation-fil stay-consultation-fil-s" style="width:170px;margin-left:0;">                      
                                <div class="stay-consultation-chl">城市</div>
                                <select class="stay-consultation-fil-select" data-ele="sel" data-stype="B" name="city" {{if $value.c5}}data-isCheck="1"{{/if}}> 
                                    <option value ="">城市</option>                                    
                                </select>
                            </div>
                        </li> 
                        {{/if}}               
                        {{if $value.value === 67}}
                            <li style="padding-left:61px;width:170px;clear:left">                      
                                <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:170px;margin-left:0;">
                                    <div class="stay-consultation-chl" >车系</div>
                                    <select class="stay-consultation-fil-select">
                                        <option value ="">车系</option>                                         
                                    </select>
                                </div>
                            </li>
                            <li style="padding-left:6px; width:170px;">
                                <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:170px;margin-left:0;">                      
                                    车型
                                    <select data-main={{config.checkA=='checked'?1:0}} class="stay-consultation-fil-select" data-ele="sel" data-stype="D" {{if $value.c7}}data-isCheck="1"{{/if}} name="car_name">
                                        <option value ="">车型</option>                                        
                                    </select>
                                </div>
                            </li>                          
                        {{/if}}
                        {{if $value.value==6}} 
                            <li style="padding-left:61px;width:170px;clear:left">                      
                                <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:170px;margin-left:0;">
                                    <div class="stay-consultation-chl" >车系</div>
                                    <select class="stay-consultation-fil-select">
                                        <option value ="">车系</option>
                                       
                                    </select>
                                 
                                </div>
                            </li>  
                        {{/if}} 
                        {{if $value.value==7}} 
                            <li style="padding-left:61px;width:170px;clear:left">                      
                               
                            <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:170px;margin-left:0;">
                                    <div class="stay-consultation-chl" >车型</div>
                                    <select data-main={{config.checkA=='checked'?1:0}} class="stay-consultation-fil-select" data-ele="sel" data-stype="D" name="car_name" {{if $value.c7}}data-isCheck="1"{{/if}}>
                                        <option value ="">车型</option>                                       
                                    </select>                             
                                </div>
                            </li>  
                        {{/if}} 
                        {{if $value.value== 8}}
                            <li style="padding-left:60px">    
                                <div class="stay-consultation-chl">经销商</div>
                                <div class="stay-consultation-fil stay-consultation-fil-s">
                                    <select data-main={{config.checkB=='checked'?1:0}} class="stay-consultation-fil-select" style="width: 260px;" data-ele="sel" data-stype="C" {{if $value.isCheck}}data-isCheck="1"{{/if}} name="distributor">
                                        <option value ="">经销商</option>                                       
                                    </select>
                                </div>
                            </li>
                        {{/if}}  
                        {{if $value.value==9}}     
                            <li style="padding-left:60px">
                                <div class="stay-consultation-chl">时间</div>
                                <div class="stay-consultation-fil  stay-consultation-fil-s" style="width:275px;">
                                    <select class="stay-consultation-fil-select-on">
                                        <option value ="">年</option>
                                        
                                    </select>
                                    月
                                    <select class="stay-consultation-fil-select-on">
                                        <option value ="">月</option>
                                       
                                    </select>
                                    日
                                    <select class="stay-consultation-fil-select-on">
                                        <option value ="">日</option>
                                        
                                    </select>
                                </div>
                            </li> 
                          {{/if}}    
                        {{/each}}   
                        <li>
                            <div class="stay-consultation-chl"></div>
                            <div class="stay-consultation-fil stay-consultation-age-t">
                                <input type="checkbox" name="if_policies" value="1">
                                我已阅读并接受爱卡汽车隐私条款。您的个人资料有可能会提交至授权经销商或爱卡汽车客服，与您进一步沟通试驾，购车等事宜。
                            </div>
                        </li>
                        <li style="padding-left:60px">
                            <div class="stay-consultation-but" style="color: {{fontColor}}" data-query="submit">确认提交</div>
                        </li>
                    </ul>
                <form>
            </div>
`;

let configHTML = `
   <div class="editorbox">
        <div class="editor_banner editor_common editor_common_syl">
            <h1 class="liuzi1_img">留咨1</h1>
            <div class="stay-sultation">
                <ul data-query="stay-sultation-box-one" id="sortable1">
                {{each listDataconfig as value i}}
                    <li style="clear:both;min-height:20px;">
                        <div style="float:left;min-width:100px">
                            <span class="xlz stay-sultation-icon  stay-sultation-icon-one  {{value.isTrue?'current-liuzi':''}}" data-value="{{value.value}}"></span>
                            <span class="xlz stay-sultation-text stay-sultation-text-one">{{value.userName}}</span>
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
                   <h4>上传Excel&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://t.xcar.com.cn/assets/forexcel/testexcel.xls">下载样例</a></h4>
                   <dl class="clearfix">
                       <dt>
                          <input  disabled="true" value="{{fileName}}" class="" type="text" placeholder=""  >
                          <span>X：</span>
                       </dt>
                       <dd id="{{picker}}" style="position: relative">本地上传</dd>
                  </dl>
                  <i>说明：JPG.PNG</i>
                  <h4>背景颜色</h4>
                  <input type="text" data-key-liuzi1="colors,_colors"  value="{{_colors}}" class="url_input"  placeholder="请输入背景色例如#fff">
                  <i>说明：设计稿页面高度,只填入RGB颜色</i>
                  <h4>背景透明</h4>
                  <input type="text"  data-key-liuzi1="bgColor,_bgColor"  value="{{_bgColor}}" class="url_input"  placeholder="请输入透明度例如0.1-1">
                  <i>说明：只填写小于1的数值</i>
                  <h4>字体颜色</h4>
                  <input type="text"  data-key-liuzi1="fontColor,_fontColor"  value="{{_fontColor}}" class="url_input"  placeholder="请输入颜色例如#fff">
                  <i>说明：只填写小于1的数值</i>
            </div>
        </div>
    </div>
`;

//数组排序从新负值s
function sortDataList() {
    let dataList = [];
    let isTrue = false;
    var isCheck;
    $('.ui-sortable li ').each(function () {
        isTrue =$(this).find('.stay-sultation-icon-one').hasClass('current-liuzi');
        isCheck =$(this).find('.xlzCheck').hasClass('current-liuzi');

        let obj = {
            value: +$(this).find('.stay-sultation-icon-one').attr('data-value'),
            isTrue: isTrue,
            userName: $(this).find('.stay-sultation-text-one').text(),
            isCheck
        };
        dataList.push(obj);
    });
    return dataList
}

tools.register({
    type: "I",
    metaData: {
        html: viewHTML,
        cssDepends: ['http://t.xcar.com.cn/zteditor/assets/css/liuzi1.component.css',],
        jsDepends:['http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js','http://t.xcar.com.cn/zteditor/assets/js/lzSelect.js','http://t.xcar.com.cn/zteditor/assets/js/lzDate.js','http://t.xcar.com.cn/zteditor/assets/js/lzForm.js','http://t.xcar.com.cn/zteditor/assets/js/jquery.placeholder.js'],
        css: '',
        code:''
    },
    editData: {
        template: `<div data-query="selectBox" data-type="I" style="left:{{x}}px; top:{{y}}px;" class="dragDiv"><div class="stay-consultation" style="color: {{fontColor}}">
        <div class="bg-color-one" style="background:{{colors}};opacity: {{bgColor}};filter:alpha(opacity={{bgColor*100}});"></div>
            <div class="stay-img-box1" style="color: {{fontColor}}">
            预约试驾
                <img src="http://t.xcar.com.cn/zteditor/assets/img/SIGNUP.jpg" style="display:inline-block;width:142px;height:23px;margin-top:13px;" alt="预约试驾">
               
                </div>
            <ul class="stay-consultation-body">
            {{each consultation}}
                {{if $value.value==1}}
                    <li style="padding-left:60px">
                        <div class="stay-consultation-chl">姓名</div>
                        <div class="stay-consultation-fil">
                            <input {{if $value.isCheck}}data-isCheck="1"{{/if}} name="name" class="stay-consultation-input" type="text" maxlength=20  data-placeholder="" value="" style="color: {{fontColor}}">
                        </div>
                    </li>
                {{/if}}
                {{if $value.value== 2}}       
                   <li style="padding-left:60px">
                        <div class="stay-consultation-chl">性别</div>
                        <div class="stay-consultation-fil stay-consultation-age">
                            <input type="radio" checked name="gender" {{if $value.isCheck}}data-isCheck="1"{{/if}} value="1"><span>先生</span>
                            <input type="radio" name="gender" {{if $value.isCheck}}data-isCheck="1"{{/if}} value="2"><span>女士</span>
                        </div>
                    </li>  
                {{/if}} 
                {{if $value.value== 3}} 
                    <li style="padding-left:60px">
                        <div class="stay-consultation-chl">手机号</div>
                        <div class="stay-consultation-fil">
                            <input name="mobile" {{if $value.isCheck}}data-isCheck="1"{{/if}} class="stay-consultation-input" maxlength="11" onkeyup="this.value=this.value.replace(/[^\\d]/g,'')" type="text"  data-placeholder="" value="" style="color: {{fontColor}}">
                        </div>
                    </li>  
                {{/if}}
                {{if $value.value === 45}}
                     <li style="padding-left:61px;width:170px;">                      
                        <div class="stay-consultation-fil stay-consultation-fil-s" style="width:170px;margin-left:0;">                      
                            <div class="stay-consultation-chl">省份</div>
                            <select class="stay-consultation-fil-select"  data-ele="sel" data-stype="A"  name="province"  {{if $value[4]}}data-isCheck="1"{{/if}}>
                                <option value ="">省份</option>                               
                            </select>
                        </div>
                    </li> 
                    <li style="padding-left:6px;width:170px;">                      
                        <div class="stay-consultation-fil stay-consultation-fil-s" style="width:100%;margin-left:0;">
                            城市
                            <select class="stay-consultation-fil-select"  data-ele="sel" data-stype="B"  {{if $value[5]}}data-isCheck="1"{{/if}} name="city">
                                <option value ="">城市</option>                                 
                            </select>                           
                        </div>
                    </li>
                     
                {{/if}}
                {{if $value.value== 4}}    
                <li style="padding-left:61px;width:170px;clear:left">                      
                    <div class="stay-consultation-fil stay-consultation-fil-s" style="width:190px;margin-left:0;">                      
                        <div class="stay-consultation-chl">省份</div>
                        <select class="stay-consultation-fil-select"  data-ele="sel" data-stype="A"  {{if $value[4]}}data-isCheck="1"{{/if}} name="province">
                            <option value ="">省份</option>                          
                        </select>
                    </div>
                </li> 
                {{/if}}                    

                {{if $value.value== 5}}    
                <li style="padding-left:61px;width:170px;clear:left">                      
                    <div class="stay-consultation-fil stay-consultation-fil-s" style="width:190px;margin-left:0;">                      
                        <div class="stay-consultation-chl">城市</div>
                        <select class="stay-consultation-fil-select"  data-ele="sel" data-stype="B"  {{if $value[5]}}data-isCheck="1"{{/if}} name="city">
                            <option value ="">城市</option>                            
                        </select>
                    </div>
                </li> 
                {{/if}}               
                {{if $value.value === 67}}
                    <li style="padding-left:61px;width:170px;">                      
                        <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:170px;margin-left:0;">
                            <div class="stay-consultation-chl" >购车预算</div>
                            <select class="stay-consultation-fil-select">
                                <option value ="">购车预算</option>
                               
                            </select>
                        </div>
                    </li>
                    <li style="padding-left:6px; width:170px;" data-main={{config.checkA=='checked'?1:0}}>
                        <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:170px;margin-left:0;">                      
                            车型
                            <select class="stay-consultation-fil-select"  data-ele="sel" data-stype="D"  {{if $value[7]}}data-isCheck="1"{{/if}} name="car_name">
                                <option value ="">车型</option>                                
                            </select>
                        </div>
                    </li>                          
                {{/if}}
                {{if $value.value==6}} 
                    <li style="padding-left:61px;width:170px;clear:left">                      
                        <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:190px;margin-left:0;">
                            <div class="stay-consultation-chl" >购车预算</div>
                            <select class="stay-consultation-fil-select">
                                <option value ="">购车预算</option>                             
                            </select>
                         
                        </div>
                    </li>  
                {{/if}} 
                {{if $value.value==7}} 
                    <li style="padding-left:61px;width:170px;clear:left" data-main={{config.checkA=='checked'?1:0}}>                      
                        <div class="stay-consultation-fil stay-consultation-fil-s"  style="width:190px;margin-left:0;">
                            <div class="stay-consultation-chl" >车型</div>
                            <select class="stay-consultation-fil-select"  data-ele="sel" data-stype="D" name="car_name" {{if $value[7]}}data-isCheck="1"{{/if}}>
                                <option value ="">车型</option>                              
                            </select>                             
                        </div>
                    </li>  
                {{/if}} 
                {{if $value.value== 8}}
                    <li style="padding-left:60px" data-main={{config.checkB=='checked'?1:0}}>    
                        <div class="stay-consultation-chl">经销商</div>
                        <div class="stay-consultation-fil stay-consultation-fil-s">
                            <select class="stay-consultation-fil-select" style="width: 260px;"  data-ele="sel" data-stype="C" {{if $value.isCheck}}data-isCheck="1"{{/if}} name="distributor">
                                <option value ="">经销商</option>
                               
                            </select>
                        </div>
                    </li>
                {{/if}}  
                {{if $value.value==9}}     
                    <li style="padding-left:60px">
                        <div class="stay-consultation-chl">时间</div>
                        <div class="stay-consultation-fil  stay-consultation-fil-s" style="width:275px;">
                            <select class="stay-consultation-fil-select-on"  data-dp="year">
                                <option value ="">请选择年</option>                               
                            </select>
                            月
                            <select class="stay-consultation-fil-select-on">
                                <option value ="">请选择月</option>                              
                            </select>
                            日
                            <select class="stay-consultation-fil-select-on">
                                <option value ="">请选择日</option>                               
                            </select>
                        </div>
                    </li> 
                  {{/if}}    
                {{/each}}   
                <li>
                    <div class="stay-consultation-chl"></div>
                    <div class="stay-consultation-fil stay-consultation-age-t">
                        <input type="checkbox" name="events">
                        我已阅读并接受爱卡汽车隐私条款。您的个人资料有可能会提交至授权经销商或爱卡汽车客服，与您进一步沟通试驾，购车等事宜。
                    </div>
                </li>
                <li style="padding-left:60px">
                    <div class="stay-consultation-but" style="color: {{fontColor}}">确认提交</div>
                </li>
            </ul>
        
    </div></div>`,
        configTml: configHTML
    },
    getData: function (ele) {
        return dataFilter(ele)

    },
    ready(ele) {
        setTimeout(() => {
            let dragObj = new DragClass();
            dragObj.init();
        }, 1);
    },
    cReady(ele) {
        let $ele = ele;
        let tempData = tools.getValue(tools.getCurrentComponent());
        //拖拽时候触发该方法
        $("#sortable1").sortable({
            update: function (event, ui) {
                let dataEl = [];
                tempData.config.listDataconfig = sortDataList();
                sortDataList().map(item =>{
                    if(item.isTrue == true){
                        dataEl.push(item)
                    }
                });
                tempData.consultation = dataEl;
                tools.setValue($ele, Object.assign(
                    {consultation:dataFilter().consultation},
                    {isShowConfig: true,refresh: true}
                ));

            }
        });
        //上传Excel
        let uploader = new Uploader({
            uploaderOptions: {
                pick: {
                    id: "#demoFilePicker"
                }//上传按钮
                ,
                accept: {
                    title: 'file',
                    extensions: 'xls,xlsx',
                    mimeTypes: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation'
                },
                server: "http://t.xcar.com.cn/index.php?/api/readExcel/upload"
            }
        }).init();
        uploader.on('uploadSuccess', function (file, response) {
            let pdata = [];
            for (var key in response.data.pro) {
                let obj = {
                    keyId:key,
                    proName:response.data.pro[key]
                };
                pdata.push(obj)
            }
            if(response.status==="success"){
                common.lzcache = [];
                let domData = {
                    key:'liuzi',
                    value:response.data
                };
                common.cache.push(domData);
                tools.setValue(ele, Object.assign(
                    {
                        'fileName': file.name,
                        'dropMenuData':pdata
                    },
                    {
                        'config': {
                            'fileName': file.name
                        },
                        isShowConfig:true,
                        refresh: true
                    }
                ));
            }
        });
    }
});

function dataFilter(ele){
    let data = tools.getValue(ele?$(ele):tools.getCurrentComponent());
    let tempList =[];
    let tempKey={};
    let tempListSet=[];
    data.consultation.forEach(function(v){
        tempList.push(v.value);
        tempKey[v.value]=v.isCheck;
    });
    let temp = [];
    let is4 = tempList.includes(4);
    let is5 = tempList.includes(5);
    let is6 = tempList.includes(6);
    let is7 = tempList.includes(7);
    let pc = is4 && is5 ? 45 : is4 ? 4 : is5 ? 5 : null;
    let cs = is6 && is7 ? 67 : is6 ? 6 : is7 ? 7 : null;
    for (let v of tempList) {
        temp.push((v < 4 || v > 7) ? v : v < 6 ? pc : cs)
    }
    [...new Set(temp)].forEach((v)=>{
        tempListSet.push({
            value:v,
            isCheck:tempKey[v],
            c4:tempKey[4],
            c5:tempKey[5],
            c6:tempKey[6],
            c7:tempKey[7]
        });
    });
    data.consultation=tempListSet;

    console.log(data);
    return data;
}

export default class TestComponent {
    constructor(opt) {
        this.defaults = {
            addBtn: '[data-query="button8-ty"]',
            addBtnOne: '[data-query="stay-sultation-box-one"]',
            configBox: '[data-config]',
            uploaderOptions: {
                pick: "demoFilePicker",//上传按钮
            },
        };
        this.options = Object.assign(true, {}, this.defaults, opt)
    }
    init() {
        this.bindEvent();
    }
    bindEvent() {
        let _this = this;
        $(doc).on('click', this.options.addBtn, () => {
            tools.generate({
                type: "I",
                div: "我是留咨1",
                x: tools.getX,
                y: tools.getY,
                consultation: [],
                colors: '#fff',//背景色
                bgColor: '1',//背景透明色
                fontColor: '#000',//字体颜色
                web: 50,
                config: {//侧右配置项数据
                    picker: _this.options.uploaderOptions.pick,
                    imgSrc: '',
                    checkA:'checked',
                    checkB:'',
                    stayConsultation: [],
                    listDataconfig: [
                        {
                            value: 1,
                            isTrue: false,
                            userName: '姓名',
                        },
                        {
                            value: 2,
                            isTrue: false,
                            userName: '性别',
                        },
                        {
                            value: 3,
                            isTrue: false,
                            userName: '手机号',
                        },
                        {
                            value: 4,
                            isTrue: false,
                            userName: '所在省',
                        },
                        {
                            value: 5,
                            isTrue: false,
                            userName: '所在市',
                        },
                        {
                            value: 6,
                            isTrue: false,
                            userName: '购车预算',
                        },
                        {
                            value: 7,
                            isTrue: false,
                            userName: '意向车型',
                            main:0
                        },
                        {
                            value: 8,
                            isTrue: false,
                            userName: '经销商',
                            mainB:0
                        },
                        {
                            value: 9,
                            isTrue: false,
                            userName: '购车时间',
                        },
                    ],
                    _colors: '#fff',//背景颜色
                    _bgColor: '1',//背景透明色
                    _fontColor: '#000',//字体颜色
                }
            }, "append", true);
        });
        //点击留咨询
        $(doc).on('click', `${this.options.addBtnOne} span.xlz`, function (e) {
            let $ele = tools.getCurrentComponent();
            let type = $ele.data("data").type;
            if (type !== 'I') return;
            let tempData = tools.getValue($ele);
            let temp = [];
            $(this).closest('li').find('.stay-sultation-icon-one').toggleClass('current-liuzi');
            $(_this.options.addBtnOne).find('.stay-sultation-icon-one').each(function (index, item) {
                if ($(item).hasClass("current-liuzi")) {
                    tempData.config.listDataconfig[index].isTrue = true;
                    temp.push(tempData.config.listDataconfig[index]);

                }
                else {
                    temp[index] = "";
                    tempData.config.listDataconfig[index].isTrue = false;
                }
            });

            let tempList =[];
            let tempKey={};
            let tempListSet=[];
            temp.forEach(function(v){
                tempList.push(v.value);
                tempKey[v.value]=v.isCheck;
            });
            let tempListT=[];
            let is4 = tempList.includes(4);
            let is5 = tempList.includes(5);
            let is6 = tempList.includes(6);
            let is7 = tempList.includes(7);
            let pc = is4 && is5 ? 45 : is4 ? 4 : is5 ? 5 : null;
            let cs = is6 && is7 ? 67 : is6 ? 6 : is7 ? 7 : null;
            for (let v of tempList) {
                tempListT.push((v < 4 || v > 7) ? v : v < 6 ? pc : cs)
            }
            [...new Set(tempListT)].forEach((v)=>{
                tempListSet.push({
                    value:v,
                    isCheck:tempKey[v],
                    c4:tempKey[4],
                    c5:tempKey[5],
                    c6:tempKey[6],
                    c7:tempKey[7]
                });
            });
            tempData.consultation=tempListSet;

            tools.setValue($ele, Object.assign(
                
                {isShowConfig: true,refresh: true}
            ));
        });

        //是不是必填项
        $(doc).on('click',`${this.options.addBtnOne} span.xlzCheck`,function(e){
            let $ele = tools.getCurrentComponent();
            let type=$ele.data("data").type;
            if(type!=='I')return;
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
            if (type !== 'I') return;
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
        $(doc).off("input.sowingOne").on("input.sowingOne", "input[data-key-liuzi1]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let type = $(e.target).closest(_this.options.configBox).data("data").type;
            if (type !== 'I') return;
            let keys = $(this).attr("data-key-liuzi1").split(',');
            tools.setValue($ele, Object.assign(
                { [keys[0]]: this.value },
                {refresh: true},
                {
                    'config': {
                        [keys[keys.length === 1 ? 0 : 1]]: this.value
                    }
                }
            ));
        });
    }
}

