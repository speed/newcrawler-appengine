var systemConfig={v:{formId:"systemConfigForm",},fn:{sync:function(){var a=$("#"+systemConfig.v.formId).find("input[name='system.property.sync.ip']").val();var b=jsonrpc.syncFullService.sync(a);if(b){showInfo("已启动同步任务。")}else{showInfo("同步失败。")}},query:function(){var data=jsonrpc.systemService.query();data="("+data+")";data=eval(data);selectRadio(systemConfig.v.formId,"system.property.sync",data["system.property.sync"]);selectRadio(systemConfig.v.formId,"system.property.sync.as",data["system.property.sync.as"]);$("#"+systemConfig.v.formId).find("input[name='system.property.sync.ip']").val(data["system.property.sync.ip"]==null?"":data["system.property.sync.ip"]);$("#"+systemConfig.v.formId).find("input[name='system.property.sync.self']").val(data["system.property.sync.self"]==null?"":data["system.property.sync.self"]);selectRadio(systemConfig.v.formId,"system.property.invite",data["system.property.invite"]);$("#"+systemConfig.v.formId).find("select[name='system.property.location']").val(data["system.property.location"]==null?"":data["system.property.location"]);$("#"+systemConfig.v.formId).find("input[name='system.property.installUrl']").val(data["system.property.installUrl"]==null?"":data["system.property.installUrl"]);$("#"+systemConfig.v.formId).find("input[name='system.property.jsConnectClientID']").val(data["system.property.jsConnectClientID"]==null?"":data["system.property.jsConnectClientID"]);$("#"+systemConfig.v.formId).find("input[name='system.property.jsConnectSecret']").val(data["system.property.jsConnectSecret"]==null?"":data["system.property.jsConnectSecret"]);$("#"+systemConfig.v.formId).find("input[name='system.property.smtpHost']").val(data["system.property.smtpHost"]==null?"":data["system.property.smtpHost"]);$("#"+systemConfig.v.formId).find("input[name='system.property.smtpPort']").val(data["system.property.smtpPort"]==null?"":data["system.property.smtpPort"]);$("#"+systemConfig.v.formId).find("input[name='system.property.smtpUsername']").val(data["system.property.smtpUsername"]==null?"":data["system.property.smtpUsername"]);$("#"+systemConfig.v.formId).find("input[name='system.property.smtpPassword']").val(data["system.property.smtpPassword"]==null?"":data["system.property.smtpPassword"]);$("#"+systemConfig.v.formId).find("input[name='system.property.email']").val(data["system.property.email"]==null?"":data["system.property.email"]);$("#"+systemConfig.v.formId).find("input[name='system.property.appurl']").val(data["system.property.appurl"]==null?"":data["system.property.appurl"]);removeLoading($("#"+systemConfig.v.formId))},save:function(){var b={};b["system.property.sync"]=getRadio(systemConfig.v.formId,"system.property.sync");b["system.property.sync.as"]=getRadio(systemConfig.v.formId,"system.property.sync.as");b["system.property.sync.ip"]=$("#"+systemConfig.v.formId).find("input[name='system.property.sync.ip']").val();b["system.property.sync.self"]=$("#"+systemConfig.v.formId).find("input[name='system.property.sync.self']").val();b["system.property.location"]=$("#"+systemConfig.v.formId).find("select[name='system.property.location']").val();b["system.property.invite"]=getRadio(systemConfig.v.formId,"system.property.invite");b["system.property.installUrl"]=$("#"+systemConfig.v.formId).find("input[name='system.property.installUrl']").val();b["system.property.jsConnectClientID"]=$("#"+systemConfig.v.formId).find("input[name='system.property.jsConnectClientID']").val();b["system.property.jsConnectSecret"]=$("#"+systemConfig.v.formId).find("input[name='system.property.jsConnectSecret']").val();b["system.property.smtpHost"]=$("#"+systemConfig.v.formId).find("input[name='system.property.smtpHost']").val();b["system.property.smtpPort"]=$("#"+systemConfig.v.formId).find("input[name='system.property.smtpPort']").val();b["system.property.smtpUsername"]=$("#"+systemConfig.v.formId).find("input[name='system.property.smtpUsername']").val();b["system.property.smtpPassword"]=$("#"+systemConfig.v.formId).find("input[name='system.property.smtpPassword']").val();b["system.property.email"]=$("#"+systemConfig.v.formId).find("input[name='system.property.email']").val();b["system.property.appurl"]=$("#"+systemConfig.v.formId).find("input[name='system.property.appurl']").val();var a=$.toJSON(b);var c=jsonrpc.systemService.save(a);if(c){showInfo("保存成功。")}else{showInfo("保存失败。")}},changeEmail:function(a){$("#"+systemConfig.v.formId).find("input[name='system.property.smtpHost']").val("");$("#"+systemConfig.v.formId).find("input[name='system.property.smtpPort']").val("465");if(a=="gmail"){$("#"+systemConfig.v.formId).find("input[name='system.property.smtpHost']").val("smtp.gmail.com");$("#"+systemConfig.v.formId).find("input[name='system.property.smtpUsername']").val("@gmail.com")}else{if(a=="qq"){$("#"+systemConfig.v.formId).find("input[name='system.property.smtpHost']").val("smtp.qq.com");$("#"+systemConfig.v.formId).find("input[name='system.property.smtpUsername']").val("@qq.com")}else{if(a=="163"){$("#"+systemConfig.v.formId).find("input[name='system.property.smtpHost']").val("smtp.163.com");$("#"+systemConfig.v.formId).find("input[name='system.property.smtpUsername']").val("@163.com")}}}}}};$(document).ready(function(){systemConfig.fn.query();poshytip(".tooltip")});