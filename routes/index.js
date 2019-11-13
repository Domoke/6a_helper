var express = require('express');
var router = express.Router();

let fs = require('fs');//引入文件读取模块
let path = require('path');//引入文件读取模块
let xlsx = require('node-xlsx'); //引入node-xlsx模块
var request = require('request'); //引入request模块
var async = require("async"); //引入同步处理库

/* GET home page. */
router.get('/', function(req, res, next) {
  const workSheetsFromFile = xlsx.parse(path.join(__dirname,'../myFile.xlsx'));
  const mySheet = workSheetsFromFile[0];
  console.log(mySheet.name);
  var productList  = [];
  var products = [];
  mySheet.data.forEach(function(element, index){
    if(index > 1) {
      if(!element[1].trim()) {return false;} // 如果产品名称为空，终止循环
      var cName = element[1];
      var cInvName = element[1];
      var cMatName = element[1];
      var iPrecision = element[2] + '';
      var cInvSpec = element[5];
      var cSpec  = element[5];

      console.log(cName);
      products.push({
        cName: cName,
        cInvName: cInvName,
        cMatName: cMatName,
        iPrecision: iPrecision,
        cInvSpec: cInvSpec,
        cSpec: cSpec
      }); // 加入产品列表
    }
  });

  var submitUrl = "http://ps-001:8891/A6/pt/submit?pt_control_timecue=";
  
  var accountData = {
    "samewin": null,
    "user": "***",
    "pwd": null,
    "account": "002",
    "date": "2019-11-10",
    "AuthService": "ACS.UserPwdAuth",
    "pt_control_action": "login",
    "pt_control_c_fid": "a6login"
  };

  async.each(products, function(prod, callback){

    var cCode = "000735";

    var session_cookie = ""; // 会话cookie

    var param_data = {
      "operate_menu.autoNewAfterSave": false,
      "cCode": prod.cCode,
      "cName": prod.cName,
      "cUnitClassGUID": null,
      "cUnitGUID": "152033862454026332",
      "iPrecision": prod.iPrecision,
      "cMatCGUID": "686688596884264281",
      "cSpec": prod.cInvSpec,
      "cInvName": prod.cInvName,
      "cInvSpec": prod.cSpec,
      "": null,
      "iBatchFlag": "0",
      "iGuaranteeFlag": "0",
      "iGuaranteePeriod": null,
      "iGuaranteeWarnDays": null,
      "iSubUnit": "0",
      "cStkUnitID": "152033862454026332",
      "cPuUGUID": "152033862454026332",
      "cSaUGUID": "152033862454026332",
      "iMinPurQTY": null,
      "iPurQTY": null,
      "cHotCode": null,
      "iCalWay": "4",
      "iPurchase": "0",
      "iSelf": "0",
      "iOutsource": "0",
      "iAssembly": "0",
      "iServisFlag": "0",
      "iCreatBom": "0",
      "iChangeRateWay": "1",
      "iPUCheck": "0",
      "iMACheck": "0",
      "cEmployeeGUID": "686688596884261715",
      "dCreateDate": "2019-11-11",
      "iStatus": "1",
      "cSpfl": null,
      "cSpflZZSTSGL": null,
      "iTaxRate": "13",
      "ServisFlag": null,
      "Purchase": null,
      "Assembly": null,
      "BatchFlag": null,
      "CreatBom": null,
      "SroutingmarkFlag": null,
      "GuaranteeFlag": null,
      "Outsource": null,
      "Self": null,
      "SNStart": null,
      "selfOrOut": null,
      "helpid": "aisino_common_CM_Material_form",
      "disableMateList": "0",
      "eventFlag": "editnew",
      "visionFlag": "S",
      "STStartupFlag": "false",
      "sysDefRate": null,
      "fileGUID": null,
      "fileName": null,
      "uploadHtmlFlag": null,
      "cMatCode": "005151",
      "cMatName": prod.cMatName,
      "iLeaf": "1",
      "cParentId": "000000",
      "cGuid": null,
      "oldiPrecision": null,
      "cClassGUID": null,
      "iRateFlag": "0",
      "isNewAfterAdd": "true",
      "iValid": "1",
      "iXSSSYHZC": "0",
      "cPURefePriceMethod": "z",
      "cSaRefepricemethod": "z",
      "cWeight": null,
      "cWeightUnit": null,
      "cVolume": null,
      "cVolumeUnit": null,
      "cStoreGUID": null,
      "cPositionGUID": null,
      "cSupGUID": null,
      "cABC": null,
      "cBarCode": null,
      "iBestQTY": null,
      "iTopQTY": null,
      "iLowQTY": null,
      "iRopQTY": null,
      "iRoplotQTY": null,
      "iRopMark": "0",
      "iCtrlStoreQTY": "1",
      "grid1": [],
      "iNoCalCost": "1",
      "grid2": [{
        "cunitname": "个",
        "ichangerate": 1,
        "mainunitname": "个",
        "cunitguid": "152033862454026332",
        "_id": "152033862454026332",
        "_height": 26
      }],
      "cMRPType": null,
      "cPLeadTime": null,
      "cWLeadTime": null,
      "cMLeadTime": null,
      "cSLeadTime": null,
      "iFetchWay": "0",
      "iProductway": "0",
      "IENDBOM": "0",
      "iPieceRate": null,
      "cmDepartment": null,
      "iBatchMaQty": null,
      "sRoutingmark": "0",
      "iSendToDevice": "0",
      "iSNStart": "0",
      "iUniqueNo": "1",
      "iQuntEqu": "0",
      "iCkNo": "0",
      "iRkNo": "0",
      "idigNoCtrl": "0",
      "idigno": "8",
      "iCalFlag": null,
      "matelist": [{
        "cguid": "686688596884265395",
        "typename": "生产厂家",
        "_id": "autoID-20",
        "_height": 26
      }, {
        "cguid": "692850953840064680",
        "typename": "供应商",
        "_id": "autoID-21",
        "_height": 26
      }],
      "cTimeStamp": null,
      "cOrgnID": "1",
      "loginOrgnID": "1",
      "loginAdminOrgnID": "1",
      "isNew": "true",
      "isModified": "true",
      "isModal": "y",
      "iLevel": "1",
      "isRefer": "0",
      "ilowprice": null,
      "ihighprice": null,
      "isalprice": null,
      "iretailprice": null,
      "isalprice1": null,
      "isalprice2": null,
      "isalprice3": null,
      "isalprice4": null,
      "isalprice5": null,
      "isalprice6": null,
      "isalprice7": null,
      "isalprice8": null,
      "isalprice9": null,
      "isalprice10": null,
      "irefprice": null,
      "istandardhour": null,
      "iminprice": null,
      "imaxprice": null,
      "ipurprice": null,
      "ioutsourceprice": null,
      "pt_control_action": "beforeSave",
      "pt_control_c_fid": "aisino_common_CM_Material_Edit_form",
      "pt_control_f_cstate": "editnew"
    };

    var confirm_data = {
      "operate_menu.autoNewAfterSave": false,
      "cCode": cCode,
      "cName": prod.cName,
      "cUnitClassGUID": null,
      "cUnitGUID": "152033862454026332",
      "iPrecision": prod.iPrecision,
      "cMatCGUID": "686688596884264281",
      "cSpec": prod.cInvSpec,
      "cInvName": prod.cInvName,
      "cInvSpec": prod.cSpec,
      "": null,
      "iBatchFlag": "0",
      "iGuaranteeFlag": "0",
      "iGuaranteePeriod": null,
      "iGuaranteeWarnDays": null,
      "iSubUnit": "0",
      "cStkUnitID": "152033862454026332",
      "cPuUGUID": "152033862454026332",
      "cSaUGUID": "152033862454026332",
      "iMinPurQTY": null,
      "iPurQTY": null,
      "cHotCode": null,
      "iCalWay": "4",
      "iPurchase": "0",
      "iSelf": "0",
      "iOutsource": "0",
      "iAssembly": "0",
      "iServisFlag": "0",
      "iCreatBom": "0",
      "iChangeRateWay": "1",
      "iPUCheck": "0",
      "iMACheck": "0",
      "cEmployeeGUID": "686688596884261715",
      "dCreateDate": "2019-11-11",
      "iStatus": "1",
      "cSpfl": null,
      "cSpflZZSTSGL": null,
      "iTaxRate": "13",
      "ServisFlag": null,
      "Purchase": null,
      "Assembly": null,
      "BatchFlag": null,
      "CreatBom": null,
      "SroutingmarkFlag": null,
      "GuaranteeFlag": null,
      "Outsource": null,
      "Self": null,
      "SNStart": null,
      "selfOrOut": null,
      "helpid": "aisino_common_CM_Material_form",
      "disableMateList": "0",
      "eventFlag": "editnew",
      "visionFlag": "S",
      "STStartupFlag": "false",
      "sysDefRate": null,
      "fileGUID": null,
      "fileName": null,
      "uploadHtmlFlag": null,
      "cMatCode": "005151",
      "cMatName": prod.cMatName,
      "iLeaf": "1",
      "cParentId": "000000",
      "cGuid": null,
      "oldiPrecision": null,
      "cClassGUID": null,
      "iRateFlag": "0",
      "isNewAfterAdd": "true",
      "iValid": "1",
      "iXSSSYHZC": "0",
      "cPURefePriceMethod": "z",
      "cSaRefepricemethod": "z",
      "cWeight": null,
      "cWeightUnit": null,
      "cVolume": null,
      "cVolumeUnit": null,
      "cStoreGUID": null,
      "cPositionGUID": null,
      "cSupGUID": null,
      "cABC": null,
      "cBarCode": null,
      "iBestQTY": null,
      "iTopQTY": null,
      "iLowQTY": null,
      "iRopQTY": null,
      "iRoplotQTY": null,
      "iRopMark": "0",
      "iCtrlStoreQTY": "1",
      "grid1": [],
      "iNoCalCost": "1",
      "grid2": [{
        "cunitname": "个",
        "ichangerate": 1,
        "mainunitname": "个",
        "cunitguid": "152033862454026332",
        "_id": "152033862454026332",
        "_height": 26
      }],
      "cMRPType": null,
      "cPLeadTime": null,
      "cWLeadTime": null,
      "cMLeadTime": null,
      "cSLeadTime": null,
      "iFetchWay": "0",
      "iProductway": "0",
      "IENDBOM": "0",
      "iPieceRate": null,
      "cmDepartment": null,
      "iBatchMaQty": null,
      "sRoutingmark": "0",
      "iSendToDevice": "0",
      "iSNStart": "0",
      "iUniqueNo": "1",
      "iQuntEqu": "0",
      "iCkNo": "0",
      "iRkNo": "0",
      "idigNoCtrl": "0",
      "idigno": "8",
      "iCalFlag": null,
      "matelist": [{
        "cguid": "686688596884265395",
        "typename": "生产厂家",
        "_id": "autoID-20",
        "_height": 26
      }, {
        "cguid": "692850953840064680",
        "typename": "供应商",
        "_id": "autoID-21",
        "_height": 26
      }],
      "cTimeStamp": null,
      "cOrgnID": "1",
      "loginOrgnID": "1",
      "loginAdminOrgnID": "1",
      "isNew": "true",
      "isModified": "true",
      "isModal": "y",
      "iLevel": "1",
      "isRefer": "0",
      "ilowprice": null,
      "ihighprice": null,
      "isalprice": null,
      "iretailprice": null,
      "isalprice1": null,
      "isalprice2": null,
      "isalprice3": null,
      "isalprice4": null,
      "isalprice5": null,
      "isalprice6": null,
      "isalprice7": null,
      "isalprice8": null,
      "isalprice9": null,
      "isalprice10": null,
      "irefprice": null,
      "istandardhour": null,
      "iminprice": null,
      "imaxprice": null,
      "ipurprice": null,
      "ioutsourceprice": null,
      "cMatGUID": "",
      "pt_control_action": "UnCtrl",
      "pt_control_c_fid": "aisino_common_CM_Material_Edit_form",
      "pt_control_f_cstate": "editnew"
    };
    
    var save_data = {
      "operate_menu.autoNewAfterSave": false,
      "cCode": cCode,
      "cName": prod.cName,
      "cUnitClassGUID": null,
      "cUnitGUID": "152033862454026332",
      "iPrecision": prod.iPrecision,
      "cMatCGUID": "686688596884264281",
      "cSpec": prod.cInvSpec,
      "cInvName": prod.cInvName,
      "cInvSpec": prod.cSpec,
      "": null,
      "iBatchFlag": "0",
      "iGuaranteeFlag": "0",
      "iGuaranteePeriod": null,
      "iGuaranteeWarnDays": null,
      "iSubUnit": "0",
      "cStkUnitID": "152033862454026332",
      "cPuUGUID": "152033862454026332",
      "cSaUGUID": "152033862454026332",
      "iMinPurQTY": null,
      "iPurQTY": null,
      "cHotCode": null,
      "iCalWay": "4",
      "iPurchase": "0",
      "iSelf": "0",
      "iOutsource": "0",
      "iAssembly": "0",
      "iServisFlag": "0",
      "iCreatBom": "0",
      "iChangeRateWay": "1",
      "iPUCheck": "0",
      "iMACheck": "0",
      "cEmployeeGUID": "686688596884261715",
      "dCreateDate": "2019-11-11",
      "iStatus": "1",
      "cSpfl": null,
      "cSpflZZSTSGL": null,
      "iTaxRate": "13",
      "ServisFlag": null,
      "Purchase": null,
      "Assembly": null,
      "BatchFlag": null,
      "CreatBom": null,
      "SroutingmarkFlag": null,
      "GuaranteeFlag": null,
      "Outsource": null,
      "Self": null,
      "SNStart": null,
      "selfOrOut": null,
      "helpid": "aisino_common_CM_Material_form",
      "disableMateList": "0",
      "eventFlag": "editnew",
      "visionFlag": "S",
      "STStartupFlag": "false",
      "sysDefRate": null,
      "fileGUID": null,
      "fileName": null,
      "uploadHtmlFlag": null,
      "cMatCode": "005151",
      "cMatName": prod.cMatName,
      "iLeaf": "1",
      "cParentId": "000000",
      "cGuid": null,
      "oldiPrecision": null,
      "cClassGUID": null,
      "iRateFlag": "0",
      "isNewAfterAdd": "true",
      "iValid": "1",
      "iXSSSYHZC": "0",
      "cPURefePriceMethod": "z",
      "cSaRefepricemethod": "z",
      "cWeight": null,
      "cWeightUnit": null,
      "cVolume": null,
      "cVolumeUnit": null,
      "cStoreGUID": null,
      "cPositionGUID": null,
      "cSupGUID": null,
      "cABC": null,
      "cBarCode": null,
      "iBestQTY": null,
      "iTopQTY": null,
      "iLowQTY": null,
      "iRopQTY": null,
      "iRoplotQTY": null,
      "iRopMark": "0",
      "iCtrlStoreQTY": "1",
      "grid1": [],
      "iNoCalCost": "1",
      "grid2": [{
        "cunitname": "个",
        "ichangerate": 1,
        "mainunitname": "个",
        "cunitguid": "152033862454026332",
        "_id": "152033862454026332",
        "_height": 26
      }],
      "cMRPType": null,
      "cPLeadTime": null,
      "cWLeadTime": null,
      "cMLeadTime": null,
      "cSLeadTime": null,
      "iFetchWay": "0",
      "iProductway": "0",
      "IENDBOM": "0",
      "iPieceRate": null,
      "cmDepartment": null,
      "iBatchMaQty": null,
      "sRoutingmark": "0",
      "iSendToDevice": "0",
      "iSNStart": "0",
      "iUniqueNo": "1",
      "iQuntEqu": "0",
      "iCkNo": "0",
      "iRkNo": "0",
      "idigNoCtrl": "0",
      "idigno": "8",
      "iCalFlag": null,
      "matelist": [{
        "cguid": "686688596884265395",
        "typename": "生产厂家",
        "_id": "autoID-20",
        "_height": 26
      }, {
        "cguid": "692850953840064680",
        "typename": "供应商",
        "_id": "autoID-21",
        "_height": 26
      }],
      "cTimeStamp": null,
      "cOrgnID": "1",
      "loginOrgnID": "1",
      "loginAdminOrgnID": "1",
      "isNew": "true",
      "isModified": "true",
      "isModal": "y",
      "iLevel": "1",
      "isRefer": "0",
      "ilowprice": null,
      "ihighprice": null,
      "isalprice": null,
      "iretailprice": null,
      "isalprice1": null,
      "isalprice2": null,
      "isalprice3": null,
      "isalprice4": null,
      "isalprice5": null,
      "isalprice6": null,
      "isalprice7": null,
      "isalprice8": null,
      "isalprice9": null,
      "isalprice10": null,
      "irefprice": null,
      "istandardhour": null,
      "iminprice": null,
      "imaxprice": null,
      "ipurprice": null,
      "ioutsourceprice": null,
      "pt_control_action": "save",
      "pt_control_c_fid": "aisino_common_CM_Material_Edit_form",
      "pt_control_f_cstate": "editnew"
    };

    var query_code_data = {
      "operate_menu.autoNewAfterSave": false,
      "cCode": null,
      "cName": null,
      "cUnitClassGUID": null,
      "cUnitGUID": null,
      "iPrecision": "2",
      "cMatCGUID": "686688596884264281",
      "cSpec": null,
      "cInvName": null,
      "cInvSpec": null,
      "": null,
      "iBatchFlag": "0",
      "iGuaranteeFlag": "0",
      "iGuaranteePeriod": null,
      "iGuaranteeWarnDays": null,
      "iSubUnit": "0",
      "cStkUnitID": null,
      "cPuUGUID": null,
      "cSaUGUID": null,
      "iMinPurQTY": null,
      "iPurQTY": null,
      "cHotCode": null,
      "iCalWay": "1",
      "iPurchase": "0",
      "iSelf": "0",
      "iOutsource": "0",
      "iAssembly": "0",
      "iServisFlag": "0",
      "iCreatBom": "0",
      "iChangeRateWay": "1",
      "iPUCheck": "0",
      "iMACheck": "0",
      "cEmployeeGUID": "686688596884261715",
      "dCreateDate": "2019-11-13",
      "iStatus": "1",
      "cSpfl": null,
      "cSpflZZSTSGL": null,
      "iTaxRate": "16",
      "ServisFlag": null,
      "Purchase": null,
      "Assembly": null,
      "BatchFlag": null,
      "CreatBom": null,
      "SroutingmarkFlag": null,
      "GuaranteeFlag": null,
      "Outsource": null,
      "Self": null,
      "SNStart": null,
      "selfOrOut": null,
      "helpid": "aisino_common_CM_Material_form",
      "disableMateList": "0",
      "eventFlag": "editnew",
      "visionFlag": "S",
      "STStartupFlag": "false",
      "sysDefRate": null,
      "fileGUID": null,
      "fileName": null,
      "uploadHtmlFlag": null,
      "cMatCode": null,
      "cMatName": null,
      "iLeaf": "1",
      "cParentId": "000000",
      "cGuid": null,
      "oldiPrecision": null,
      "cClassGUID": null,
      "iRateFlag": null,
      "isNewAfterAdd": null,
      "iValid": null,
      "iXSSSYHZC": "0",
      "cPURefePriceMethod": "f",
      "cSaRefepricemethod": "f",
      "cWeight": null,
      "cWeightUnit": null,
      "cVolume": null,
      "cVolumeUnit": null,
      "cStoreGUID": null,
      "cPositionGUID": null,
      "cSupGUID": null,
      "cABC": null,
      "cBarCode": null,
      "iBestQTY": null,
      "iTopQTY": null,
      "iLowQTY": null,
      "iRopQTY": null,
      "iRoplotQTY": null,
      "iRopMark": "0",
      "iCtrlStoreQTY": "1",
      "grid1": [],
      "iNoCalCost": "1",
      "grid2": [],
      "cMRPType": null,
      "cPLeadTime": null,
      "cWLeadTime": null,
      "cMLeadTime": null,
      "cSLeadTime": null,
      "iFetchWay": "0",
      "iProductway": "0",
      "IENDBOM": "0",
      "iPieceRate": null,
      "cmDepartment": null,
      "iBatchMaQty": null,
      "sRoutingmark": "0",
      "iSendToDevice": "0",
      "iSNStart": "0",
      "iUniqueNo": "1",
      "iQuntEqu": "0",
      "iCkNo": "0",
      "iRkNo": "0",
      "idigNoCtrl": "0",
      "idigno": "8",
      "iCalFlag": null,
      "matelist": [{
        "cguid": "686688596884265395",
        "typename": "生产厂家",
        "_id": "autoID-16",
        "_height": 26
      }, {
        "cguid": "692850953840064680",
        "typename": "供应商",
        "_id": "autoID-17",
        "_height": 26
      }],
      "cTimeStamp": null,
      "cOrgnID": null,
      "loginOrgnID": "1",
      "loginAdminOrgnID": "1",
      "isNew": "false",
      "isModified": "false",
      "isModal": "y",
      "iLevel": "1",
      "isRefer": "0",
      "ilowprice": null,
      "ihighprice": null,
      "isalprice": null,
      "iretailprice": null,
      "isalprice1": null,
      "isalprice2": null,
      "isalprice3": null,
      "isalprice4": null,
      "isalprice5": null,
      "isalprice6": null,
      "isalprice7": null,
      "isalprice8": null,
      "isalprice9": null,
      "isalprice10": null,
      "irefprice": null,
      "istandardhour": null,
      "iminprice": null,
      "imaxprice": null,
      "ipurprice": null,
      "ioutsourceprice": null,
      "conValue": "686688596884264281",
      "pt_control_action": "getCode",
      "pt_control_c_fid": "aisino_common_CM_Material_Edit_form",
      "pt_control_f_cstate": "editnew",
      "pt_control_inloading": true
    };

    async.waterfall([
      loginFunc, 
      getCodeFunc,
      submitFunc, 
      confirmFunc,
      saveFunc
    ], function(err, result){
      if(!err && result) {
        console.log(result);
        console.log("导入" + cName + "成功");
        productList.push({name: prod.cName,result:"成功！"}); // 加入产品列表
        callback(null, result);
      } else {
        console.log(err);
        console.log(result);
        console.log("导入失败");
        console.log(productList);
        callback(null, result);
      }
    });

    // 登录
    function loginFunc(callback) {
      request.post({
        url: submitUrl  + new Date().getTime(), 
        headers: {
          'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
          },
        form:{
          data: JSON.stringify(accountData),
          formid: 'a6login',
          type: 'submit'
        }
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if(body.indexOf('var n=window.open') > -1) {
            console.log("登录成功!");
            session_cookie = response.headers['set-cookie'];
            callback(null, true);
          } else {
            console.log("登录失败!!!");
            callback(null, false);
          }
        } else {
          console.log(error);
          callback(null, false);
        }
      });
    }

    // 获取产品Code
    function getCodeFunc(result, callback) {
      if(!result) {
        return callback(null, result);
      }
      // 获取最新的code
      request.post({
        url: submitUrl + new Date().getTime(), 
        headers: {
          'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
          Cookie: session_cookie, //这里是登陆后得到的cookie,(重点)
        },
        form:{
          data: JSON.stringify(query_code_data),
          formid: 'aisino_common_CM_Material_Edit_form',
          type: 'submit'
        }
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
          var result = body.split("\"")[1];
          console.log("产品编码=>" + result);
          param_data.cCode = result;
          confirm_data.cCode = result;
          save_data.cCode = result;
          callback(null, true);
        } else {
          console.log(error);
          callback(null, false);
        }
      });
    }

    // 初次提交
    function submitFunc(result, callback) {
      if(!result) {
        return callback(null, result);
      }
      request.post({
        url: submitUrl + new Date().getTime(), 
        headers: {
          'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
          Cookie: session_cookie, //这里是登陆后得到的cookie,(重点)
        },
        form:{
          data: JSON.stringify(param_data),
          formid: 'aisino_common_CM_Material_Edit_form',
          type: 'submit'
        }
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
          var result = /^\{/.test(body.split(";")[0])?JSON.parse(body):JSON.parse(body.split("=")[1].split(";")[0]);
          console.log(result);
          console.log(result.sucFlag == "true");
          if(result.sucFlag == "true") {
            productList.push({name:prod.cName, result:result.msg});
            console.log("初次提交失败");
            callback(null, false);
          } else {
            console.log("初次提交成功");
            callback(null, true);
          }
        } else {
          console.log(error);
          callback(null, false);
        }
      });
    }

    // 二次提交
    function confirmFunc(result, callback) {
      if(!result) {
        return callback(null, result);
      }
      request.post({
        url: submitUrl + new Date().getTime(), 
        headers: {
          'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
          Cookie: session_cookie
        },
        form:{
          data: JSON.stringify(confirm_data),
          formid: 'aisino_common_CM_Material_Edit_form',
          type: 'submit'
        }
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // 请求成功的处理逻辑  
          callback(null, true);
        } else {
          console.log(error);
          callback(null, false);
        }
      });
    
    
    }

    // 保存
    function saveFunc(result, callback) {
      if(!result) {
        return callback(null, result);
      }
      request.post({
        url: submitUrl, 
        headers: {
          'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
          Cookie: session_cookie
        },
        form:{
          data: JSON.stringify(save_data),
          formid: 'aisino_common_CM_Material_Edit_form',
          type: 'submit'
        }
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // 请求成功的处理逻辑  
          callback(null, true);
        } else {
          console.log(error);
          callback(null, false);
        }
      });
    }
  }, function(err){
    res.render('index', { title: "A6助手", products: productList });
  });

  
});

module.exports = router;
