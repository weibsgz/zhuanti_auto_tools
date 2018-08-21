$(function(){
    $(".playerdata").each(function(index,ele){
        $(ele).find(".box-content").each(function(index,items){
            xFocusTwo("#"+$(items).attr('id'))
        })
    })
})