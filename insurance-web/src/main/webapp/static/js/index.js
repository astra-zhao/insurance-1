
//获取微信端openId 以get的方式传给我
var queryStr=GetQueryString("openId");
if(queryStr !=null && queryStr.toString().length>1)
{
   $.ajax({ //以POST的方式传给后台 
	   
   })
}


$(function(){	
	//showFooter	
	getFooter();
	showFooter(0); 
	//showBanner
	showBanner(1)
	var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: 3000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        paginationElement : 'span',
        paginationType : 'bullets',
        paginationClickable :true,
        autoplayDisableOnInteraction : false
    });
    
	$(".swiper-pagination").css({
        width:"2rem",
        bottom:"0.13rem",
        right:"0.95rem",
        left:"4.63rem"
    });
    
    //场景按钮
    showSceneButten();
    /*isCroll*/
    var mainHeight=$(window).height() - $('.indexheader').outerHeight(true)-$('.banner').outerHeight(true)-$('.recommend').outerHeight(true)-$('.footer').outerHeight(true);
    $(".main").css("height",mainHeight);
    myScroll(".main")

    /*search*/
    /*$(".indexheader .search").on("click",function(){
        setTimeout(function(){location.href="search.html";},500);
    })*/
});

function showBanner(index){
	$.ajax({
    	url:commonUrl+"/home/findBanner?position="+index,
    	type:"get",
        dataType:"json",
        async:false,
        success:function(data){
        	if(data.code==200){
        		var html='<div class="swiper-wrapper">';
        		for(var i=0;i<data.total;i++){
        			html+='<div class="swiper-slide"><a href="'+ data.rows[i].url+'"><img src="'+ data.rows[i].image +'"/></div>'
        		}
        		html+='</div>';
        		html+='<div class="swiper-pagination"></div>'
        		$(".banner").append(html)
        	}
        },
        error:function(){}
	})		
}

function showSceneButten(){
	$.ajax({
    	url:commonUrl + "/home/findSceneButten",
    	type:"get",
        dataType:"json",
        async:false,
        success:function(data){
        	if(data.code==200){
        		var html='<div class="left">';
		        		for(var i=0;i<Math.ceil(data.total/2);i++){
		        			html+='<a href="'+ commonUrl + data.rows[i].url+'?scene='+data.rows[i].id+'&name='+data.rows[i].scname+'" class="classification" data-id="'+data.rows[i].id+'" style="background:url('+data.rows[i].image+') no-repeat left top;background-size:'+data.rows[i].width/100+'rem '+data.rows[i].height/100+'rem;height:'+data.rows[i].height/100+'rem">';
		        			html+='<p><strong>'+data.rows[i].scname.substr(0,1)+'</strong><span>'+data.rows[i].scname.substr(1,2)+'</span></p>';
		        			html+='</a>'
		        		}
        		    html+='</div>';
        		    html+='<div class="right">';
		        		for(var i=Math.ceil(data.total/2);i<data.total;i++){
		        			html+='<a href="'+ commonUrl + data.rows[i].url+'?scene='+data.rows[i].id+'&name='+data.rows[i].scname+'" class="classification" style="background:url('+data.rows[i].image+') no-repeat left top;background-size:'+data.rows[i].width/100+'rem '+data.rows[i].height/100+'rem;height:'+data.rows[i].height/100+'rem">';
		        			html+='<p><strong>'+data.rows[i].scname.substr(0,1)+'</strong><span>'+data.rows[i].scname.substr(1,2)+'</span></p>';
		        			html+='</a>'
		        		}
	        		html+='</div>';
	        		html+='<img src="/static/images/need.png" class="img-need"/>';
        		$(".main.mainindex ul li").append(html)
        	}
        },
        error:function(){}
	})		
}

