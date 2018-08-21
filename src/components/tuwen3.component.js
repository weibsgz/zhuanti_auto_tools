import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import DragClass from '../common/drag.init';
let tools=new Utils();
let doc=document;
let win=window;


var tuwen1HTML = `<div class="tuwen-wrapper34 dragDiv" data-type="TuWen3" style="left:{{x}}px; top:{{y}}px;">
                    <div class="img">
                        {{if url!="###"}}
                            <a target="_blank" href="{{url}}"><img src="{{imgSrc}}" alt=""></a>
                            {{else}}
                            <a href="javascript:;"><img src="{{imgSrc}}" alt=""></a>           
                        {{/if}}
                    </div>
                    <div class="title">
                        {{title}}
                    </div>	
                </div>`

var _tuwen1HTML = `<div class="tuwen-wrapper34 dragDiv" data-type="TuWen3" style="left:{{x}}px; top:{{y}}px;">
<div class="selectDiv" ></div>
                
<div class="img">
                <a><img src="{{imgSrc}}" alt=""></a>
                </div>
                <div class="title">
                    {{title}}
                </div>	
            </div>`


let configHTML = `<div class="editorbox">
                <div class="editor_banner editor_common">
                    <h1 class="tuwen3_img">图文3</h1>
                    <h4>图片上传</h4>
                    <dl class="clearfix">
                        <dt>
                            <input value="{{fileName}}"  disabled="true" class="" type="text" placeholder=""  data-name="imgSrc">
                            <span>X：</span>
                        </dt>
                        <dd id={{picker}}>本地上传</dd>
                    </dl>
                    <i>说明：JPG.PNG</i>
                    <div class="padTop15">
                        <h4>标题</h4>
                        <input maxlength="13" data-key="title,_title" value="{{_title}}" type="text" class="url_input" placeholder="">
                    </div>
                    <div class="padTop15">
                        <h4>跳转链接</h4>
                        <input data-key="url,_url"  data-key-url7="regURl" value="{{_url}}" type="text" class="url_input" placeholder="">
                    </div>
                </div>
               </div>` 
let $ele;

    tools.register({
        type:"TuWen3",
        metaData:{
            //html:'<div style="left:{{x}}px; top:{{y}}px;"><h1>{{h1}}</h1></div>',
            html:tuwen1HTML,
            cssDepends:['http://t.xcar.com.cn/zteditor/assets/css/tuwen34.css'],
            jsDepends:[],
            css:'',
            code:''
        },
        editData:{
        // template:`<div data-type="A"><h1>{{h1}}</h1></div>`,
        template:_tuwen1HTML, 
        configTml:configHTML
        

        },
        getData:function(ele){            
            let data = tools.getValue($(ele))
            if(!tools.regHttp(data.url)) {
                return 'false'
            }
            else {
                return data
            }
        },
        ready(ele){
            setTimeout(()=>{
                let dragObj=new  DragClass();
                dragObj.init();
           
            },1)
        },
        cReady(ele){
            $ele=ele;
            let uploader=new Uploader({
                uploaderOptions:{
                    pick:{
                        id:"#demoFilePicker"
                    }//上传按钮
                }
            }).init();
            uploader.on( 'uploadSuccess', function( file,response ) {               
                
                if(response.status==="success"){
                    console.log(response)
                    tools.setValue($ele, Object.assign(
                        {'imgSrc': response.msg , 'fileName' : file.name},
                        {
                            'config': {
                                'imgSrc': response.msg,
                                'fileName' : file.name
                            },
                            isShowConfig:true,
                            refresh:true
                        }
                    ));
                }
            });
            console.log(ele,"configReady");
        }
    });

export default class TestComponent{
    constructor(opt){
        this.defaults={
            addBtn:'[data-query="tuwen3_btn"]',
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
        let _this=this;
        $(doc).off("input.tuwen3").on("input.tuwen3", "input[data-key]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let data=$ele.data('data');
            let type = data&&data.type           
            
            if(!data || type!=='TuWen3'){return}
            let keys = $(this).attr("data-key").split(',');

            tools.setValue($ele, Object.assign(
                {[keys[0]]: this.value},
                {
                    'config': {
                        [keys[keys.length === 1 ? 0 : 1]]: this.value},
                        refresh:true
                    }
            ));

        });
        $(doc).on('click',this.options.addBtn,()=>{
            console.log('this.title',this.titleText)
            tools.generate({
                type:"TuWen3",
                imgSrc:"http://t.xcar.com.cn/zteditor/assets/img/tuwen.png",
                title:"测试图文标题",
                url:"###",
                desc:"标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容标题内容",
                x:tools.getX,
                y:tools.getY,
                fileName:'',
                config:{//侧右配置项数据
                    fileName:'',
                    imgSrc:'',
                    _title:"",
                    _url:"",
                    picker:_this.options.uploaderOptions.pick,
                }
            },"append",true);
        })
        $(doc).on("change.tuwen3", "input[data-key-url7]", function (e) {
            tools.regHttp(e.currentTarget.value)
        });
        
    }
}

