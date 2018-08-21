$(function(){
    $(".playerdata2").each(function(index,ele){
        $(ele).find(".box-content").each(function(index,items){
            xFocusFour("#"+$(items).attr('id'))
        })
    })
})