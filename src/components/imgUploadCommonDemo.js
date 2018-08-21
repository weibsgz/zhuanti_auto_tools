/**
 * Created by zhoulongfei on 2018/7/3.
 * E-mail:36995800@163.com
 */

import * as $ from 'jquery';
import Utils from 'utils';
import BaseUploader from 'baseUploader';

let tools=new Utils();
let doc=document;
let promise;
tools.register({
    type:"ImgUploadCommonDemo",
    metaData:{
        html:'<div style="left:{{x}}px; top:{{y}}px;"><h1>{{h1}}</h1></div>',
        cssDepends:['http://localhost:3030/assets/css/tuwen1.css'],
        jsDepends:[],
        css:'color:red',
        code:'alert(1)'
    },
    editData:{
        template:`<div><h1>{{h1}}</h1>input</div>`,
        configTml:`<div>
            <div><button  id="{{picker}}">选择图片呢</button></div>        
        </div>`
    },
    getData:function(ele){
        console.log("data",$(ele).data('data'));
        console.log("getValue",tools.getValue($(ele)));
        return Object.assign({},tools.getValue($(ele)),{x:123,y:333});
    },
    ready(ele){

    },
    //右侧配置项结构ready回调
    cReady(ele){
        // promise =new BaseUploader().init();
        // promise.then((rs)=>{
        //     console.log("common uploader ",rs);
        // });
        // console.log(ele,"configReady");
    }
});



export default class ImgUploadCommonDemo{
    constructor(opt){
        this.defaults={
            cache:{},
            addBtn:'[data-query="btnDemo5"]',
            configBox:'[data-config]',
            progress:'[data-query="progress"]',
            imgCount:'[data-query="imgCount"]',//上传图片当前计数
            total:'[data-query="imgTotal"]',
            imgUploadBox:'[data-query="imgUploadBox"]',//图片上传弹层
            pick: "filePicker",//上传按钮id
            mask:'[data-query="mask"]',
            max:50//图片最大上传数量
        };
        this.options=$.extend(true,{},this.defaults,opt);
    }
    init(){
        this.initStyle();
        this.bindEvent();
    }
    bindEvent(){
        let cache=this.options.cache;
        let options=this.options;
        let _this=this;
        let fileId;

        $(doc).on('click',this.options.addBtn,function(){
            tools.generate({
                type:"ImgUploadCommonDemo",
                h1:"测试图文标题",
                x:123,
                y:321,
                config:{//侧右配置项数据
                    picker:options.pick,

                }
            },"append",true);
        });



    }

    initStyle(){

    }
}