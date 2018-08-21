//已废弃，在main.js中引入

$(function(){
    $('body').on('click','.component-Right-Header span',function(){
        var index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.indexTab').children('div').eq(index).css('left','0')
        .siblings().css('left','500px');
    })




    var canvas = $('.component-Main')
    $('.component-Left button#zd_btn').bind('click',function(){
        var thisName = $(this).attr('class');
        if (thisName == ''){
            $(this).addClass('active').parent().css('left', '-150px');
            canvas.css('margin-left','0');
        }else{
            $(this).removeClass('active').parent().css('left', '0px'); 
            canvas.css('margin-left', '150px')
        };
    });
    $('.component-Right button#zd_btn').bind('click', function () {
        var thisName = $(this).attr('class');
        if (thisName == '') {
            $(this).addClass('active').parent().css('right', '-259px');
            canvas.css('margin-right', '0');
        } else {
            $(this).removeClass('active').parent().css('right', '0px');
            canvas.css('margin-right', '260px');
        }
    })
})