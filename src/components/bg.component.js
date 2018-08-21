import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';

import {common} from 'storage';
let tools = new Utils();
let uploader=new Uploader({
    uploaderOptions:{
        pick:{
            id:"#bgPicker"
        }//上传按钮
    }
}).init();
uploader.on( 'uploadSuccess', function( file,response ) {               
    console.log(response)
    if(response.status==="success"){        
    //     $(".component-Main").css({
    //     'background':'url('+response.msg+') no-repeat center top'
    //    })
        
        var bgBox = $('.bg_imgs'),
            html = '',
            imgArr = [],
            bgHeight = 0;
        html +='<div class="bg_imgs">'
        for (var item in response.data.cutimgs){
            bgHeight += response.data.cutimgs[item].height;
            imgArr.push(response.data.cutimgs[item]);
            html += '<div style="height:' + response.data.cutimgs[item].height + 'px;background:url(' + response.data.cutimgs[item].src+') no-repeat center top"></div>'
        };
        html+='</div>';
        $('.fz_line1').empty();
        $('.fz_line1').append(html)
        $("#bgInput").val(response.data.oldimgname)
        common.bgImg = imgArr;
        DrawGrid(bgHeight,100,100)
        if (bgHeight>1000){
            common.canvasHeight = bgHeight;
            $(".canvas-box").css({
                'height': bgHeight + 'px'
            });
            $('.height_input').val(bgHeight)

        }
        
    }
});

function DrawGrid(height,rectW,rectH) {
  
    var canvas = document.querySelector('.fz_line');
    var ctx = canvas.getContext('2d');
    canvas.width = 1000-2;
    canvas.height = height;
    ctx.lineWidth = 1;
    //绘制表格
    // 第一步： 绘制大间距竖线
    for (var i = 0; i < canvas.height; i++) {
        ctx.strokeStyle ='rgba(0,0,0,0.2)'
        if((rectW * i+rectW)!=canvas.width){
            ctx.beginPath();
            ctx.moveTo(rectW * i+rectW+.5, 0);
            ctx.lineTo(rectW * i+rectW+.5, canvas.height);
            ctx.closePath();
            ctx.stroke(); 
        }
    }
   
    // 第二步：绘制小间距竖线
    for (var i = 0; i < canvas.height; i++) {
      
        if((rectW/5 * i+rectW/5)!=canvas.width){
        ctx.strokeStyle ='rgba(0,0,0,0.1)'
        ctx.beginPath();
        ctx.moveTo(rectW/5 * i+rectW/5+.5, 0);
        
        ctx.lineTo(rectW/5 * i+rectW/5+.5, canvas.height);
        ctx.closePath();
        ctx.stroke(); 
        }
      
     
       
    }
   // 第三步： 绘制大间距横线
    for (var i = 0; i < canvas.width; i++) {
        
        ctx.strokeStyle ='rgba(0,0,0,0.2)'
        ctx.beginPath();
        ctx.moveTo(0,rectH * i+rectH+.5);
       
        ctx.lineTo(canvas.width,rectH * i+rectH+.5);
        ctx.closePath();
        ctx.stroke(); 
    }
    // 第四步： 绘制小间距横线
    for (var i = 0; i < canvas.width; i++) {
        ctx.strokeStyle ='rgba(0,0,0,0.1)'
        ctx.beginPath();
        ctx.moveTo(0,rectH/5 * i+rectH/5+.5);
        ctx.lineTo(canvas.width,rectH/5 * i+rectH/5+.5);
        ctx.closePath();
        ctx.stroke(); 
    }
   
}

$(function(){
  setTimeout(function(){
     let height=$(".canvas-box").height();
    DrawGrid(height,100,100)
  },50);
  
   
    $("#bodyHeight").click(function(e){
         var  text = $(this).prev('input').val()
         $(".canvas-box").css({
            'height':text + 'px'
         })
         common.canvasHeight = text;
         DrawGrid(common.canvasHeight,100,100,'#ccc')
         window.jcropapi&&window.jcropapi.setImage2(text)
  
    });
    $('.title_input').bind('blur',function(){
        var title_text = $(this).val();
        common.ztTitle = title_text;
    });
    $('.keywords').bind('blur', function () {
        var key_words = $(this).val();
        common.keyWords = key_words;
    });
    $('.write_zt').bind('blur', function () {
        var write_zt = $(this).val();
        common.writeZt = write_zt;
    });
    $('.thirdPartCode1').bind('blur', function () {
        common.thirdPartCode1 = this.value.trim();
    });
    $('.thirdPartCode2').bind('blur', function () {
        common.thirdPartCode2 = this.value.trim();
    });
    $('.linkTopic').bind('blur', function () {
        common.linkTopic = this.value.trim();
    });
})