import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import DragClass from '../common/drag.init';
let tools = new Utils();
let doc = document;
let win = window;
let _html = `<div class="title" style="left:{{x}}px; top:{{y}}px;">
                {{if url!=""}}
                <a href="{{url}}" target="_blank">
                    <img src="{{imgSrc}}"/>
                </a>
                {{else}}
                <a href="{{url}}">
                    <img src="{{imgSrc}}"/>
                </a>               
                {{/if}}
            </div>`
let $ele;
    tools.register({
        type:"title",
        metaData:{
            html:_html,
            cssDepends: ['http://t.xcar.com.cn/zteditor/assets/css/title.css'],
            jsDepends:[],
            css:'',
            code:''
        },
        editData:{
            template:`<div class="title dragDiv" data-type="title" style="width:{{width}}px;height:{{height}};left:{{x}}px; top:{{y}}px;">
            <div class="selectDiv" ></div>
       
            <img src="{{imgSrc}}"/></div>`,
            configTml:`<div class="editorbox">
                            <div class="editor_banner editor_common">
                                <h1 class="title_img">标题栏</h1>
                                <h4>组件</h4>
                                <dl class="clearfix">
                                    <dt>
                                        <input value="{{fileName}}" disabled="true"  class="" type="text" placeholder="{{imgSrc}}"  data-name="imgSrc">
                                        <span >X：</span>
                                    </dt>
                                    <dd id={{picker}}>本地上传</dd>
                                </dl>
                                <i>说明：JPG.PNG</i>
                                <div class="padTop15">
                                    <h4>跳转链接</h4>
                                    <input data-title="url,_url" data-key-url9="regURl" type="text" class="url_input" value="{{_url}}">
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
        ready(ele) {
            setTimeout(() => {
                let dragObj = new DragClass();
                dragObj.init();
            }, 1)
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
                    console.log(response)
                    tools.setValue($ele, Object.assign(
                        { 'imgSrc': response.msg ,'fileName': file.name,
                        width:response.data.width>1000?1000:response.data.width,
                        height:response.data.height
                    },
                        {
                            'config': {
                                'imgSrc': response.msg,
                                'fileName': file.name
                            },
                            isShowConfig: true,
                            refresh:true
                        }
                    ));
                }
            });
            console.log(ele, "configReady");
        }
    });
export default class TestComponent{
    constructor(opt){
        this.defaults={
            addBtn:'[data-query="title"]',
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
        $(doc).off('input.title').on("input.title", "input[data-title]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let data = $ele.data('data');
            let type = data && data.type;
            if (!data || type !== 'title') { return }

            let keys = $(this).attr("data-title").split(',');

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
                type:"title",
                imgSrc:"http://t.xcar.com.cn/zteditor/assets/img/titledemo.png",
                url:"",
                x: tools.getX,
                y: tools.getY,
                width:232,
                height:57,
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

