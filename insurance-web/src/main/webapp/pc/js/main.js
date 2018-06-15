$(function() {
	$('.ent_tab a').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var tab_index=$(this).attr('tab');
		$('.enterprise_news .'+tab_index).show().siblings().hide();
	});
	showMore();
});


// 首页查看更多按钮
function showMore() {
	$('.more').on('click', function() {
		var atr = $('.ent_tab .active').attr('tab');
		if (atr == "indextab_1") {
			window.location.href = "/info/news/list.html?type=2";
		} else {
			window.location.href = "/info/news/list.html?type=1";
		}
	});
}
