import * as $ from 'jquery';
import Utils from 'utils';
let tools = new Utils();
export default class DragClass {
    constructor() {

    }
    init() {
        this.bindEvent();
    }
    bindEvent() {
        $('[data-query="canvasBox"] .dragDiv').each(function (index, element) {
            var self = $(element)
            
           self.myDrag({
                move:'both',
                parent:'[data-query="canvasBox"]', //定义拖动不能超出的外框,拖动范围
                randomPosition:false, //初始化随机位置
                direction:'all', //方向
                handler:false, //把手
                dragStart:function(x,y){}, //拖动开始 x,y为当前坐标
                dragEnd:function(x,y){
                 
                    tools.setValue(self, Object.assign(
                        {'x':x,'y':y},
                    
                    ));
                }, //拖动停止 x,y为当前坐标
                dragMove:function(x,y){} //拖动进行中 x,y为当前坐标
            });
        });

    }
}
