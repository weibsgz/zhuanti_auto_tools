// JavaScript Document
function xFocusOne(focusbox){
    var Box=focusbox;
    var Menu=$(Box+' .xfocus_04 .slider li');//Բ��˵�
    var Con=$(Box+' .xfocus_04 .view li');//��ͼ
    var Text=$(Box+' .text li');//ͼע����

    var Prev=$(Box+' .prev4');//��һҳ
    var Next=$(Box+' .next4');//��һҳ
    var Counts=$(Con).size();//��ȡli����
    var timer;
    /* ����л� */
    $(Menu).click(function(){
        var i=$(Menu).index(this)
        gotoPage(i);
    });
    $(Con).hide().eq(0).show();
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
