/**
 * Created by zhoulongfei on 2018/7/3.
 *
 */
import * as $ from 'jquery';
import WebUploader from 'webuploader';
let doc=document;
export default class Uploader {
    constructor(opt) {
        var formDateVal ;
        //背景图上传需要传cut=1参数
        opt.uploaderOptions.pick.id == '#bgPicker' ? formDateVal = { 'cut': 1 } : formDateVal = {}
        this.defaults = {
            uploaderOptions: {
                auto: true, // 选完文件后，是否自动上传。
                pick:{
                    id:"#filePicker",
                    multiple:false
                },//上传按钮
                cacheImage:true,
                accept: {
                    title: 'Images',
                    extensions: 'jpg,jpeg,png',
                    mimeTypes: 'image/jpg,image/jpeg,image/png'
                },
                // swf文件路径
                //swf: 'xbb/Uploader.swf',
                //是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
                disableGlobalDnd: true,
                compress:{
                    width: 1920,
                    height:24000,
                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 90,

                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: true,
                    // 是否允许裁剪。
                    crop: false,
                    type: 'image/jpeg',

                    // 是否保留头部meta信息。
                    preserveHeaders: true,
                    // 如果发现压缩后文件大小比原来还大，则使用原来图片
                    // 此属性可能会影响图片自动纠正功能
                    noCompressIfLarger: true,
                    // 单位字节，如果图片大小小于此值，不会采用压缩。
                    compressSize: 5*1024*1024
                },
                runtimeOrder:"html5",
                prepareNextFile:true,
                chunked:false,
                chunkRetry:2,
                threads:3,
                chunkSize:5*1024*1024,
                thumb:{
                    width: 0,
                    height: 0
                },
                formData: formDateVal,
                duplicate:true,
                // 服务器接收端
                server:"http://t.xcar.com.cn/index.php?/api/uploadFile/upload",
                //server:"/upload",
                //验证文件总数量, 超出则不允许加入队列。
                fileNumLimit: 100,
                fileVal:"file",
                //验证文件总大小是否超出限制, 超出则不允许加入队列。
                fileSizeLimit: 50000* 1024 * 1024,    //

                fileSingleSizeLimit: 5.01 * 1024 *1024  // 10 M

            }
        };
        this.options=$.extend(true,{},this.defaults,opt);
    }

    init() {
        return this.initUploader();
    }

    initUploader() {
        let _this = this;
        //确认支持性
        if (!WebUploader.Uploader.support()) {
            alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            //throw new Error( 'WebUploader does not support the browser you are using.' );
            return
        }

        // 实例化LOGO上传
        let uploader = WebUploader.create(this.options.uploaderOptions);
        let fileId;

        //当文件被添加进队列前对文件进行过滤
         uploader.on("beforeFileQueued",function(file){
         if(fileId)
         uploader.removeFile(fileId,true);//移出队列

         //size=file.size;
         //name=file.name;
         //width=file._info&&file._info.width;当文件上传完毕后才会有file._info
         //height=file._info&&file._info.height;
         $(doc).trigger("beforeFileQueued",[_this,file])
         });
         // 当有文件添加进来的时候
         uploader.on( 'fileQueued', function( file ) {
         $(doc).trigger("fileQueued",[_this,file]);

         });
         //文件开始上传时操作
         uploader.on("startUpload",function(){

         });


         uploader.on( 'uploadProgress', function( file, percentage ) {
            $(doc).trigger("uploadProgress",[_this,file,percentage]);
         });

         // 文件上传成功，给item添加成功class, 用样式标记上传成功。
         uploader.on( 'uploadSuccess', function( file,response ) {
           
            $(doc).trigger("uploadSuccess",[_this,file,response]);
            response.status==="success"&&alert("上传成功!")
         });
         //获取服务端反馈
         uploader.on('uploadAccept',function(object,ret){
            $(doc).trigger("uploadAccept",[_this,object,ret]);
         });

         // 文件上传失败，显示上传出错。
         uploader.on( 'uploadError', function( file,reason ) {
             $(doc).trigger("uploadError",[_this,file,reason]);
             alert("上传失败，请重新上传!")
         });

         // 完成上传完了，成功或者失败，先删除进度条。
         uploader.on( 'uploadComplete', function( file ) {
            $(doc).trigger("uploadComplete",[_this,file]);
         });

         //错误
         uploader.on("error",function(type){
             console.log(type)
             alert("上传失败，请重新上传!");
            $(doc).trigger("error",[_this,type]);
         });
        return uploader
    }


}