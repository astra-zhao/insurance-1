$(function(){
 back();
//showFooter	
 getFooter();
 showFooter(0); 

 //记录页面是否加载了信息
 var pageObj={
	sort:true,
	sales:true,
	price:true,
  };
 //记录页数
 var pageCount={
	 sort:1,
	 sales:1,
	 price:1,
};
var num=2;//每页记录数
//getList
var platform=getCookie(document.cookie,"platform");
getSort('sort',0)

//getSort
function getSort(name,j){
	if(pageObj[name]==true){
		$.ajax({
			url:commonUrl+"/product/listBySceneId",
			type:"post",
			dataType:"json",
			data:{
				page:1,
				rows:num,
				scene_id:0,
				status:1,
				sort_name:name,
				platform:1
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
				}
				pageObj[name]=false;
				$(".contener-sort-item"+j).children("div").html(html);
			    if($("div.active").height()>height){
				   $("div.active").css({"height":height,"overflow":"auto"});
				   dropLoad(name,j);
				   pageCount[name]++;
			    }
			},
			error:function(data){
				showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
			}
		})
	}
}

//tab change
var height=$(window).height()-$(".header").outerHeight(true)-$(".footer").outerHeight(true)-$(".sort-box").outerHeight(true);
$(".sort-box li").on("click",function(){
	$(this).addClass("active").siblings().removeClass("active");
	$(".sort-box li i").attr("class","icon-up");
	$(this).find("i").attr("class","icon-down");
	var index=$(this).index();
	var ele=$(".contener>div").eq(index);
	ele.addClass("active").siblings().removeClass("active");
	if(index==0){
		getSort('sort',0) //默认排序
	}else if(index==1){
		getSort('sales',1)  //销量排序
	}else if(index==2){
		getSort('price',2) //价格排序
	}
	
});

//dropload
function dropLoad(name,j){
   $('div.active').dropload({
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
				data:{
					page:pageCount[name],
					rows:num,
					scene_id:0,
					status:1,
					sort_name:name,
					platform:platform
				},
				success:function(data){
					if(data.code==200){
						var html='';
						if(data.rows.length>0){
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
									html += '<li><span>¥<i>' + cur.price + '</i></span>' + cur.unit + '</li><li></li><li>销量：' + cur.sales + '</li>'
									html += '</ul>';
									html += '<div class="bg_proListBottom"></div>';
									html += '</div>';
									html += '</a>';
									html += '</div>';
							    }
							    $(".contener-sort-item"+j).children("div").append(html);
							    me.resetload();
								if(num*(pageCount[name]) > data.total){
			                        // 无数据
									me.lock();
				    				me.noData();
				    				me.resetload();
			                    }
							}
						}else{
							me.lock();
							me.noData();
		    				me.resetload();
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

})

