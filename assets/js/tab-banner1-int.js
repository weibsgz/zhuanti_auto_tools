$(function(){
    $(".playerdata").each(function(index,ele){
        $(ele).find(".box-content").each(function(index,items){
            xFocusOneTres("#"+$(items).attr('id'))
        })
    })
})