import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import DragClass from '../common/drag.init';
let tools=new Utils();
let doc=document;
let win=window;

let $ele;
tools.register({
    type:"Banner",
    metaData:{
        html:'<div class="banner" style="left:{{x}}px; top:{{y}}px;width:{{width}}px;height:{{height}}px"><a href="{{url}}"><img src="{{imgSrc}}" /></a></div>',
        cssDepends: ['http://t.xcar.com.cn/zteditor/assets/css/banner.css'],
        jsDepends:[],
        css:'',
        code:''
    },
    editData:{
        template:`<div class="banner dragDiv" data-type="Banner" style="width:{{width}}px;height:{{height}}px;left:{{x}}px; top:{{y}}px;"><img src="{{imgSrc}}" />
        <div class="selectDiv" ></div>
        </div>`,
        configTml:`<div class="editorbox">
                        <div class="editor_banner editor_common">
                            <h1 class="banner_img">头图</h1>
                            <h4>组件</h4>
                            <dl class="clearfix">
                                <dt>
                                    <input value="{{fileName}}" disabled="true"  class="" type="text" placeholder="{{imgSrc}}"  data-name="imgSrc">
                                    <span >X：</span>
                                </dt>
                                <dd id={{picker}}>本地上传</dd>
                            </dl>
                            <i>说明：JPG.PNG</i>
                        </div>
                    </div>`
    },
    getData:function(ele){
        return Object.assign({}, tools.getValue($(ele)));
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
                },
                fileSingleSizeLimit: 5.01 * 1024 *1024  // 10 M
            }
            

        }).init();
        uploader.on('uploadSuccess', function (file, response) {
            //fileId = file.id;
            console.log(file)
            if (response.status === "success") {
                console.log(response)
                tools.setValue($ele, Object.assign(
                    { 'imgSrc': response.msg , 'fileName': file.name },
                    {
                        'width':response.data.width>1000?1000:response.data.width,
                        'height':response.data.width>1000?(response.data.height*1000/response.data.width):response.data.height,
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
            addBtn: '[data-query="banner"]',
            configBox: '[data-config]',
            uploaderOptions: {
                pick: "demoFilePicker",//上传按钮
            }
        };
        this.options=Object.assign({},this.defaults,opt)
    }
    init(){
        this.bindEvent();
    }
    bindEvent(){
        let _this = this;
        $(doc).on('click',this.options.addBtn,()=>{
            tools.generate({
                type:"Banner",
                imgSrc:"http://t.xcar.com.cn/zteditor/assets/img/timg.jpeg",
                url:'',
                x: tools.getX,
                y: tools.getY,
                fileName:'',
                config:{
                    fileName:'',
                    imgSrc:'',
                    picker: _this.options.uploaderOptions.pick
                }
            },"append",true);
        })
    }
}

