$(function(){
	
  back();
  //showFooter
  getFooter();
  showFooter(0); 
  getCardList()  

}) 
//获取银行卡列表 
function getCardList(){
	$.ajax({
		url:commonUrl+"/user/bankcard",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			if(data.code==200){
				var html="";
				for(var i=0;i<data.rows.length;i++){
					var cur = data.rows[i];
					if(cur.isdefault == 1){
						html+='<div class="cards-item default">';
						  html+='<p>'+cur.bankName+'-储蓄卡</p>';
						  html+='<p>'+cur.bankNumber+'</p>'
						  html+='<input type="hidden" name="ubId" value="'+cur.ubId+'" />';
						  html+='<em>默认</em>';
						html+='</div>';
					}else{
						html+='<div class="cards-item">';
	  					  html+='<p>'+cur.bankName+'-储蓄卡</p>';
	  					  html+='<p>'+cur.bankNumber+'</p>';
	  					  html+='<input type="hidden" name="ubId" value="'+cur.ubId+'" />';
	  					  html+='<em>设为默认</em>';
	  					  html+='<i class="icon-remove normal" >x</i>';
	  					html+='</div>';
					}
				}
				 $(".cards-contener>div").html(html);
				 $(".cards-item>em").on("click",function(){setDefault($(this))});
				 $(".cards-item>i").on("click",function(){removeBank($(this))})
				 addScroll();
			}else if(data.code==1010){
				showPop('<p style="text-align: center;padding:.2rem 0">您还没有登录，请先登录</p>');
	    		$(".pop span").on("click",function(){
	    	        window.location.href="../login.html"
	    	    })
				
			}else if(data.code==1003){
				showPop('<p style="text-align: center;padding:.2rem 0">您还没绑定银行卡，请添加</p>');
				$(".pop span.default").on("click",function(){
	    	        window.location.href=commonUrl+"/html5/members/members-addBankCard.html"
	    	    })
			}
		},
		error:function(){}
	})
}    
    
//设为默认银行卡
function setDefault(e){
	if(e.html() == "默认"){return}
	$.ajax({
	  url:commonUrl+'/user/setDefault',
	  type:"post",
	  dataType:"json",
	  data:{
		  ubId:e.prev("input").val()
	  },
	  success:function(data){
		  if(data.code==1010){
			  showPop('<p style="text-align: center;padding:.2rem 0">您还没有登录，请先登录</p>');
	    		$(".pop span").on("click",function(){
	    	        window.location.href="../login.html"
	    	    })
		  }else if(data.code==500){
			  showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
		  }else if(data.code==200){
			  getCardList()
		  }
	  },
	  error:function(){}
  })
}
//删除银行卡
function removeBank(e){
	$(".dialog .btns span").unbind();
	showDialog("dialog");
	$(".dialog .btns span#remove").on("click",function(){
		$(".bgDialog").hide();
	    $(".dialog").hide();
	    $.ajax({
	  	  url:commonUrl+'/user/deleteBankcard',
	  	  type:"post",
	  	  dataType:"json",
	  	  data:{
	  		  ubId:e.prev().prev("input").val()
	  	  },
	  	  success:function(data){
	  		  if(data.code==200){
	  			  getCardList();
	  			  return
	  		  }else if(data.code==1010){
	  			  showPop('<p style="text-align: center;padding:.2rem 0">您还没有登录，请先登录</p>');
	  	    		$(".pop span").on("click",function(){
	  	    	        window.location.href="../login.html"
	  	    	    })
	  		  }else{
	  			  showPop('<p style="text-align: center;padding:.2rem 0">'+data.msg+'</p>');
	  		  }
	  	  },
	  	  error:function(){}
	  })
	})
	
	$(".dialog .btns span#cancel").on("click",function(){
		$(".bgDialog").hide();
	    $(".dialog").hide();
	})
}

function addScroll(){
 var height=$(window).height()-$(".header").outerHeight(true)-$(".footer").outerHeight(true)-$(".addCard").outerHeight(true)-10;
 if($(".cards-contener").outerHeight(true)>height){
	 $(".cards-contener").css({
		 height:height,
		 overflow:"hidden"
	 })
	 myScroll(".cards-contener")
 }
}



