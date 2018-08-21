


$(function() {
    $(".realTableCont table").each(function(){
       
        var idx = $(this).attr('data-idx');
        idx == 0 ? $(this).show() :  $(this).hide();
    }) 
    
    $(".table_tab li").on('click',function() {
          var indx = $(this).index()
          $(this).addClass('active').siblings().removeClass('active')
          $(".realTableCont table").eq(indx).show().siblings().hide()
     })
})