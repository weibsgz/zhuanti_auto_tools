import Main from 'main';
//import './common/scale';
import '../assets/css/common.scss'
import '../assets/css/editor.scss'
import Button from './components/button';
import Banner from './components/banner';
import Title from './components/title';
import TuWen1 from './components/tuwen1.component'
import TuWen2 from './components/tuwen2.component'
import TuWen3 from './components/tuwen3.component'
import TuWen4 from './components/tuwen4.component'
import Table4Component from './components/table.component' 
import ComponentMap from 'componentMap';
import focusMap3 from './components/focus.map.component3';//3D焦点图-lty
import focusMap1 from './components/focus.map.component1';//增加文字配置的焦点图-lty
import focusMap2 from './components/focus.map.component2';//增加文字配置的焦点图-lty
import liuzi1 from './components/liuzi1.component';//生成留咨询-lty 1
import liuzi2 from './components/liuzi2.component';//生成留咨询-lty 2
import liuzi3 from './components/liuzi3.component';//生成留咨询-lty 3

import Tab from "./components/tab.component";
import '../assets/js/drag';
import 'jqueryUi';
import VideoComponentBig from './components/videoBig.component';//大播放器
import VideoComponentSmall from './components/videoSmall.component';//小播放器

import ImgUploadDemo from './components/imgUploadDemo';
import ImgUploadCommonDemo from './components/imgUploadCommonDemo';
import './components/bg.component';
new Main().init();
new Button().init();
new Banner().init();
new Title().init();
//初始化大播放器组件
new VideoComponentBig().init();
//初始化小播放器组件
new VideoComponentSmall().init();
new TuWen1().init();
new TuWen2().init();
new TuWen3().init();
new TuWen4().init();
//生成带问题的轮播图-lty
new focusMap1().init();
//焦点图2
new focusMap2().init();
//生成3D焦点图-lty
new focusMap3().init();
//生成留咨询1-lty
//new liuzi1().init();
//生成留咨询2-lty
new liuzi2().init();
//生成留咨询3-lty
new liuzi3().init();
//图片上传demo
new ImgUploadDemo().init();
new ImgUploadCommonDemo().init();

new Tab().init();


//表格
new Table4Component().init();



