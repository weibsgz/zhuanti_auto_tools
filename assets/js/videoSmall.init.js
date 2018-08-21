$(function(){

(function(){
$(".playerdataczhSmall").each(function(index,ele){

      
    if(!($(ele).attr("data-flag")=='live')){
        if($(ele).find('li').length>0){
            $(ele).find(".box-contentSmall").show();
            if($(ele).find('li').length==1){
                $(ele).find('.videoSmall').css('width','100%')
                $(ele).find('.view').css('width','100%')
            }
   
   var arr=$(ele).attr("data-videoId").split(",");
   var arr2=[];
   for(var i=0;i<arr.length;i++){
       if(arr[i].length>0){
           arr2.push(arr[i])
       }
   }
  
   if($(ele).find('li').length>1){
    $.each(arr2,function(index,item){
       
         var xp=XP.create($(ele).find('li').get(index),{
         id:arr2[index],
         width:'100%',
         height:'100%',
         autoPlay:false
     });
  
     })
  }
  else{
      var xp=XP.create($(ele).find('li').get(0),{
          id:arr2[0],
          width:'100%',
          height:'100%',
          autoPlay:false
      });
  }
  $(ele).find('li').eq(0).addClass('current');
   $(ele).find(".box-contentSmall").each(function(index,items){
       xFocus("#"+$(items).attr('id'))
   })
}
  
}
else{
   
   $(ele).find(".singalvideoSmall").show();
   if($(ele).attr("data-src").length>0){
    XPLIVE.create($(ele).find('.singalvideoSmall').attr('id'),{
        src:$(ele).attr("data-src"),
        width:$(ele).attr("data-width"),
        height:$(ele).attr("data-height"),
        autoPlay:true
    });
       
   
}
}
})
})();
})