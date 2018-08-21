
$(function(){
    $('[data-query="tabBox"]').each(function(){
        $(".tab-switching>div",this).eq(0).show();
        $(".tab-switching-top-tab li",this).eq(0).addClass("cur");
        $(".tab-switching-bottom-tab li",this).eq(0).addClass("cur");
        $(".tab-switching-left-tab li",this).eq(0).addClass("cur");
        $(".tab-switching-right-tab li",this).eq(0).addClass("cur");

    });


    $('[data-query="zTab"] li').click(function(){
        //通过 .index()方法获取元素下标，从0开始，赋值给某个变量
        var $ele=$(this).closest('[data-query="tabBox"]');
        var _index = $(this).index();
        //让内容框的第 _index 个显示出来，其他的被隐藏
        $(".tab-switching>div",$ele).eq(_index).show().siblings().hide();
        //改变选中时候的选项框的样式，移除其他几个选项的样式
        $(this).addClass("cur").siblings().removeClass("cur");
    });
    $('[data-query="zTab"] li').hover(function(){
        if(this.getAttribute('data-trigger')!=="hover")return;
        var $ele=$(this).closest('[data-query="tabBox"]');
        //通过 .index()方法获取元素下标，从0开始，赋值给某个变量
        var _index = $(this).index();
        //让内容框的第 _index 个显示出来，其他的被隐藏
        $(".tab-switching>div",$ele).eq(_index).show().siblings().hide();
        //改变选中时候的选项框的样式，移除其他几个选项的样式
        $(this).addClass("cur").siblings().removeClass("cur");
    });

});

