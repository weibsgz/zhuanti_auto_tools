import * as $ from 'jquery';
    //一个jquery的插件，用于监听元素宽度高度变化，调用方式：
    //$("classname").bind('resize',function(){
        //callback
        //...
        //...
    //});
	(function ($, window, undefined) {
		var elems = $([]),
			jq_resize = $.resize = $.extend($.resize, {}),
			timeout_id,
			str_setTimeout = 'setTimeout',
			str_resize = 'resize',
			str_data = str_resize + '-special-event',
			str_delay = 'delay',
			str_throttle = 'throttleWindow';
		jq_resize[str_delay] = 250;
		jq_resize[str_throttle] = true;
		$.event.special[str_resize] = {
			setup: function () {
				if (!jq_resize[str_throttle] && this[str_setTimeout]) {
					return false;
				}
				var elem = $(this);
				elems = elems.add(elem);
				$.data(this, str_data, {
					w: elem.width(),
					h: elem.height()
				});
				if (elems.length === 1) {
					loopy();
				}
			},
			teardown: function () {
				if (!jq_resize[str_throttle] && this[str_setTimeout]) {
					return false;
				}
				var elem = $(this);
				elems = elems.not(elem);
				elem.removeData(str_data);
				if (!elems.length) {
					clearTimeout(timeout_id);
				}
			},
			add: function (handleObj) {
				if (!jq_resize[str_throttle] && this[str_setTimeout]) {
					return false;
				}
				var old_handler;

				function new_handler(e, w, h) {
					var elem = $(this),
						data = $.data(this, str_data);
					data.w = w !== undefined ? w : elem.width();
					data.h = h !== undefined ? h : elem.height();
					old_handler.apply(this, arguments);
				}

				if ($.isFunction(handleObj)) {
					old_handler = handleObj;
					return new_handler;
				} else {
					old_handler = handleObj.handler;
					handleObj.handler = new_handler;
				}
			}
		};

		function loopy() {
			timeout_id = setTimeout(function () {
				elems.each(function () {
					var elem = $(this),
						width = elem.width(),
						height = elem.height(),
						data = $.data(this, str_data);
					if (width !== data.w || height !== data.h) {
						elem.trigger(str_resize, [data.w = width, data.h = height]);
					}
				});
				loopy();
			}, jq_resize[str_delay]);
		}
	})($, this);

;(function($, window, document,undefined) {
    //定义的构造函数
    var Drag = function(ele, opt) {
        this.$ele = ele,
				this.x = 0,
				this.y = 0,
        this.defaults = {
					parent:'parent',
					randomPosition:true,
					direction:'all',
					handler:false,
					dragStart:function(x,y){},
					dragEnd:function(x,y){},
					dragMove:function(x,y){}
				},
				this.options = $.extend({}, this.defaults, opt)
    }
    //定义方法
    Drag.prototype = {
        run: function() {
					var $this = this;
					var element = this.$ele;
					var randomPosition  = this.options.randomPosition; //位置
					var direction = this.options.direction; //方向
					var handler = this.options.handler;
					var parent = this.options.parent;
					var isDown = false; //记录鼠标是否按下
					var fun = this.options; //使用外部函数
					var X = 0,
							Y = 0,
							moveX,
							moveY;
					// 阻止冒泡
					element.find('*').not('img').mousedown(function(e) {
						//e.stopPropagation();
					});
					//初始化判断
					if(parent == 'parent'){
						parent = element.parent();
					}else{
						parent = element.parents(parent);
					}
					if(!handler){
						handler = element; 
					}else{
						handler = element.find(handler);
					}
					//初始化
					//parent.css({position:'relative'});
					element.css({position:'absolute'});
					var boxWidth=0,boxHeight=0,sonWidth=0,sonHeight=0;
					//盒子 和 元素大小初始化
					initSize();
					if(randomPosition){randomPlace();}
					$(window).on("resize",function(e){
						
						initSize();
						if(randomPosition){randomPlace();}
					});
					 parent.bind("resize",function(e){
						
					 	initSize();
					 	if(randomPosition){randomPlace();}
					 });
					//盒子 和 元素大小初始化函数
					function initSize(){
						boxWidth = parent.outerWidth();
						boxHeight = parent.outerHeight();
						sonWidth = element.outerWidth();
						sonHeight = element.outerHeight();
					}
					//位置随机函数
					function randomPlace(){
						if(randomPosition){
							var randX = parseInt(Math.random()*(boxWidth-sonWidth));
							var randY = parseInt(Math.random()*(boxHeight-sonHeight));
							if(direction.toLowerCase() == 'x'){
								element.css({left:randX});
							}else if(direction.toLowerCase() == 'y'){
								element.css({top:randY});
							}else{
								element.css({left:randX,top:randY});
							}
						}
					}
					handler.css({cursor:'move'}).mousedown(function(e){
						isDown = true;
						X = e.pageX;
						Y = e.pageY;
						$this.x = element.position().left;
						$this.y = element.position().top;
						element.addClass('on');
						fun.dragStart(parseInt(element.css('left')),parseInt(element.css('top')));
						return false;
					});
					$(document).mouseup(function(e){fun.dragEnd(parseInt(element.css('left')),parseInt(element.css('top')));element.removeClass('on');isDown = false;});
					$('[data-query="canvasBox"]').mousemove(function(e){
						moveX = $this.x+e.pageX-X;
						moveY = $this.y+e.pageY-Y;
						function thisXMove(){ //x轴移动
							if(isDown == true){
								element.css({left:moveX});
							}else{
								return;
							}
							if(moveX < 0){
								element.css({left:0});
							}
							if(moveX > (boxWidth-sonWidth)){
								element.css({left:boxWidth-sonWidth});
							}
							return moveX;
						}
						function thisYMove(){ //y轴移动
							if(isDown == true){
								element.css({top:moveY});
							}else{
								return;
							}
							if(moveY < 0){
								element.css({top:0});
							}
							if(moveY > (boxHeight-sonHeight)){
								element.css({top:boxHeight-sonHeight});
							}
							return moveY;
						}
						function thisAllMove(){ //全部移动
							if(isDown == true){
								element.css({left:moveX,top:moveY});
							}else{
								return;
							}
							if(moveX < 0){
								element.css({left:0});
							}
							if(moveX > (boxWidth-sonWidth)){
								element.css({left:boxWidth-sonWidth});
							}
							if(moveY < 0){
								element.css({top:0});
							}
							if(moveY > (boxHeight-sonHeight)){
								element.css({top:boxHeight-sonHeight});
							}
						}
						if(isDown){
					  	fun.dragMove(parseInt(element.css('left')),parseInt(element.css('top')));
						}else{
							return false;
						}
						if(direction.toLowerCase() == "x"){
							thisXMove();
						}else if(direction.toLowerCase() == "y"){
							thisYMove();
						}else{
							thisAllMove();
						}
					});
		},
		initSize:function() {
		 
		}
    }

    //插件
    $.fn.myDrag = function(options) {
        //创建实体
        var drag = new Drag(this, options);
        //调用方法
        drag.run();
		return this;
    }
})($, window, document);