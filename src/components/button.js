import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import DragClass from '../common/drag.init';
let tools=new Utils();
let doc=document;
let win=window;


let $ele;

let _html = `<div class="button" style="left:{{x}}px; top:{{y}}px;">
            {{if url!=""}}
                    <a href="{{url}}" target="_blank">
                        <img src="{{imgSrc}}"/>
                    </a>
                {{else}}
                    <a href="javascript:;">
                        <img src="{{imgSrc}}"/>
                    </a>               
            {{/if}}
            </div>`
tools.register({
    type:"btn",
    metaData:{
        html:_html,
        cssDepends: ['http://t.xcar.com.cn/zteditor/assets/css/button.css'],
        jsDepends:[],
        css:'',
        code:''
    },
    editData:{
        template:`<div class="button dragDiv" data-type="btn"  style="width:{{width}}px;height:{{height}}px;left:{{x}}px; top:{{y}}px;"><img src="{{imgSrc}}"/>
        <div class="selectDiv" ></div>
       
        </div>`,
        configTml:`<div class="editorbox">
                        <div class="editor_banner editor_common">
                            <h1 class="button_img">按钮</h1>
                            <h4>组件</h4>
                            <dl class="clearfix">
                                <dt>
                                    <input value="{{fileName}}" disabled="true" class="" type="text" placeholder="{{imgSrc}}"  data-name="imgSrc">
                                    <span >X：</span>
                                </dt>
                                <dd id={{picker}}>本地上传</dd>
                            </dl>
                            <i>说明：JPG.PNG</i>
                            <div class="padTop15">
                                <h4>跳转链接</h4>
                                <input data-key-url4="regURl" data-key="url,_url" type="text" class="url_input" value="{{_url}}">
                            </div>
                        </div>
                    </div>`

    },
    getData:function(ele){
        let data = tools.getValue($(ele))
        if (!tools.regHttp(data.url)) {
            return 'false'
        }
        else {
            return data
        }
    },
    ready(ele){
        setTimeout(()=>{
            let dragObj = new DragClass();
            dragObj.init();
        },1)
    },
    //右侧配置项结构ready回调
    cReady(ele) {
        $ele = ele;
        let uploader = new Uploader({
            uploaderOptions: {
                pick:{
                    id:"#demoFilePicker"
                }
            }
        }).init();
        uploader.on('uploadSuccess', function (file, response) {
            //fileId = file.id;

            if (response.status === "success") {
                tools.setValue($ele, Object.assign(
                    { 'imgSrc': response.msg , 'fileName': file.name,
                    width:response.data.width>1000?1000:response.data.width,
                    height:response.data.height
                
                },
                    {
                        'config': {
                            'imgSrc': response.msg,
                            'fileName': file.name
                        },
                        isShowConfig: true ,
                        refresh:true
                    }
                ));
            }
        });
        console.log(ele, "configReady");
    }
}) 
export default class TestComponent{
    constructor(opt){
        this.defaults={
            addBtn:'[data-query="btn"]',
            configBox: '[data-config]',
            uploaderOptions: {
                pick: "demoFilePicker",//上传按钮
            }
        };
        this.options=Object.assign(true,{},this.defaults,opt)
    }
    init(){
        this.bindEvent();
    }
    bindEvent(){
        let _this = this;
        //监听链接
        
        
        $(doc).off('input.button').on("input.button", "input[data-key]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let data = $ele.data('data');
            let type = data && data.type;
            if (!data || type !=='btn'){return}

            let keys = $(this).attr("data-key").split(',');
            tools.setValue($ele, Object.assign(
                { [keys[0]]: this.value },
                { 'config': { [keys[keys.length === 1 ? 0 : 1]]: this.value } }
            ));

        });

        $(doc).on("change.tuwen1", "input[data-key-url5]", function (e) {
            tools.regHttp(e.currentTarget.value)
        });
        $(doc).on('click',this.options.addBtn,()=>{
            tools.generate({
                type:"btn",
                imgSrc:"http://t.xcar.com.cn/zteditor/assets/img/btn-img.png",
                url:"",
                x: tools.getX,
                y: tools.getY,
                width:127,
                height:38,
                fileName:'',
                config:{//侧右配置项数据
                    fileName:'',
                    imgSrc:'',
                    _url:'',
                    picker: _this.options.uploaderOptions.pick
                }
            },"append",true);
        })
    }
}

