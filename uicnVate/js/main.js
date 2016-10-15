(function(){
	var $banner_index= $(".banner .s_index span");
	var $banner_img=$(".banner .b_imgbox");
	var $banner_slide=$(".banner .slide");
	var $_index=0;
	var $banner=$(".banner");
	var banner_setInterval=setInterval(fun,3000);
	function fun(){
		$_index++;
		if($_index==6){
			$_index=0;
		}
		bannerShowHide($_index);
	}
	
	$banner.hover(function(){
		clearInterval(banner_setInterval);
	},function(){
		banner_setInterval=setInterval(fun,3000);
	});
	
	$banner_index.click(function(){
		$_index=$(this).index();
		bannerShowHide($_index);
	});
	
	$banner_slide.click(function(){
		if($(this).index()==6){
			$_index--;
			if($_index==-1){
				$_index=5;
			}
			bannerShowHide($_index);
		}
		else{
				$_index++;
				if($_index==6){
					$_index=0;
					}
				bannerShowHide($_index);
		}
	});
	function bannerShowHide(_index){
		$banner_index.eq(_index).addClass("selected").siblings().removeClass("selected");
		$banner_img.eq(_index).fadeIn(300).siblings(".b_imgbox").fadeOut(300);
	}
})()