import Utils from 'utils';
import * as $ from 'jquery';
window.$ = $;
let tools = new Utils();
let doc = document;
let win = window;

tools.register({
    type: "Demo3",
    metaData: {
        html: '<div style="left:{{x}}px; top:{{y}}px;"><h1>{{h1}}</h1></div>',
        cssDepends: ['http://localhost:3030/assets/css/tuwen1.css'],
        jsDepends: [],
        css: 'color:red',
        code: 'alert(1)'
    },
    editData: {
        template: `<div><h1>{{h1}}</h1>input</div>`,
        configTml: `<div><input data-key="value" type="text" value="{{value}}">
        <input data-key="value1,_value1" type="text" value="{{_value1}}">
        <input data-key="value2,_value2" type="text" value="{{_value2}}">
        <input data-key="value3,_value3" type="text" value="{{_value3}}">
</div>`


    },
    getData: function (ele) {
        console.log("getValue", tools.getValue($(ele)));
        return Object.assign({}, tools.getValue($(ele)), {x: 123, y: 333});
    },
    ready(ele){
        setTimeout(() => {
            console.log(ele, 333333);
        }, 1)
    }
});
export default class TestComponent {
    constructor(opt) {
        this.defaults = {
            addBtn: '[data-query="btnDemo3"]',
            configBox: '[data-config]'
        };
        this.options = Object.assign({}, this.defaults, opt)

    }

    init() {
        this.bindEvent();
    }

    bindEvent() {
        let _this = this;

        $(doc).on("input", "input[data-key]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let keys = $(this).attr("data-key").split(',');

            tools.setValue($ele, Object.assign(
                {[keys[0]]: this.value},
                {'config': {[keys[keys.length === 1 ? 0 : 1]]: this.value}}
            ));

        });
        //获取组件数据
        $(doc).on("click", '[data-type="Demo3"]', function () {
            console.log("组件数据", tools.getValue($(this)))
        });


        $(doc).on('click', this.options.addBtn, () => {
            console.log('this.title', this.titleText);
            tools.generate({
                type: "Demo3",
                h1: "测试图文标题",
                config: {//侧右配置项数据
                    value: "defaultText",
                    _value1: "1",
                    _value2: "2",
                    _value3: "3",
                }
            }, "append", true);
        })
    }
}

