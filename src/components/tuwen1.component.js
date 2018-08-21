import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import DragClass from '../common/drag.init';
let tools=new Utils();
let doc=document;
let win=window;


var tuwen1HTML = `<div class="tuwen-wrapper dragDiv" data-type="TuWen1" style="left:{{x}}px; top:{{y}}px;">
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

var _tuwen1HTML = `<div class="tuwen-wrapper dragDiv" data-type="TuWen1" style="left:{{x}}px; top:{{y}}px;">
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
     <h1 class="tuwen1_img">图文1</h1>
     <h4>图片上传</h4>
     
     <dl class="clearfix">
         <dt>
             <input value="{{_fileName}}"  disabled="true"  class="" type="text" placeholder="{{imgSrc}}"  data-name="imgSrc">
             <span >X：</span>
         </dt>
         
         <dd id={{picker}}>本地上传</dd>
     </dl>
 
     <i>说明：JPG.PNG</i>
     <div class="padTop15">
         <h4>标题</h4>
         <input maxlength="20" data-key="title,_title" value="{{_title}}" type="text" class="url_input" placeholder="">
     </div>
     <div class="padTop15">
         <h4>跳转链接</h4>
         <input data-key="url,_url" data-key-url5="regURl"  value="{{_url}}" type="text" class="url_input" placeholder="">
     </div>
 </div>
</div>`               
let $ele;
tools.register({
        type:"TuWen1",
        metaData:{
            //html:'<div style="left:{{x}}px; top:{{y}}px;"><h1>{{h1}}</h1></div>',
            html:tuwen1HTML,
            cssDepends:['http://t.xcar.com.cn/zteditor/assets/css/tuwen1.css'],            
            jsDepends:[],
            css:'',
            code:''
        },
        editData:{
        // template:`<div data-type="A"><h1>{{h1}}</h1></div>`,
        template:_tuwen1HTML, 
        // configTml:`<div><input type="text" value="{{defaultText}}"></div>`
        configTml:configHTML

        },
        getData:function(ele){
            let data = tools.getValue($(ele))
            console.log(data.url)
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
                
                console.log(ele,333333);
            },1)
        },
        //右侧配置项结构ready回调
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
                console.log(response);
                if(response.status==="success"){
                    
                    tools.setValue($ele, Object.assign(
                        {'imgSrc': response.msg,'fileName': file.name,},
                        {
                            'config': {
                                'imgSrc': response.msg,
                                '_fileName': file.name,
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
            addBtn:'[data-query="tuwen1_btn"]',
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
        let fileId;
       // let $ele;
        $(doc).off("input.tuwen1").on("input.tuwen1", "input[data-key]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let data=$ele.data('data');
            let type = data&&data.type           
            
            if(!data || type!=='TuWen1'){return}
           
            
            let keys = $(this).attr("data-key").split(',');
            console.log('input ele' , $ele)
            tools.setValue($ele, Object.assign(
                {[keys[0]]: this.value},
                {
                    'config': {
                        [keys[keys.length === 1 ? 0 : 1]]: this.value
                    },
                        refresh:true
                    }
            ));
        });
        $(doc).on("change.tuwen1", "input[data-key-url5]", function (e) {
                tools.regHttp(e.currentTarget.value)
        });
        //获取组件数据
        // $(doc).on("click",'[data-type="TuWen1"]',function(){
        //     console.log("组件数据",tools.getValue($(this)))
        // });
        
        $(doc).on('click',this.options.addBtn,()=>{
            console.log('this.title',this.titleText)
            tools.generate({
                type:"TuWen1",
                imgSrc:"http://t.xcar.com.cn/zteditor/assets/img/tuwen.png",
                title:"测试图文标题",
                url:"###",
                x:tools.getX,
                y:tools.getY,
                fileName: '',
                config:{//侧右配置项数据                    
                    imgSrc:"",
                    _title:"",
                    _url:"",
                    picker:_this.options.uploaderOptions.pick,
                    _fileName: ''
                }
            },"append",true);
        });
        
    }
}

