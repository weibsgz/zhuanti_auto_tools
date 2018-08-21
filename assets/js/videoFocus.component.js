// JavaScript Document
function xFocus(focusbox){
  
    var Box=focusbox;
  
    var Con=$(Box+' .view li');
    var Prev=$(Box+' .focusczh .btnprev');
    var Next=$(Box+' .focusczh .btnnext');
    var Counts=$(Con).size();
    var nowIndex=0;
    var timer;
    function gotoPage(i){
        $(Con).fadeOut(200).eq(i).fadeIn(200);
       nowIndex=i;
    };
    
    $(Next).click(function(e){

        gotoR();
    });
    function gotoR(){
        nowIndex++;
        if(nowIndex > Counts-1){
            nowIndex=0;
        }
        gotoPage(nowIndex);
    };
    
    $(Prev).click(function(e){
        e.stopPropagation();
        nowIndex--;
        if(nowIndex < 0){
            nowIndex=Counts-1
        }
        gotoPage(nowIndex);
    });
    
   
   
    if(Con.length==1){
       
        $(Prev).remove();
        $(Next).remove();
    }
    else{
    $(Prev).show();
    $(Next).show();
    }
    
    $(Box).hover(function(){
      
            $(Prev).show();
            $(Next).show();
          
        },
        function(){
           
            $(Prev).hide();
            $(Next).hide();
          
        });
}