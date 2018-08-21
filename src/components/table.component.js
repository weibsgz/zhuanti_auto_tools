import Utils from 'utils';
import * as $ from 'jquery';
import Uploader from 'uploader';
import DragClass from '../common/drag.init';
let tools = new Utils();
let doc = document;
let win = window;


var tuwen1HTML = `<div class="Table4-wrapper dragDiv" data-type="Table4" style=" left:{{x}}px; top:{{y}}px;color:{{fontColor}}">
<div class="selectDiv" ></div>

 {{if tableData.length > 1}}   
        <ul class="table_tab">        
            {{each tableData value index}}        
                <li class="{{index==0?'active':''}}" style="color:{{fontColor}};background-color:{{bgColor}}">{{value.title}}</li>
            {{/each}} 
         </ul>
   {{/if}}
   
   <div class="tableCont" style="overflow-x:{{realWidth > 960?"auto":"hidden"}}; overflow-y:{{realHeight > 605?"auto":"hidden"}}; ">
     <div class="bg" style="width:{{realWidth}}px;height:{{realHeight}}px;background-color:{{bgColor}};opacity:{{opacity}};filter: Alpha(opacity={{opacity * 100}})"></div>
     <div class="realTableCont" style="width:{{realWidth}}px;height:{{realHeight}}px">
         {{each tableData tableDataItem TableIndex}}
            <table data-idx={{TableIndex}} style="display:{{TableIndex == 0 ? 'table' : 'none'}}">
                <tr>
                    {{each tableData[TableIndex].th thItem thIndex}}
                        <th>{{thItem}}</th>
                    {{/each}}
                </tr>
                {{each tableData[TableIndex].td tdItem tdIndex}}
                <tr>
                    {{each tdItem value index}}
                        <td>{{value}}</td>
                    {{/each}}
                </tr>  
                {{/each}}
            </table>
         {{/each}}
     </div>
    </div>
</div>`


let configHTML = `<div class="editorbox" style="height:500px; overflow-y:scroll">
 <div class="editor_banner editor_common">
     <h1 class="table_img">表格</h1>
     <h4>excel上传&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://t.xcar.com.cn/assets/forexcel/dealerinfo.xls">下载样例</a></h4>
     
     <dl class="clearfix">
         <dt>
             <input value="{{_fileName}}"  disabled="true"  class="" type="text" placeholder="{{imgSrc}}"  data-name="imgSrc">
             <span >X：</span>
         </dt>
         
         <dd id={{picker}} style="position:relative">本地上传</dd>
     </dl>
 
    
     <div class="padTop15">
         <h4>背景色</h4>
         <input placeholder="#ffffff" data-key="bgColor,_bgColor" value="{{_bgColor}}" type="text" class="url_input" >
     </div>
     <i>填写色值 如（#ffffff）</i>
     
     <div class="padTop15">
     <h4>背景透明度</h4>
     <input placeholder="1" data-key="opacity,_opacity" value="{{_opacity}}" type="text" class="url_input" >
     </div>
     <i>填写小于1的数值</i>


     <div class="padTop15">
     <h4>字体颜色</h4>
     <input placeholder="#000000" data-key="fontColor,_fontColor" value="{{_fontColor}}" type="text" class="url_input" >
     </div>
     <i>填写色值 如（#ffffff）</i>

     <div class="padTop15">
     <h4>表格宽度</h4>
     <input placeholder="默认值 960" data-key="realWidth,_realWidth" value="{{_realWidth}}" type="text" class="url_input" >
     </div>
     <i>实际的表格宽度 输入数值 最小宽度960</i>

     <div class="padTop15">
     <h4>表格高度</h4>
     <input placeholder="默认值 605" data-key="realHeight,_realHeight" value="{{_realHeight}}" type="text" class="url_input" >
     </div>
     <i>实际的表格高度 输入数值 最小高度605</i>


     
 </div>
</div>`
let $ele;
tools.register({
    type: "Table4",
    metaData: {
        //html:'<div style="left:{{x}}px; top:{{y}}px;"><h1>{{h1}}</h1></div>',
        html: tuwen1HTML,
        //cssDepends: ['http://localhost:3031/assets/css/table.css'],
        cssDepends: ['http://t.xcar.com.cn/zteditor/assets/css/table.css'],
        jsDepends: ['http://js.xcar.com.cn/source/widgets/jquery-1.12.4.min.js', 'http://t.xcar.com.cn/zteditor/assets/js/table.js'],
        css: '',
        code: ''
    },
    editData: {
        // template:`<div data-type="A"><h1>{{h1}}</h1></div>`,
        template: tuwen1HTML,
        // configTml:`<div><input type="text" value="{{defaultText}}"></div>`
        configTml: configHTML

    },
    getData: function (ele) {
        let data = tools.getValue($(ele))
        console.log(data)
        if (!tools.regHttp(data.url)) {
            return 'false'
        }
        else {
            return data
        }
    },
    ready(ele) {
        setTimeout(() => {
            let dragObj = new DragClass();
            dragObj.init();

            console.log('ready')
        }, 1)
    },
    //右侧配置项结构ready回调
    cReady(ele) {




        console.log('cReady')
        $ele = ele;
        let uploader = new Uploader({
            uploaderOptions: {
                pick: {
                    id: "#demoFilePicker",
                }//上传按钮
                ,
                accept: {
                    title: 'file',
                    extensions: 'xls,xlsx',
                    mimeTypes: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation'
                },
                server: "http://t.xcar.com.cn/index.php?/api/readExcel/dealerexcel"
            }
        }).init();
        uploader.on('uploadSuccess', function (file, response) {

            console.log(response,file)

            if (response.status == "success") {

                let myTable = [];
                var resData = response.data;
                for (var key in resData) {
                    myTable.push(resData[key])
                }
                console.log(JSON.stringify(myTable))
                tools.setValue($ele, Object.assign(
                    { 'tableData': myTable,'fileName': file.name, },
                    {
                        'config': {
                            '_tableData': myTable,
                            '_fileName': file.name
                        },
                        isShowConfig: true,
                        refresh: true
                    }
                ));
            }
            else if(response.status == 'error') {
                alert ('上传表格接口报错！')
            }
        });
    }
});

export default class TestComponent {
    constructor(opt) {
        this.defaults = {
            addBtn: '[data-query="table4_btn"]',
            configBox: '[data-config]',
            uploaderOptions: {
                pick: "demoFilePicker",//上传按钮
            },

        };
        this.options = Object.assign(true, {}, this.defaults, opt)

    }
    init() {
       
        this.bindEvent();
    }
    bindEvent() {
        let _this = this;


        $(doc).off("input.Table4").on("input.Table4", "input[data-key]", function (e) {
            let $ele = $(this).closest(_this.options.configBox);
            let data = $ele.data('data');
            let type = data && data.type

            if (!data || type !== 'Table4') { return }


            let keys = $(this).attr("data-key").split(',');
            tools.setValue($ele, Object.assign(
                { [keys[0]]: this.value },
                {
                    'config': {
                        [keys[keys.length === 1 ? 0 : 1]]: this.value
                    },
                    refresh: true
                }
            ));
        });







        $(doc).on('click', this.options.addBtn, () => {
            console.log('y ',tools.getY,$(document).scrollTop())
            tools.generate({
                type: "Table4",
                url: "###",
                tableData: [
                    {
                        "title": "广东省",
                        "th": [
                            "省份",
                            "城市",
                            "经销商简称",
                            "经销商名称",
                            "经销商地址",
                            "经销商电话"
                        ],
                        "td": [
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ]
                        ]
                    },
                    {
                        "title": "上海省",
                        "th": [
                            "省份",
                            "城市",
                            "经销商简称",
                            "经销商名称",
                            "经销商地址",
                            "经销商电话"
                        ],
                        "td": [
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                            [
                                "测试省份",
                                "测试城市",
                                "测试经销商",
                                "测试经销商",
                                "测试经销商",
                                "020-测试经销商"
                            ],
                        ]
                    }
                ],

                realWidth: '960',
                realHeight: '605',
                bgColor: '',
                fontColor: '',
                opacity: '',
                x: tools.getX,
                y: tools.getY,
                fileName:'',
                config: {//侧右配置项数据                    
                    _url: "",
                    _bgColor: '',
                    _realWidth: '960',
                    _realHeight: '605',
                    _fontColor: '',
                    _opacity: '',
                    _tableData: [
                        {
                            "title": "广东省",
                            "th": [
                                "省份",
                                "城市",
                                "经销商简称",
                                "经销商名称",
                                "经销商地址",
                                "经销商电话"
                            ],
                            "td": [
                                [
                                    "111111111111",
                                    "22222222222",
                                    "3333333333333",
                                    "4444444444444",
                                    "5555555555555",
                                    "020-85553008"
                                ],
                                [
                                    "111111111111",
                                    "22222222222",
                                    "3333333333333",
                                    "4444444444444",
                                    "5555555555555",
                                    "020-85553008"
                                ],
                            ]
                        },
                        {
                            "title": "上海省",
                            "th": [
                                "省份",
                                "城市",
                                "经销商简称",
                                "经销商名称",
                                "经销商地址",
                                "经销商电话"
                            ],
                            "td": [
                                [
                                    "111111111111",
                                    "22222222222",
                                    "3333333333333",
                                    "4444444444444",
                                    "5555555555555",
                                    "020-85553008"
                                ],,
                                [
                                    "111111111111",
                                    "22222222222",
                                    "3333333333333",
                                    "4444444444444",
                                    "5555555555555",
                                    "020-85553008"
                                ],
                            ]
                        }
                    ],
                    picker: _this.options.uploaderOptions.pick,
                    _fileName:''
                }
            }, "append", true);
        });

    }
}

