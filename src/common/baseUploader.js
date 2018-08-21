/**
 * Created by zhoulongfei on 2018/7/4.
 * E-mail:36995800@163.com
 */
import * as $ from 'jquery';
import Uploader from 'uploader';
let dco= document;
export default class BaseUploader{
    constructor(opt){
        this.default={
            pick:{
                id:"#filePicker",//上传按钮
                multiple:false
            }
        };
        this.options=Object.assign({},this.default,opt)
    }
    init(){
        let uploader=new Uploader({
            uploaderOptions:{
                pick:this.options.pick//上传按钮
            }
        }).init();
        return new Promise((resolve,reject)=>{

            uploader.on( 'uploadSuccess', function( file,response ) {
                resolve(response);
            });
            uploader.on("error",function(type){
                if(type==="F_EXCEED_SIZE"){
                    //alert('图片大小太大')
                }
                if(type==="Q_TYPE_DENIED"){
                    //alert('文件不符合要求')
                }
                if(type==="F_EXCEED_SIZE"||type==="Q_TYPE_DENIED"){
                    //alert('请先择正确图片')
                }
                reject(type)
            })
        });

    }
    iniUploader(){

    }
}

