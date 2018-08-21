$(function(){
    $(".playerdata").each(function(index,ele){
        $(ele).find(".box-contentFocus").each(function(index,items){
            xFocusOne("#"+$(items).attr('id'))
        })
    })
})