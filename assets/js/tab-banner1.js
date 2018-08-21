// JavaScript Document
function xFocusOneTres(focusbox){
    var Box=focusbox;
    var Menu=$(Box+' .slider li');//Բ��˵�
    var Con=$(Box+' .view li');//��ͼ
    var Text=$(Box+' .text li');//ͼע����

    var Prev=$(Box+' .prev1');//��һҳ
    var Next=$(Box+' .next1');//��һҳ
    var Counts=$(Con).size();//��ȡli����
    var timer;
    /* ����л� */
    $(Menu).click(function(){
        var i=$(Menu).index(this)
        gotoPage(i);
    });
    $(Con).fadeOut().eq(0).fadeIn();
    $(Text).hide().eq(0).fadeIn();
    /* ����Ӧ�ı�ǩ */
    var nowIndex=0;
    function gotoPage(i){
        $(Menu).removeClass("current").eq(i).addClass("current");
        $(Con).fadeOut().eq(i).fadeIn();
        $(Text).hide().eq(i).fadeIn();
        nowIndex=i;
    };
    /* ��һҳ */
    $(Next).click(function(){
        gotoR();
    });
    function gotoR(){
        nowIndex++;
        if(nowIndex > Counts-1){
            nowIndex=0;
        }
        gotoPage(nowIndex);
    };
    /* ��һҳ */
    $(Prev).click(function(){
        nowIndex--;
        if(nowIndex < 0){
            nowIndex=Counts-1
        }
        gotoPage(nowIndex);
    });
    /* �Զ��ֲ� */
    function setAuto(){
        if(Counts>1){
            timer=setInterval(gotoR,3000);
        };
    };
    if(Con.length==1){
       
        $(Prev).remove();
        $(Next).remove();
    }
    setAuto();
    $(Box).hover(function(){
            $(Prev).show();
            $(Next).show();
            if(timer){
                clearInterval(timer);
            }
        },
        function(){
            $(Prev).hide();
            $(Next).hide();
            setAuto();
        });
}