$(document).ready(function(){
    //获取数据处理
    let dataList = window._xcarData.liuzi2;
    //处理省、市公共数组 S
    function _publicData(pdata){
        let pubList = [];
        for(let key in pdata){
            let obj = {
                proId:key,
                proName:pdata[key]
            };
            pubList.push(obj)
        }
        return pubList;
    }
    //插入DOM公共方法 S
    function _insertPublic(publicList,DOM){
        for(let i = 0; i<publicList.length;i++){
            $(DOM).append("<option value='"+publicList[i].proId+"'>"+publicList[i].proName+"</option>");
        }
    }
    //插入市、经销商、意向车型公共方法
    function _cityDealerCar(publicData){
        let publicList = [];
        for(let key in publicData){
            let obj = {
                proId:key,
                proName:publicData[key]
            };
            publicList.push(obj);
        }
        return publicList
    }
    //判断页面数据显示
    function isThereExistence(){
        if($(".select-pro").length >0 && $(".select-ct").length >0 && $(".select-m").length >0 && $(".select-jxs").length >0){
            //获取省的数据
            $(".select-pro").change(function(){
                //选中省市ID
                let proID = $(this).children('option:selected').val();
                //传到市方法做处理
                gitCtData(proID);
            });
            //接收省市ID查到跟省市有关联的数据存起来
            function gitCtData(proID){
                $(".select-ct option").nextAll().remove();
                $(".select-jxs option").nextAll().remove();
                $(".select-m option").nextAll().remove();
                let ctData = _publicData(dataList.ct);
                for(let i = 0; i < ctData.length;i++){
                    if(proID == ctData[i].proId){
                        let ctList = _publicData(ctData[i].proName);
                        _insertPublic(ctList,'.select-ct');
                    }
                }
            }
            //获取市ID查询经销商
            $(".select-ct").change(function(){
                //选中省市ID
                let ctID = $(this).children('option:selected').val();
                //传到市方法做处理
                getJxsData(ctID);
            });
            //选择市查询经销商
            // function getJxsData(ctID){
            //     $(".select-jxs option").nextAll().remove();
            //     $(".select-m option").nextAll().remove();
            //     let jxsData = _publicData(dataList.jxs);
            //     for(let i = 0; i < jxsData.length;i++){
            //         if(ctID == jxsData[i].proId){
            //             let jxsList = _publicData(jxsData[i].proName);
            //             _insertPublic(jxsList,'.select-jxs');
            //         }
            //     }
            // }
            //购车预算
            // function carPurchaseBudget(){
            //     let carPurchaseData = _publicData(dataList.obym);
            //     _insertPublic(carPurchaseData,'.select-obym');
            // }
            // //选择意向车型的
            // $(".select-jxs").change(function(){
            //     //获取经销商数据
            //     let jxsID = $(this).children('option:selected').val();
            //     //获取意向车型
            //     getIntentionalVehicle(jxsID);
            // });
            // //获取意向车型数据
            // function getIntentionalVehicle(jxsID){
            //     $(".select-m option").nextAll().remove();
            //     let cxData = _publicData(dataList.m);
            //     for(let i = 0; i < cxData.length;i++){
            //         if(jxsID == cxData[i].proId){
            //             let cxList = _publicData(cxData[i].proName);
            //             _insertPublic(cxList,'.select-m');
            //         }
            //     }
            // }
            //立即提交数据
            $('.stay2-consultation-btn').click(function(){
                let data = {
                    userName:$('.user-name').val(),//姓名
                };
            });
            //初始化数据
            function intData(){
                proData();
                // carPurchaseBudget();//购车预算
            }
            //初始化数据
            intData();
            console.log('存在————————————————————————————————————')
        }else{
            if($(".select-pro").length > 0  == false && $(".select-ct").length > 0 == true){
                //初始化市的数据
                getAllDataCity();
                console.log('市区存在————————————————————————————————')
                //选中市区数据
                $(".select-ct").change(function(){
                    //选中省市ID
                    let ctID = $(this).children('option:selected').val();
                    //传到市方法做处理
                    getJxsData(ctID);
                });
                //意向车型
            }else if($(".select-pro").length > 0  == true && $(".select-ct").length > 0 == false){
                console.log('省存在————————————————————————————————')
                proData();
            }else if($(".select-pro").length > 0  == false && $(".select-ct").length > 0 == false){
                console.log('省市都不存在————————————————————————————————')
            }

        }
    }
    //处理省份逻辑
    function proData(){
        let proData = _publicData(dataList.pro);
        _insertPublic(proData,'.select-pro');
    }
    //拿到市的所有数据
    function getAllDataCity(){
        let ct = _cityDealerCar(dataList.ct);
        let ctList = [];
        for(let i = 0;i<ct.length;i++){
            ctList.push(ct[i].proName);
        }
        let shData = [];
        ctList.forEach((v,i)=>{
            Object.keys(v).forEach(v=>{
                let obj = {
                    proId:v,
                    proName:ctList[i][v]
                };
                shData.push(obj);
            })
        });
        //回显市数据
        _insertPublic(shData,'.select-ct');
    }
    //选择市查询经销商
    function getJxsData(ctID){
        $(".select-jxs option").nextAll().remove();
        $(".select-m option").nextAll().remove();
        let jxsData = _publicData(dataList.jxs);
        for(let i = 0; i < jxsData.length;i++){
            if(ctID == jxsData[i].proId){
                let jxsList = _publicData(jxsData[i].proName);
                _insertPublic(jxsList,'.select-jxs');
            }
        }
    }
    //购车预算
    function carPurchaseBudget(){
        let carPurchaseData = _publicData(dataList.obym);
        _insertPublic(carPurchaseData,'.select-obym');
    }
    //选择意向车型的
    $(".select-jxs").change(function(){
        //获取经销商数据
        let jxsID = $(this).children('option:selected').val();
        //获取意向车型
        getIntentionalVehicle(jxsID);
    });
    //获取意向车型数据
    function getIntentionalVehicle(jxsID){
        $(".select-m option").nextAll().remove();
        let cxData = _publicData(dataList.m);
        for(let i = 0; i < cxData.length;i++){
            if(jxsID == cxData[i].proId){
                let cxList = _publicData(cxData[i].proName);
                _insertPublic(cxList,'.select-m');
            }
        }
    }
    //拿到所有经销商数据
    function getDealerData(){
        let jxs = _cityDealerCar(dataList.jxs);
        let jxsList = [];
        for(let i = 0;i<jxs.length;i++){
            jxsList.push(jxs[i].proName);
        }
        let jxsData = [];
        jxsList.forEach((v,i)=>{
            Object.keys(v).forEach(v=>{
                let obj = {
                    proId:v,
                    proName:jxsList[i][v]
                };
                jxsData.push(obj);
            })
        });
        //回显经销商数据
        _insertPublic(jxsData,'.select-jxs');
    }
    //初始化经销商数据
    getDealerData();
    //初始化购车预算
    carPurchaseBudget();
    //初始化判断数据是否存在
    isThereExistence();
});






