$(function(){
back();
//showFooter	
getFooter();
showFooter(0); 
var scene="",name="",pageFlag=true,num=2;//每页条数
if(GetQueryString("scene") != "" && GetQueryString("scene") != null){
	scene=GetQueryString("scene");//产品ID
}
if(GetQueryString("name") != "" && GetQueryString("name") != null){
	name=GetQueryString("name");//产品ID
}
$(".header h2").html(name);
//getList
getList(num,scene);

var height=$(window).height() - $('.header').outerHeight(true)-$('.footer').outerHeight(true);
$(".contener").css("height",height);
myScroll(".contener");

//生成列表方法
function getList(num,scene){
	if(pageFlag){
		$.ajax({
			url:commonUrl+"/product/listBySceneId",
			type:"post",
			dataType:"json",
			async:false,
			data:{
				page:1,
				rows:num,
				scene_id:scene,
				status:1,
				type:"",
				c_id:"",
				platform:1,
			},
			success:function(data){
				if(data.code==200){
					var html='';
					for(var i=0;i<data.rows.length;i++){
						var cur=data.rows[i];
						html += '<div class="proCai-list">';
						html += '<a href="detail.html?proId=' + cur.id + '&term=' + cur.term + '&price=' + cur.price+'">';
						html += '<div class="top"></div>';
						html += '<div class="bottom">';
						html += '<i class="icon icon-tuijian-cai"></i><i class="icon icon-hot"></i>';
						html += '<strong class="block">' + cur.productName + '</strong>';
						html += '<p></p>';
						html += '<div class="proCai-list-con">';
						html += '<p><i class="icon-circle"></i>保障期限：' + cur.term + '天</p>';
						html += '<ul class="text">';
						html += '<li class="clearfix"><span class="left"></span><span class="right"></span></li>';
						html += '<li class="clearfix"><span class="left"></span><span class="right"></span></li>';
						html += '<li class="clearfix"><span class="left"></span><span class="right"></span></li>'
						html += '</ul>';
						html += '</div>';
						html += '</div>';
						html += '<div class="bottom-di">';
						html += '<ul class="clearfix">';
						html += '<li><span>¥<i>' + cur.price + '</i></span>' + cur.unit + '</li><li></li><li>销量：' + (cur.sales?cur.sales:0) + '</li>'
						html += '</ul>';
						html += '<div class="bg_proListBottom"></div>';
						html += '</div>';
						html += '</a>';
						html += '</div>';
					}
				}else{
					showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
				}
				pageFlag=false;
				$(".contener>div").html(html);
			    if($(".contener").height()>height){
				   $(".contener").css({"height":height,"overflow":"auto"});
			    }
			},
			error:function(data){
				showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
			}
		})
	}
}


//dropload
function dropLoad(num,scene){
	var dropload = $('div.active').dropload({
		domDown : {
          domClass   : 'dropload-down',
          domRefresh : '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
          domNoData  : '<div class="dropload-noData">没有更多数据了</div>',
          domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
      },
	    loadDownFn : function(me){
	    	$.ajax({
	    		url:commonUrl+"/product/listBySceneId",
				type:"post",
				dataType:"json",
				async:false,
				data:{
					page:1,
					rows:num,
					scene_id:scene,
					status:1,
					type:"",
					c_id:"",
					platform:1,
				},
				success:function(data){
					if(data.code==200){
						var html='';
						var html='';
						for(var i=0;i<data.rows.length;i++){
							var cur=data.rows[i];
							html += '<div class="proCai-list">';
							html += '<a href="detail.html?proId=' + cur.id + '&term=' + cur.term + '&price=' + cur.price+'">';
							html += '<div class="top"></div>';
							html += '<div class="bottom">';
							html += '<i class="icon icon-tuijian-cai"></i><i class="icon icon-hot"></i>';
							html += '<strong class="block">' + cur.productName + '</strong>';
							html += '<p></p>';
							html += '<div class="proCai-list-con">';
							html += '<p><i class="icon-circle"></i>保障期限：' + cur.term + '天</p>';
							html += '<ul class="text">';
							html += '<li class="clearfix"><span class="left"></span><span class="right"></span></li>';
							html += '<li class="clearfix"><span class="left"></span><span class="right"></span></li>';
							html += '<li class="clearfix"><span class="left"></span><span class="right"></span></li>'
							html += '</ul>';
							html += '</div>';
							html += '</div>';
							html += '<div class="bottom-di">';
							html += '<ul class="clearfix">';
							html += '<li><span>¥<i>' + cur.price + '</i></span>' + cur.unit + '</li><li></li><li>销量：' + (cur.sales?cur.sales:0) + '</li>'
							html += '</ul>';
							html += '<div class="bg_proListBottom"></div>';
							html += '</div>';
							html += '</a>';
							html += '</div>';
						    $(".contener>div").append(html);
						    dropload.resetload();
							if(num*(pageCount[page]) >= data.total){
		                        // 无数据
			    				dropload.noData();
			    				dropload.resetload();
		                    }
						  }
						}else{
							dropload.noData();
		    				dropload.resetload();
						}
		    		},
		    		error:function(data){
		    			showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
		    			dropload.resetload();
		    		}
	    	})
	    	
	    }
	});
}

});
