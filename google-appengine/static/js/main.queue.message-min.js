var queueMessage={v:{formId:"queueMessageForm",tableId:"queueMessageTable",queueName:null,webCrawlerId:null,PER_PAGE_ITEMS:10,ITEMS_COUNT:0,cur_page:0,jsonBody:null},fn:{init:function(a,b){queueMessage.v.webCrawlerId=webCrawlerId;queueMessage.v.ITEMS_COUNT=b;queueMessage.v.queueName=a;$("#"+queueMessage.v.formId).find("#QUEUEMESSAGE_COUNT").html(queueMessage.v.ITEMS_COUNT);queueMessage.fn.updateCount();$("#"+queueMessage.v.formId).find(".statistic").click(function(){queueMessage.fn.statistic()})},statistic:function(){showLoading($("#"+queueMessage.v.formId));jsonrpc.crawlQueueService.statistic(function(a,b,c){removeLoading($("#"+queueMessage.v.formId));if(b){return}var d=a;if(d){showInfo(nc.i18n("res.background.statistics"))}else{showInfo(nc.i18n("res.background.statistics.failure"))}},queueMessage.v.webCrawlerId,queueMessage.v.queueName)},updateCount:function(){showLoading($("#"+queueMessage.v.formId));jsonrpc.crawlQueueService.count(function(a,b,c){removeLoading($("#"+queueMessage.v.formId));if(b){return}queueMessage.v.ITEMS_COUNT=a;queueMessage.fn.query();queueMessage.fn.initPagination(queueMessage.v.cur_page);$("#"+queueMessage.v.formId).find("#QUEUEMESSAGE_COUNT").html(queueMessage.v.ITEMS_COUNT)},queueMessage.v.webCrawlerId,queueMessage.v.queueName)},query:function(){var startIndex=queueMessage.v.cur_page*queueMessage.v.PER_PAGE_ITEMS;moveAllTr(queueMessage.v.tableId);queryLoading(queueMessage.v.formId);jsonrpc.crawlQueueService.findMessage(function(result,exception,profile){if(exception){removeLoading($("#"+queueMessage.v.formId));return}var data=result;data=eval(data);queueMessage.fn.showData(data);removeLoading($("#"+queueMessage.v.formId))},queueMessage.v.webCrawlerId,queueMessage.v.queueName,startIndex,queueMessage.v.PER_PAGE_ITEMS)},showData:function(e){queueMessage.v.queueJson=e;for(var f in e){if(isNaN(f)){continue}var b=e[f]["id"];var j=e[f]["createDate"];var k=e[f];var g=k.topic;var d=k.queueName;var a=k.method;var c=k.queuePath;var h=k.queueKey;var k=k.message;queueMessage.fn.addRow(b,j,g,d,a,c,h,k)}$("#"+queueMessage.v.tableId).find("textarea").dblclick(function(){queueMessage.v.jsonBody=$(this).val();window.open("../tools/jsonFormater.html","jsonFormater","height=680, width=1024")})},addRow:function(b,h,e,d,a,c,f,i){var g="<tr class='simplehighlight'>";g+="<td nowrap>"+e+"</td>";g+="<td nowrap>"+d+"</td>";g+="<td nowrap>"+f+"</td>";g+="<td nowrap>"+h+"</td>";g+='<td nowrap><textarea style="width: 100%;">'+JSON.stringify(i)+"</textarea></td>";g+="</tr>";$(g).appendTo("#"+queueMessage.v.tableId);$("#"+queueMessage.v.tableId+" tr:even").css("background","#EEE");$("#"+queueMessage.v.tableId+" tr:odd").css("background","#FFFFFF");$("#"+queueMessage.v.tableId+" .simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})},initPagination:function(a){$("#"+queueMessage.v.formId).find("#Pagination").pagination(queueMessage.v.ITEMS_COUNT,{num_edge_entries:2,num_display_entries:8,current_page:a,callback:queueMessage.fn.pageselectCallback,items_per_page:queueMessage.v.PER_PAGE_ITEMS,prev_text:nc.i18n("res.page.prev"),next_text:nc.i18n("res.page.next")})},pageselectCallback:function(a,b){queueMessage.v.cur_page=a;showLoading($("#"+queueMessage.v.formId));queueMessage.fn.query();return false}}};function getJsonContent(){return queueMessage.v.jsonBody};