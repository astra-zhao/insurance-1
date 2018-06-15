$(function(){
    back();
    $(".members-jfsc-tab li").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index=$(this).index();
        $(".members-jfsc-con>div").eq(index).addClass("active").siblings().removeClass("active");
    });

    
//记录页数
var countPro=1,countExc=1,countExcFlag=true,countProFlag=true,numPro=5,numExc=6;
    //获取积分
   $.ajax({
 		url:commonUrl+"/user/personalCenter",
 		type:"post",
 		dataType:"json",
 		success:function(data){
 			if(data.code==200){
                if(data.obj.integral!=null && data.obj.integral!=""){
                	$(".integral").html(data.obj.integral);
 				}
 			}else if(data.code==1010){
 				showPop('<p style="text-align: center;padding:.1rem 0">您还没有登录</p>');
 				$(".pop span").on("click",function(){
	    	        $(".bgPop").hide();
	    	        $(".pop").hide();
	    	        window.location.href="../login.html"
	    	    })
 			}else{
 				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
 			}
 		},
 		error:function(){}
 	});
    
var height=$(window).height()-$(".header").outerHeight(true)-$(".header+div").outerHeight(true)-
    $(".members-jfsc-tab").outerHeight(true);   
    
//获取兑换商品
init_getIntegralPro();
function init_getIntegralPro(){
	if(countProFlag){
		  $.ajax({
		 		url:commonUrl+"/user/getIntegralPro",
		 		type:"post",
		 		dataType:"json",
		 		async:false,
		 		data:{
		 			page:1,
		 			rows:numPro
		 		},
		 		success:function(data){
		 			if(data.code==200){
		                var html="";
		                for(var i=0;i<data.rows.length;i++){
		                	var cur=data.rows[i];
		                     html+='<div class="jfdh-item">';
		                       html+='<img src="'+cur.bgUrl+'" />';
		                       html+='<p class="name">'+cur.shortName+'</p>';
		                       html+='<div class="info">';
		                         html+='<p class="clearfix">';
		                           html+='<span class="left">所需积分：</span>';
		                           html+='<span>'+cur.integral+'</span>';
		                         html+='</p>';
		                         html+='<p class="clearfix">';
			                       html+='<span class="left">有效日期：</span>';
			                       html+='<span>自兑换起'+integralTime(new Date().getFullYear(),cur.expiryDate)+'内有 效</span>';
		                         html+='</p>';
		                         html+='<p class="clearfix">';
		                           html+='<span class="left">适用范围：</span>';
		                           html+='<span>'+cur.scope+'</span>';
		                         html+='</p>';
		                         html+='<a href="members-jfsc-duihuan.html?proid='+cur.id+'">兑换</a>';
		                       html+='</div>';
		                     html+='</div>';
		                }
		                if(data.rows.length<5){
		                	html+='<div class="jfdh-item">';
		                        html+='<img src="/static/images/bg_jifen_qidai.png" />';
		                        html+='<div class="info">';
		                          html+='<p style="padding-top:.8rem;font-size:.18rem;color:#bdbdbd;text-align: center">更多惊喜，即将上线！</p>';           
		                        html+='</div>';
		                   html+='</div>';
		                }
		               $("#list01").html(html);
		               countProFlag=false;
		               if($(".box01").height()>height){
		            	   dropLoadPro()
		    		    }
		 			 }else if(data.code==1003){
		 				showPop('<p style="text-align: center;padding:.1rem 0">您还没有兑换商品</p>');
		 				$(".pop span").on("click",function(){
			    	        $(".bgPop").hide();
			    	        $(".pop").hide();
			    	    })
		 			}else{
		 				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
		 			}
		 		},
		 		error:function(){}
		 	}); 
	  }else{
		  return
	  }
}

//获取用户已兑换商品列表   
$(".members-jfsc-tab li:last").on("click",function(){
	if(countExcFlag){
		$.ajax({
	 		url:commonUrl+"/user/getExchangeIntegralPro",
	 		type:"post",
	 		dataType:"json",
	 		async:false,
	 		data:{
	 			page:1,
	 			rows:numExc
	 		},
	 		success:function(data){
	 			if(data.code==200){
	 				var html="";
	                for(var i=0;i<data.rows.length;i++){
	                	var cur=data.rows[i];
	                     html+='<div class="myDuihuan">';
	                       html+='<div>';
	                         html+='<a href="myDuihuan-detail.html?proId='+cur.proId+'">';
	                           html+='<span class="left">'+cur.name+'</span>';
	                           html+='<span class="left">电子卡号：'+cur.ecard+'</span>';
	                         html+='</a>';
	                       html+='</div>';
	                     html+='</div>';
	                     html+='<div class="img-shadow" style="width:99%"></div>';
	                } 
	                $("#list").html(html);
	                countExcFlag=false;
	                if($(".box02").height()>height){
	                	dropLoadExc()
	                }
	 			}else{
	 				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
	 				$(".pop span").on("click",function(){
		    	        $(".bgPop").hide();
		    	        $(".pop").hide();
		    	    })
	 			}
	 		},
	 		error:function(){}
	 	});
	}else{
		return
	}
}); 

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

//getIntegralPro
function dropLoadPro(){
	var dropload = $('div.active').dropload({
		domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
            domNoData  : '<div class="dropload-noData">没有更多数据了</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
	    loadDownFn : function(me){
	    	$.ajax({
	     		url:commonUrl+"/user/getIntegralPro",
	     		type:"post",
	     		dataType:"json",
	     		async:false,
	     		data:{
	     			page:countPro++,
	     			rows:numPro
	     		},
	     		success:function(data){
	     			if(data.code==200){
	                    var html="";
	                 if(data.rows.length>0){
	                    for(var i=0;i<data.rows.length;i++){
	                    	var cur=data.rows[i];
	                         html+='<div class="jfdh-item">';
	                           html+='<img src="'+cur.bgUrl+'" />';
	                           html+='<p class="name">'+cur.shortName+'</p>';
	                           html+='<div class="info">';
	                             html+='<p class="clearfix">';
	                               html+='<span class="left">所需积分：</span>';
	                               html+='<span>'+cur.integral+'</span>';
	                             html+='</p>';
	                             html+='<p class="clearfix">';
	    	                       html+='<span class="left">有效日期：</span>';
	    	                       html+='<span>自兑换起'+integralTime(new Date().getFullYear(),cur.expiryDate)+'内有 效</span>';
	                             html+='</p>';
	                             html+='<p class="clearfix">';
	                               html+='<span class="left">适用范围：</span>';
	                               html+='<span>'+cur.scope+'</span>';
	                             html+='</p>';
	                             html+='<a href="members-jfsc-duihuan.html?proid='+cur.id+'">兑换</a>';
	                           html+='</div>';
	                         html+='</div>';
	                    }
	                    $(".box01>div").append(html);
	                    dropload.resetload();
	                    if(numPro*(pageCount[page]) >= data.total){
	                    	// 加锁
		    				dropload.lock();
		    				// 无数据
		    				dropload.noData();
		    				dropload.resetload();
	                    }
	                 } 
	     			}else if(data.code==1003){
	     				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
	     				html+='<div class="jfdh-item">';
	                        html+='<img src="/static/images/bg_jifen_qidai.png" />';
	                        html+='<div class="info">';
	                          html+='<p style="padding-top:.8rem;font-size:.18rem;color:#bdbdbd;text-align: center">更多惊喜，即将上线！</p>';           
	                        html+='</div>';
	                    html+='</div>';
	                    $(".box01>div").append(html);
	                    dropload.lock();
	                    dropload.resetload();
	     			}else{
	     				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
	     				dropload.lock();
	     				dropload.resetload();
	     			}
	     		},
	     		error:function(data){
		 			showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
		 			dropload.lock();
	    			dropload.resetload();
		 		}
	     	});
	    }
	})
}

//getExchangeIntegralPro()
function dropLoadExc(){
	var dropload = $('div.active').dropload({
		domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
            domNoData  : '<div class="dropload-noData">没有更多数据了</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
	    loadDownFn : function(me){
			$.ajax({
		 		url:commonUrl+"/user/getExchangeIntegralPro",
		 		type:"post",
		 		dataType:"json",
		 		async:false,
		 		data:{
		 			page:countExc++,
		 			rows:numExc
		 		},
		 		success:function(data){
		 			if(data.code==200){
		                var html="";
		            if(data.rows.length>0){    
		                for(var i=0;i<data.rows.length;i++){
		                	var cur=data.rows[i];
		                     html+='<div class="myDuihuan">';
		                       html+='<div>';
		                         html+='<a href="myDuihuan-detail.html?proId='+cur.proId+'">';
		                           html+='<span class="left">'+cur.name+'</span>';
		                           html+='<span class="left">电子卡号：'+cur.ecard+'</span>';
		                         html+='</a>';
		                       html+='</div>';
		                     html+='</div>';
		                     html+='<div class="img-shadow" style="width:99%"></div>';
		                } 
		                  $("#list").append(html);
		                  dropload.resetload();
			               if(numExc*(pageCount[page]) >= data.total){
			            	    dropload.lock();
		                        // 无数据
			    				dropload.noData();
			    				dropload.resetload();
		                    }
		            } 
		 			}else if(data.code==1003){
		 				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
		 				dropload.lock();
                        // 无数据
	    				dropload.noData();
	    				dropload.resetload();
		 			}else{
		 				showPop('<p style="text-align: center;padding:.1rem 0">'+data.msg+'</p>');
		 				dropload.lock();
                        // 无数据
	    				dropload.noData();
	    				dropload.resetload();
		 			}
		 		},
		 		error:function(data){
		 			showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
		 			dropload.lock();
	    			dropload.resetload();
		 		}
		 	});
         }
    })
}





})
