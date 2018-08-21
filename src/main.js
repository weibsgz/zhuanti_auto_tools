import * as $ from 'jquery';
import Utils from 'utils';
import { common } from 'storage';
let tools = new Utils();
let doc = document;
export default class Main {
    constructor(opt) {
        this.defaults = {
            cache: {},
            btn: '[data-query="button3"]',
            btn2: '[data-query="button4"]',
            btn_save: '.save-li',
            btn_preview: '.scale-li',
            topic_id: '',
            name: '',
            folder: '',
            server:{
                lock:'http://t.xcar.com.cn/topicManage/TopicList/getUserLock'
            },
            createTime: ''

        };
        this.options = Object.assign({}, this.defaults, opt);
    }
    init() {
        this.bindEvent();
        this.getUrl();
        this.userLock();
        this.getScreenSize();
        this.getContent();
    }

    getUrl() {
        this.topic_id = tools.getQueryString('topicId');
        this.name = tools.getQueryString('name');
        this.folder =tools.getQueryString('folder');
        this.createTime = tools.getQueryString('createTime');
        $("#ztName").val(this.name);
        $("#ztURL").val(this.folder)
    }
    //时间戳转换
    formatTime(timeStamp, needHMS, type) {
        function add0(m) { return m < 10 ? '0' + m : m }
        if (type !== '年月日') {
            var localType = type || '/'
        }

        //timeStamp是整数，否则要parseInt转换
        var time = new Date(timeStamp);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();  

        if (type !== '年月日') {
            return needHMS ? (y + localType + add0(m) + localType + add0(d) + ' ' +
                h + ':' + mm + ':' + s) : (y + localType + add0(m) + localType + add0(d))
        }
        else {

            return needHMS ? (y + '年' + add0(m) + '月' + add0(d) + '日' + ' ' +
                h + ':' + mm + ':' + s)
                : y + '年' + add0(m) + '月' + add0(d) + '日'
        }
    }

    bindEvent() {

        let temp;
        let resUrl = '';
        let _this = this;


        //迁移首页index.js代码
        $('body').on('click', '.component-Right-Header span', function () {
            var index = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.indexTab').children('div').eq(index).css('left', '0')
                .siblings().css('left', '500px');
        })
        var canvas = $('.component-Main')
        $('.component-Left button#zd_btn').bind('click', function () {
            let _this=$(this);
            var thisName = $(this).attr('class');
            if (thisName == '') {
                $(this).addClass('active').parent().animate({'left':-150},500);
                canvas.animate({'margin-left':0},500,function(){
                    _this.css('background-image',"url('http://t.xcar.com.cn/zteditor/assets/img/icon-leftOutbtn.png')")
                });
            } else {
                $(this).removeClass('active').parent().animate({'left':0},500)
                canvas.animate({'margin-left':150},500,function(){
                    _this.css('background-image',"url('http://t.xcar.com.cn/zteditor/assets/img/icon-leftbtn.png')")
                });
            };
        });
        $('.component-Right button#zd_btn1').bind('click', function () {
            let _this=$(this);
            var thisName = $(this).attr('class');
            if (thisName == '') {
                //收起
                $(this).addClass('active').parent().animate({'right':-259},500);
                canvas.animate({'margin-right':0},500,function(){
                    _this.css('background-image',"url('http://t.xcar.com.cn/zteditor/assets/img/icon-rightOutbtn.png')")
                });
            } else {
                //展开
                $(this).removeClass('active').parent().animate({'right':0},500);
                canvas.animate({'margin-right':260},500,function(){
                    _this.css('background-image',"url('http://t.xcar.com.cn/zteditor/assets/img/icon-rightbtn.png')")
                });
            }
        })






        $(doc).on("click", this.options.btn, function () {
            temp = [];
            $('[data-type]').each(function () {
                temp.push(tools.getData(this.getAttribute('data-type'), this));
            });
            console.log(temp);
        });
        $(doc).on("click", this.options.btn2, function () {
            $(_this.options.btn).trigger('click');
            console.log('temp',temp)
            let html = tools.makeHtml(temp);
            $.ajax({
                url: "/view",
                method: "POST",
                data: { html },
                success: function (res) {
                    alert("生成成功");
                    console.log(res);
                }
            });
            window.open("/view")
            console.log(html);
        });
        //删除
        $(doc).on("mouseenter mouseleave", '.dragDiv', function (event) {

            var div = $("<div class='del'>删除</div>")
            if (event.type == "mouseenter") {
                if($(this).find('.del').length==0)
                $(this).append(div)
                else{
                    $(this).find('.del').show();
                }

            } else if (event.type == "mouseleave") {
                $(this).find(".del").hide()

            }
        })
        $(doc).on('click', '.dragDiv .del', function (event) {
            ///event.stopPropagation();
            console.log(tools.getCurrentComponent());
            $(".bgDelBox").show();
            $(".ztDelBox").show(200);
          
            
        })
        $(".ztOperateCancelBtn,.ztCloseBtn").on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            $(".bgDelBox").hide();
            $(this).closest(".ztDelBox").hide(200);
            return;
        })
        $(doc).on('click','.ztOperateDelBtn',function(e){
             e.preventDefault();
             e.stopPropagation();
             tools.removeComment(tools.getCurrentComponent())
             $(".bgDelBox").hide();
             $(this).closest(".ztDelBox").hide(200);
         })
        //保存
        $(doc).on('click', this.options.btn_save, function (event) {
            _this.saveFn(1,1,1)

        })
        setInterval(function(){
            _this.saveFn(1,0,0);
        },30000)

        //预览
        $(doc).on('click', this.options.btn_preview, function (event) {
            _this.saveFn(2,1,1)

        })

        //公共部分,



    }
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }

   
    getContent(){
        var _this = this; 
        if (!(tools.getQueryString('ned'))){
            $.ajax({
                url: "http://t.xcar.com.cn/index.php/api/saveTopicDiy/updatefile",
                method: "POST",
                data: {
                    topic_id: _this.topic_id,
                    topic_path: _this.folder,
                    topic_time: _this.createTime
                },
                success: function (res) {
                    console.log(res)
                    var resObj = $.parseJSON(res);
                    if (resObj.status == 'success') {
                        resObj = $.parseJSON(resObj.msg);
                        resObj = $.parseJSON(resObj);
                        console.log(resObj)
                        // 背景图
                        if (resObj.bgImg.length>0){
                            var html = '';
                            html += '<div class="bg_imgs">'
                            for (var item in resObj.bgImg) {
                                html += '<div style="height:' + resObj.bgImg[item].height + 'px;background:url(' + resObj.bgImg[item].src + ') no-repeat center top"></div>'
                                //html += '<div style=""><img src = "' + resObj.bgImg[item] + '"></div>'
                            };
                            html += '</div>';
                            $('.fz_line1').empty();
                            $('.fz_line1').append(html);
                            common.bgImg = resObj.bgImg;
                            $('#bgInput').val(resObj.data&&resObj.data.oldimgname)
                        }
                        // 标题
                        common.ztTitle = resObj.title;
                        $('.title_input').val(resObj.title)
                        // 关键字
                        common.keyWords = resObj.keyWords;
                        $('.keywords').val(resObj.keyWords)
                        // 描述
                        common.writeZt = resObj.des;
                        // 高度
                        common.canvasHeight = resObj.height;
                        $(".canvas-box").css({
                            'height': resObj.height + 'px'
                        });
                        $('.height_input').val(resObj.height);
                        //组件
                        for (var item in resObj.list) {
                            tools.generate(resObj.list[item], "append", true,true);
                        };
                        // 第三方代码
                        common.thirdPartCode1 = resObj.thirdPartCode[0];
                        $('.thirdPartCode1').val(resObj.thirdPartCode[0]);
                        common.thirdPartCode2 = resObj.thirdPartCode[1];
                        $('.thirdPartCode2').val(resObj.thirdPartCode[1]);
                        common.linkTopic=resObj.linkTopic;
                        $('.linkTopic').val(resObj.linkTopic);
                    } else {
                        alert('无回显数据')
                    };
                }
            });
        }
    }
    saveFn(flag,flag2,flag3) {
        var _this = this;
        var saveData = [];
        var time = _this.timestampToTime(_this.createTime);
        let checkFlag;
        $('[data-type]').each(function () {
            let temp=tools.getData(this.getAttribute('data-type'), this);
            if(temp==='false'){
                checkFlag=true;
                return false;
            }
            saveData.push(temp);
        });
        if(checkFlag)return;
        let tempData=tools.makeHtml(saveData);
        let html = tempData.html;
        $.ajax({
            url: "http://t.xcar.com.cn/index.php?/api/saveTopicDiy/savefile",
            method: "POST",
            data: {
                topic_id: _this.topic_id,
                topic_path: _this.folder,
                topic_title:tempData.metaData.title,
                topic_time: time,
                topic_html: html,
                topic_json: JSON.stringify(tempData.metaData)
            },
            success: function (res) {
                res = JSON.parse(res)
                if (res.status == 'success') {
                    if(flag3){
                        flag == 1&&flag2 ? alert('保存成功！') : window.open('http://' + res.msg)
               
                    }
                    }

            }
        });
    }
    userLock(){
        let xhr=$.ajax({
            method:"POST",
            url:this.options.server.lock,
            data:{
                id:+this.topic_id
            }
        })
    };
    getScreenSize(){
        if(window.screen.height >= 900){

        }else{
            $("#bgBoxs").css({"height":"500px","overflow-y":"auto"});
        }
    };
}
