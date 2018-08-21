
$(function() {
            //模拟data-placeholder
          //  if( !browserSupport.data-placeholder){
               $('input[data-placeholder],textarea[data-placeholder]').each(function(){
                    var that = $(this),
                        text= that.attr('data-placeholder'),
                        oldType; 
                    if(that.val()===""){
                       that.val(text).addClass('data-placeholder');                
                    }   
                    that.focus(function(){
                        //ie8下readonly依然可以上焦点的处理
                        if(that.attr('readonly')){
                            that.blur();
                            return;
                       }
                        
                        that.removeClass('data-placeholder');
                        
                        if(that.val()===text){   
                           that.val("");   
                       }    
                    }).blur(function(){
                        if(that.val()===""){ 
                            that.val(text).addClass('data-placeholder');
                        //防止异常情况：当有data-placeholder类，且值不为空（代码设置值时容易出现）
                        }else{
                            that.removeClass('data-placeholder');
                        }   
                    })  
                });
           // }
        });