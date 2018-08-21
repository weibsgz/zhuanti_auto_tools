import Utils from 'utils';
import * as $ from 'jquery';
let tools=new Utils();
let doc=document;
let win=window;


var tuwen1HTML = `<div class="tuwen-wrapper" data-type="TuWen1" style="left:{{x}}px; top:{{y}}px;">
                    <div class="img">
                        <a href="{{url}}"><img src="{{imgSrc}}" alt=""></a>
                    </div>
                    <div class="title">
                        {{title}}
                    </div>	
                </div>` 


 let configHTML = `<div class="editorbox">
 <div class="editor_banner editor_common">
     <h1 class="banner_img">图文1</h1>
     <h4>图片上传</h4>
     <dl class="clearfix">
         <dt>
             <input class="" type="text" placeholder=""  data-name="imgSrc">
             <span>X：</span>
         </dt>
         <dd>本地上传</dd>
     </dl>
     <i>说明：JPG.PNG</i>
     <div class="padTop15">
         <h4>标题</h4>
         <input data-key="title,_title" value="{{_title}}" type="text" class="url_input" placeholder="13个字符之内">
     </div>
     <div class="padTop15">
         <h4>跳转链接</h4>
         <input data-key="url,_url"  value="{{_url}}" type="text" class="url_input" placeholder="">
     </div>
 </div>
</div>`               


tools.register({
    type:"TuWen1",
    metaData:{
        //html:'<div style="left:{{x}}px; top:{{y}}px;"><h1>{{h1}}</h1></div>',
        html:tuwen1HTML,
        cssDepends:['http://localhost:3031/assets/css/tuwen1.css'],
        jsDepends:[],
        css:'',
        code:''
    },
    editData:{
       // template:`<div data-type="A"><h1>{{h1}}</h1></div>`,
       template:tuwen1HTML, 
      // configTml:`<div><input type="text" value="{{defaultText}}"></div>`
       configTml:configHTML

    },
    getData:function(ele){
        console.log("data",$(ele).data('data'));
        console.log("getValue",tools.getValue($(ele)));
       return Object.assign({},tools.getValue($(ele)),{x:123,y:333});
    },
    ready(ele){
        setTimeout(()=>{
            console.log(ele,333333);
        },1)
    }
});
export default class TestComponent{
    constructor(opt){
        this.defaults={
            addBtn:'[data-query="tuwen1_btn"]',
            configBox:'[data-config]'
        };
        this.options=Object.assign(true,{},this.defaults,opt)
        
    }
    init(){
        this.bindEvent();
    }
    bindEvent(){   
        let _this=this;      

        $(doc).off("input.tuwen1").on("input.tuwen1", "input[data-key]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let keys = $(this).attr("data-key").split(',');

            tools.setValue($ele, Object.assign(
                {[keys[0]]: this.value},
                {
                    'config': {
                        [keys[keys.length === 1 ? 0 : 1]]: this.value}
                    }
            ));

        });


        //获取组件数据
        // $(doc).on("click",'[data-type="TuWen1"]',function(){
        //     console.log("组件数据",tools.getValue($(this)))
        // });
        
        $(doc).on('click',this.options.addBtn,()=>{
            console.log('this.title',this.titleText)
            tools.generate({
                type:"TuWen1",
                imgSrc:"/assets/img/tuwen.png",
                title:"测试图文标题",
                url:"http://www.baidu.com",
                x:tools.getX,
                y:tools.getY,
                config:{//侧右配置项数据                    
                    //imgSrc:"",
                    _title:"tttt",
                    _url:"uuuu"
                }
            },"append",true);
        })
    }
}

