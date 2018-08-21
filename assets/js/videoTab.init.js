$(function () {
    (function () {

        $(".playerdataczhTab").each(function (index, ele) {


            if (!($(ele).attr("data-flag") == 'live')) {
                if ($(ele).find('li').length > 0) {
                    $(ele).find(".box-content").show();
                    if ($(ele).find('li').length == 1) {
                        $(ele).find('.focusczh').css('width', '770px');
                        $(ele).find('.view').css('width', '770px');

                    }

                    var arr = $(ele).attr("data-videoid").split(",");
                    var arr2 = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].length > 0) {
                            arr2.push(arr[i])
                        }
                    }
                    if ($(ele).find('li').length > 1) {
                        $.each(arr2, function (index, item) {

                            var xp = XP.create($(ele).find('li').get(index), {
                                id: arr2[index],
                                width: 770,
                                height: 495,
                                autoPlay: false
                            });

                        })
                    } else {
                        var xp = XP.create($(ele).find('li').get(0), {
                            id: arr2[0],
                            width: 770,
                            height: 495,
                            autoPlay: false
                        });
                    }
                    $(ele).find('li').eq(0).addClass('current');
                    $(ele).find(".box-content").each(function (index, items) {
                        xFocus("#" + $(items).attr('id'))
                    })
                }

            } 
        })
    })();
})