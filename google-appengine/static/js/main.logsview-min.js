var logsView={v:{tableId:"logsViewTable",listTableId:"logsViewList",webCrawlerId:null,PER_PAGE_ITEMS:20,cur_page:0,prevOffset:new Array(),readFileName:null,readStartPoint:0,autoRefreshFun:null,scrollLock:false,isReverse:false,newestPoint:0},fn:{init:function(){logsView.v.readFileName=null;logsView.v.readStartPoint=0;logsView.v.isReverse=false;logsView.v.newestPoint=0;logsView.v.cur_page=0;logsView.v.prevOffset[0]="";logsView.fn.query(0,null)},prev:function(a){offset=logsView.v.prevOffset[a];logsView.fn.query(a,offset)},next:function(a,b){logsView.v.prevOffset[a]=b;logsView.fn.query(a,b)},query:function(cur_page,offset){logsView.v.cur_page=cur_page;jsonrpc.appLogsService.query(function(result,exception,profile){removeLoading($("#"+logsView.v.tableId));if(exception){return}moveAllTr(logsView.v.tableId+" #"+logsView.v.listTableId);var data=eval("("+result+")");logsView.fn.showData(data.list);logsView.fn.initPagination(logsView.v.cur_page,data.hasNext,data.nextOffset,data.count)},logsView.v.webCrawlerId,logsView.v.PER_PAGE_ITEMS,offset)},closeLog:function(){logsView.v.scrollLock=false;logsView.v.readStartPoint=0;if(logsView.v.autoRefreshFun!=null){clearInterval(logsView.v.autoRefreshFun)}},readLogFile:function(a){logsView.v.scrollLock=false;logsView.v.readStartPoint=0;if(logsView.v.autoRefreshFun!=null){clearInterval(logsView.v.autoRefreshFun)}$("#log-box-file").dialog("open");$("#log-box-file #log").html("");$(".ui-dialog-buttonpane .ui-dialog-buttonset .reverseLogHtml").remove();$(".ui-dialog-buttonpane .ui-dialog-buttonset .autoRefreshHtml").remove();$(".ui-dialog-buttonpane .ui-dialog-buttonset .scrollLockHtml").remove();var c='<span class="reverseLogHtml" style="padding-right: 8px;"><input name="reverseLog" type="checkbox" id="reverseLog" value="true" onclick="logsView.fn.reverseLog(this.checked)" class="jfk-checkbox"> <a class="tooltip" style="font-weight:normal;" title="Reverse display log" href="javascript:void(0);">Reverse</a></span>';var b='<span class="autoRefreshHtml" style="padding-right: 8px;"><input name="autoRefresh" type="checkbox" id="autoRefresh" value="true" onclick="logsView.fn.autoRefresh(this.checked)" class="jfk-checkbox"> <a class="tooltip" style="font-weight:normal;" title="Show Console When Standard Out Changes" href="javascript:void(0);">Auto Refresh</a></span>';var d='<span class="scrollLockHtml" style="padding-right: 8px;"><input name="scrollLock" type="checkbox" id="scrollLock" value="true" onclick="logsView.fn.scrollLock(this.checked)" class="jfk-checkbox"> <a class="tooltip" style="font-weight:normal;" title="Scroll Lock" href="javascript:void(0);">Scroll Lock</a></span>';$("#log-box-file").parent().find(".ui-dialog-buttonpane .ui-dialog-buttonset").prepend(c);$("#log-box-file").parent().find(".ui-dialog-buttonpane .ui-dialog-buttonset").prepend(b);$("#log-box-file").parent().find(".ui-dialog-buttonpane .ui-dialog-buttonset").prepend(d);logsView.v.readFileName=a;logsView.v.readStartPoint=0;jsonrpc.appLogsService.readLogFilePointer(function(e,f,g){if(f){return}logsView.v.newestPoint=e;logsView.fn.readFileNext()},logsView.v.webCrawlerId,logsView.v.readFileName)},scrollLock:function(a){logsView.v.scrollLock=a;if(!logsView.v.scrollLock){$("#log-box-file").animate({scrollTop:$("#log-box-file #log")[0].scrollHeight},0)}},reverseLog:function(a){$("#log-box-file #log").html("");if(a){jsonrpc.appLogsService.readLogFilePointer(function(b,c,d){if(c){return}logsView.v.isReverse=true;logsView.v.readStartPoint=b;logsView.v.newestPoint=b},logsView.v.webCrawlerId,logsView.v.readFileName)}else{logsView.v.isReverse=false}},autoRefresh:function(a){if(a){logsView.v.autoRefreshFun=setInterval(function(){logsView.fn.loadNewerLogs()},1500)}else{clearInterval(logsView.v.autoRefreshFun)}},loadNewerLogs:function(){jsonrpc.appLogsService.readLogFilePointer(function(result,exception,profile){if(exception){return}if(logsView.v.newestPoint>=result){return}var startPoint=result;var endPoint=logsView.v.newestPoint;if(!logsView.v.isReverse){startPoint=logsView.v.newestPoint;endPoint=result}logsView.v.newestPoint=result;jsonrpc.appLogsService.readLogFile(function(result,exception,profile){removeLoading($("#"+logsView.v.tableId));if(exception){return}var data=eval("("+result+")");var content=data.content;if(content==null||content==""){return}$("#log-box-file #log").find("pre").removeClass("heightlight");var contentObj=$(content);contentObj.addClass("heightlight");var scrollTop=0;if(!logsView.v.isReverse){$("#log-box-file #log").append(contentObj);scrollTop=$("#log-box-file #log")[0].scrollHeight}else{$("#log-box-file #log").prepend(contentObj)}if(!logsView.v.scrollLock){$("#log-box-file").animate({scrollTop:scrollTop},0)}},logsView.v.webCrawlerId,logsView.v.readFileName,50,startPoint,endPoint,logsView.v.isReverse)},logsView.v.webCrawlerId,logsView.v.readFileName)},readFileNext:function(){jsonrpc.appLogsService.readLogFile(function(result,exception,profile){removeLoading($("#"+logsView.v.tableId));if(exception){return}var data=eval("("+result+")");logsView.v.readStartPoint=data.nextOffset;var content=data.content;if(content==null||content==""){return}$("#log-box-file #log").find("pre").removeClass("heightlight");var contentObj=$(content);contentObj.addClass("heightlight");$("#log-box-file #log").append(contentObj);var scrollTop=$("#log-box-file #log")[0].scrollHeight;if(!logsView.v.scrollLock){$("#log-box-file").animate({scrollTop:scrollTop},0)}},logsView.v.webCrawlerId,logsView.v.readFileName,50,logsView.v.readStartPoint,-1,logsView.v.isReverse)},showData:function(e){var b=1;for(var c in e){if(isNaN(c)){continue}var a="<tr class='simplehighlight'>";a+="<td nowrap>"+b+"</td>";if(e[c]["isFile"]){var f=getWebCrawlerUrl();var d=f+"logs";a+="<td nowrap>&nbsp; <a href='javascript:void(0);' onclick='logsView.fn.readLogFile(\""+e[c]["message"]+"\")'>"+e[c]["message"]+"</a>&nbsp; &nbsp; </td>"}else{a+="<td nowrap><pre style='white-space: pre-wrap;word-wrap: break-word;'> "+e[c]["message"]+"</pre> </td>"}a+="<td nowrap  style='text-align: right;  padding-right: 30px;'>&nbsp; "+e[c]["length"]+"&nbsp; </td>";a+="<td nowrap  style='text-align: center;'>&nbsp; "+e[c]["createDate"]+"&nbsp;&nbsp; </td>";a+="</tr>";b++;$(a).appendTo("#"+logsView.v.tableId+" #"+logsView.v.listTableId)}$("#"+logsView.v.tableId).find("#"+logsView.v.listTableId).find("tr:odd").css("background","#FFFFFF");$("#"+logsView.v.tableId).find("#"+logsView.v.listTableId).find("tr:even").css("background","rgb(247, 247, 247)");$("#"+logsView.v.tableId).find("#"+logsView.v.listTableId).find(".simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})},initPagination:function(c,a,h,f){var i='<div class="ae-paginate">';if(c==0){i+='<span class="ae-disabled ae-paginate-prev">‹ Prev '+logsView.v.PER_PAGE_ITEMS+"</span>"}else{var d=c-1;i+='<span class="ae-paginate-prev ae-action" onclick="logsView.fn.prev('+d+')">‹ Prev '+logsView.v.PER_PAGE_ITEMS+"</span>"}var b=logsView.v.PER_PAGE_ITEMS*c+1;var g=logsView.v.PER_PAGE_ITEMS*c+f;i+="<strong>"+b+"-"+g+"</strong>";if(a){var e=c+1;i+='<span class="ae-paginate-next ae-action" onclick="logsView.fn.next('+e+",'"+h+"')\">Next "+logsView.v.PER_PAGE_ITEMS+" ›</span>"}else{i+='<span class="ae-disabled ae-paginate-next">Next '+logsView.v.PER_PAGE_ITEMS+" ›</span>"}i+="</div>";$("#"+logsView.v.tableId).find("#Pagination").html(i)}}};