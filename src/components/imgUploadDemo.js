/**
 * Created by zhoulongfei on 2018/7/3.
 * E-mail:36995800@163.com
 */

import * as $ from 'jquery';
import Uploader from 'uploader';
import Utils from 'utils';

let tools=new Utils();
let doc=document;
let promise=new Promise((resolve,reject)=>{
    tools.register({
        type:"ImgUploadDemo",
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
            let uploader=new Uploader({
                uploaderOptions:{
                    pick:"#demoFilePicker"//上传按钮
                }
            }).init();
            resolve(uploader);
            console.log(ele,"configReady");
        }
    });
});



export default class ImgUploadDemo{
    constructor(opt){
        this.defaults={
            cache:{},
            addBtn:'[data-query="btnDemo4"]',
            configBox:'[data-config]',
            progress:'[data-query="progress"]',
            imgCount:'[data-query="imgCount"]',//上传图片当前计数
            total:'[data-query="imgTotal"]',
            imgUploadBox:'[data-query="imgUploadBox"]',//图片上传弹层
            uploaderOptions:{
                pick: "demoFilePicker",//上传按钮
            },
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
                type:"ImgUploadDemo",
                h1:"复杂得",
                x:123,
                y:321,
                config:{//侧右配置项数据

                    picker:options.uploaderOptions.pick,

                }
            },"append",true);
        });

        promise.then((uploader)=>{
            //当文件被添加进队列前对文件进行过滤
            uploader.on("beforeFileQueued",function(file){
                //size=file.size;
                //name=file.name;
                //width=file._info&&file._info.width;当文件上传完毕后才会有file._info
                //height=file._info&&file._info.height;

            });
            // 当有文件添加进来的时候
            uploader.on( 'fileQueued', function( file ) {

            });
            uploader.on( 'startUpload', function() {

            });
            uploader.on( 'uploadFinished', function( ) {

            });

            uploader.on( 'uploadProgress', function( file, percentage ) {
                //let percent=Math.ceil(percentage.toFixed(2)*100)+"%";
            });
            // 文件上传失败，显示上传出错。
            uploader.on( 'uploadError', function( file,reason ) {
                fileId=file.id;
                uploader.removeFile(fileId,true);//移出队列

            });
            // 文件上传成功，
            uploader.on( 'uploadSuccess', function( file,response ) {
                fileId=file.id;
                if(response.status==="success"){
                    console.log(response);
                }
            });
            uploader.on( 'uploadComplete', function( file ) {

            });
            uploader.on("error",function(type){
                if(type==="F_EXCEED_SIZE"){
                    //alert('图片大小太大')
                }
                if(type==="Q_TYPE_DENIED"){
                    //alert('文件不符合要求')
                }
                if(type==="F_EXCEED_SIZE"||type==="Q_TYPE_DENIED"){
                    alert('请先择正确图片')
                }
                /*if(type=="Q_TYPE_DENIED"){
                 hidden_pic_dialog();
                 tools.showMessage("文件不符合要求");
                 }*/


                /* setTimeout(function(){
                 $("#graybg_pop").show();
                 show_pic_dialog()
                 },3000)*/
            })
        }).catch((e)=>{
            console.log(e)
        })

    }

    initStyle(){

    }
}