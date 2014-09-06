$(document).ready(function(){
// 焦点自动在搜索框
$("#searchtext").focus();

// 初始化click事件
$("#searchsubmit").click();
var tabnum = $(".closeico").length;
var lastestid,lastestidname;
// 获取最后一个元素的地址
var get_lastestidname = function(){
	lastestid = 0;
	if (($("#myTab li:last a").attr("href") == undefined)) {lastestid = 0}
	else{ lastestid = parseInt( $("#myTab li:last a").attr("href").split(/#search(\d+)/)[1]);};
	 
	 
	 lastestidname = "#myTab a[href=\"#search"+lastestid+"\"]";
}
//点击关闭事件
$(document).on('click',".closeico",function(e){
	e.stopPropagation();
	get_lastestidname();
	var parentli = $(this).parent().parent();
	// 获取本元素地址编号
	var parliindex =parseInt( $(this).parent().attr("href").split(/#search(\d+)/)[1]);	
	var delconid = "#search"+parliindex;
	// var nextid = "#search"+(parliindex+1);
	
	if(parliindex == lastestid)
		 {		 	
		 	// 如果关闭的是最后一个标签，那么接着显示上一个标签，否则显示下一个标签
		 	var nextaname = parentli.prev("li").children('a');
		 }
	else{
		var nextaname = parentli.next("li").children('a');
	}
	// 项目删除
	$(delconid).remove();
	if(delconid){$(delconid).remove();}
	parentli.remove();
	//切换显示标签
	$(nextaname).tab('show');	
});
// 回车搜索功能
$('#searchtext').on('keyup', function(e){  
    var ev = document.all?window.event:e;  
    if(ev.keyCode === 13){  
        $("#searchsubmit").click();  
    }  
}).on('keydown', function(e){  
    var ev = document.all?window.event:e;  
    if(ev.keyCode === 13){  
        return false;  
    }  
}); 
//搜索点击事件
$("#searchsubmit").click(function(e){
	// e.stopPropagation();
	get_lastestidname();
	// 使新建的标签命名不重复
	if(lastestid == 0){
		$("#myTab").html("<li style =\"display:none;\"><a data-toggle=\"tab\" href=\"#search"+0+"\" >占位标记</li>");
		$(".tab-content").html("<div id=\"search"+0+"\" class=\"tab-pane\" style =\"display:none;\"> <p>占位标记</p></div>");
}
	var newid = tabnum-1;
	var searchname = $("#searchtext").val();
	if (!searchname) {$("#searchtext").focus();return 0;};
	 // 搜索结果个数，未绑定数据
	var resultnum = 99;
	var newtabtitle = "<li><a data-toggle=\"tab\" href=\"#search"+(newid+1)+"\" >"+searchname+"<span class=\"badge badge-danger\">"+resultnum+"</span> <span class=\"closeico\"><i class=\"icon-remove\"></i></span> </a></li>"
	var resultcontent = "测试内容";
	var newtabcontent = "<div id=\"search"+(newid+1)+"\" class=\"tab-pane\"> <p>"+resultcontent+"</p></div>";
	var showaname= "#myTab a[href=\"#search"+(newid+1)+"\"]";
	$(newtabtitle).insertAfter($(lastestidname).parent());
	$(newtabcontent).insertAfter($("#search"+lastestid));
	$(showaname).tab('show');
	tabnum++;
	// 搜索完成，再次聚焦搜索框便于多次搜索
	$("#searchtext").focus();
});


});
