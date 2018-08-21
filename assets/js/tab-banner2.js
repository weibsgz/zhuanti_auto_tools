function xFocusFour(Box) {
    var Menu = $(Box + ' .slider li');//圆点菜单
    var Con = $(Box + ' .view li');//大图
    var Text = $(Box + ' .text li');//图注文字
    var Prev = $(Box + ' .prev4');//上一页
    var Next = $(Box + ' .next4');//下一页
    var Counts = $(Con).size();//获取li总数
    var nowIndex = 0;
    var timer;
    $(Prev).add(Next).find('em').html(1).end().find('i').html(Counts);
    /* 点击切换 */
    $(Menu).click(function () {
        var i = $(Menu).index(this)
        gotoPage(i);
    });
    /* 打开相应的标签 */
    $(Con).fadeOut(200).eq(0).fadeIn(200);
    $(Text).hide().eq(0).fadeIn(200);

    function gotoPage(i) {
        $(Menu).removeClass("current").eq(i).addClass("current");
        $(Con).fadeOut(200).eq(i).fadeIn(200);
        $(Text).hide().eq(i).fadeIn(200);
        nowIndex = i;
        $(Prev).add(Next).find('em').html(i + 1).end().find('i').html(Counts);
    };
    /* 下一页 */
    $(Next).click(function () {
        gotoR();
    });

    function gotoR() {
        nowIndex++;
        if (nowIndex > Counts - 1) {
            nowIndex = 0;
        }
        gotoPage(nowIndex);
    };
    /* 上一页 */
    $(Prev).click(function () {
        nowIndex--;
        if (nowIndex < 0) {
            nowIndex = Counts - 1
        }
        gotoPage(nowIndex);
    });

    /* 自动轮播 */
    function setAutoOne() {
        if (Counts > 1) {
            timer = setInterval(gotoR, 3000);
        }
        ;
    };
    if(Con.length==1){
       
        $(Prev).remove();
        $(Next).remove();
    }
    setAutoOne();
    /* 鼠标经过暂停，离开继续轮播 */
    $(Prev).hide();
    $(Next).hide();
    $(Box).hover(function () {
            $(Prev).add(Next).show();
            if (timer) {
                clearInterval(timer);
            }
        },
        function () {
            $(Prev).add(Next).hide();
            setAutoOne();
        });
};