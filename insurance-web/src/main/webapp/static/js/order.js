$(function(){
    back();
    //showFooter	
	getFooter();
	showFooter(1); 
//页面信息高度
var height=$(window).height() - $('.header').outerHeight(true)-$('.footer').outerHeight(true)-$(".order .lis").outerHeight(true);
//记录页面是否加载了信息
var pageObj={
		page1:true,
		page2:true,
		page3:true,
		page4:true
     };
//记录页数
var pageCount={
	page1:1,
	page2:1,
	page3:1,
	page4:1
}
var num=4;//每页记录数
//生成页面信息
getOrderInfo("0","page1");
function getOrderInfo(status,page){
	if(pageObj[page]==true){
		$.ajax({
			url:commonUrl+"/orders/getOrderByStatus",
			type: "post",
			dataType:"json",
			async:false,
			data:{
				status:status,
				page:pageCount[page],
				rows:num
			},
			success:function(data){
				if(data.code==0){
					var html="";
					for(var i=0;i<data.rows.length;i++){
						var obj=data.rows[i];
						html+='<div class="model">';
						  html+='<div class="model-title clearfix">';
						     html+='<p class="left color">'+obj.proName+'</p>';
						     if(status=="0"){
						    	 html+='<span class="right" data-num="'+obj.id+'">x</span>';
						     }
						  html+='</div>';
						  html+='<div class="model-content clearfix">';
						     html+='<a href="orderDetail.html?orderId='+obj.id+'">';
						        html+='<div class="left">';
						          html+='<p class="clearfix"><span class="left">订单号：</span><span class="left">'+obj.id+'</span></p>';
						          if(status!="5" || status!="6"){
						        	  html+='<p class="clearfix"><span class="left">保障期限：</span><span class="left">'+obj.guaranteePeriod+'</span></p>';
						          }else{
						        	  html+='<p class="clearfix"><span class="left">保单号：</span><span class="left">'+obj.policyNo+'</span></p>';
						          }
						          html+='<p>被保人：<span>'+obj.insuredUsers+'</span></p>'
						        html+='</div>';
						        html+='<div class="model-content-right"></div>'
						     html+='</a>';
						  html+='</div>';
						  html+='<div class="model-bottom clearfix">';
						     html+='<p class="left">订单金额：<span class="color">'+obj.paymentAmount+'元</span></p>';
						     if(status==0){
						    	 html+='<a  class="right block" href="pay.html?orderId='+obj.id+'">立即支付</a>';
						     }
						  html+='</div>';
						html+=' </div>';
					}
					pageObj[page]=false;
				    $("ul.cons div.active .innerCon").html(html);
				    if($("div.active").height()>height){
					   $("div.active").css({"height":height,"overflow":"auto"});
					   dropLoad(status,page)
				    };
				    
				    
				}
			},
			error:function(data){
				showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
			}
		})
	}else{
		return 
	}
}	

//tab
$(".order .lis li").on("click",function(){
    $(this).addClass("active").siblings().removeClass("active");
    var index=$(this).index();
    $(".order .cons li>div").eq(index).addClass("active").siblings().removeClass("active");
    if(index==0){
    	getOrderInfo("0","page1")
    }else if(index==1){
    	getOrderInfo("1,2","page2")
    }else if(index==2){
    	getOrderInfo("5","page3")
    }else if(index==3){
    	getOrderInfo("6","page4")
    }
});

//删除订单
$(".model-title span.right").on("click",function(){
	 var num=$(this).attr("data-num");
	 showDialog("dialog");
	 $(".dialog .btns span:last").on("click",function(){
		 $(this).unbind();
		 $(".bgDialog").hide();
	     $(".dialog").hide();
	     $.ajax({
	    	 url:commonUrl+"/orders/updateOrderStatus",
			 dataType:"json", 
			 type:"post",
			 data:{
				 orderId:num,
				 status:4
			 },
			 success:function(data){
	             if(data.code==200){
	            	 getOrderInfo("0","page1");
	             }else{
	            	 showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
	             }
			 },
			 error:function(data){
				 showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
			 }
		 })
	 })
})

//dropload
function dropLoad(status,page){
	var dropload = $('div.active').dropload({
		domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
            domNoData  : '<div class="dropload-noData">没有更多数据了</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
	    loadDownFn : function(me){
	    	$.ajax({
	    		url:commonUrl+"/orders/getOrderByStatus",
	    		type: "post",
	    		dataType:"json",
	    		data:{
	    			status:status,
	    			page:pageCount[page]+=1,
	    			rows:num
	    		},
	    		success:function(data){
	    			if(data.code==0){
	    				var html="";
	    				if(data.rows.length>0){
	    					for(var i=0;i<data.rows.length;i++){
		    					var obj=data.rows[i];
		    					html+='<div class="model">';
		    					  html+='<div class="model-title clearfix">';
		    					     html+='<p class="left color">'+obj.proName+'</p>';
		    					     if(status==0){
		    					    	 html+='<span class="right" data-num="'+obj.id+'">x</span>';
		    					     }
		    					  html+='</div>';
		    					  html+='<div class="model-content clearfix">';
		    					     html+='<a href="orderDetail.html?orderId='+obj.id+'">';
		    					        html+='<div class="left">';
		    					          html+='<p class="clearfix"><span class="left">订单号：</span><span class="left">'+obj.id+'</span></p>';
		    					          if(status!=3){
		    					        	  html+='<p class="clearfix"><span class="left">保障期限：</span><span class="left">'+obj.guaranteePeriod+'</span></p>';
		    					          }else if(status==3){
		    					        	  html+='<p class="clearfix"><span class="left">保单号：</span><span class="left">'+obj.policyNo+'</span></p>';
		    					          }
		    					          html+='<p>被保人：<span>aaa</span></p>'
		    					        html+='</div>';
		    					     html+='</a>';
		    					  html+='</div>';
		    					  html+='<div class="model-bottom clearfix">';
		    					     html+='<p class="left">订单金额：<span class="color">'+obj.paymentAmount+'元</span></p>';
		    					     if(status==3){
		    					    	 html+='<p class="left">订单金额：<span>'+obj.paymentAmount+'元</span></p>';
		    					     }
		    					     if(status==0){
		    					    	 html+='<a  class="right block" href="pay.html?orderId='+obj.id+'">立即支付</a>';
		    					     }
		    					  html+='</div>';
		    					html+=' </div>';
		    				}
	    					
	    					$("div.active .innerCon").append(html);
		    				dropload.resetload();
			    			if(num*(pageCount[page]) >= data.total){
		                        // 无数据
			    				dropload.lock();
			    				dropload.noData();
			    				dropload.resetload();
		                    }
	    				}
	    				
	    			}
	    		},
	    		error:function(data){
	    			showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
	    			dropload.lock();
	    			dropload.noData();
	    			dropload.resetload();
	    		}
	    	})
	    }
	});
}
})
