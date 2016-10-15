(function(){
	//加载音乐列表
	var lengths=music.Libretto[0].length;
	var len=music.musicUrl.length;
	var $musicTitle=$("#musicTitle");
	for (var i=0;i<len;i++) {
		$musicTitle.append("<li class='musicTitle'><span class='num fl'>"+(i+1)+":</span><span class='musicInfo fl ellipsis'>"+music.musicName[i]+"</span></li>");
	}
	//加载音乐歌词
	var $mContent=$(".mContent");
	for(var i=0;i<music.Libretto.length;i++){
		var libretto="<div class='LibrettoBox'><h3 class='mTitle'>"+music.Libretto[i][0]+"</h3>";
		for(var y=1;y<music.Libretto[i].length;y++){
			libretto+="<p class='mLibretto'>"+music.Libretto[i][y]+"</p>";
		}
		libretto+="</div>";
		$mContent.append(libretto);
	}
	//默认显示第一首的歌词
	$(".LibrettoBox").eq(0).show();
	var url_index=0;
	//音乐列表点击事件
	var $mTitle=$(".musicTitle");
	var $VateAudio=$("#VateAudio");
	$mTitle.eq(url_index).addClass("selected");
	$mTitle.click(function(){
		$(".LibrettoBox").eq(url_index).hide();
		url_index=$(this).index();
		$(".LibrettoBox").eq(url_index).show();
		$(this).addClass("selected").siblings().removeClass("selected");
		$VateAudio.attr("src","music/"+(music.musicUrl[url_index]));
		$musicPlay.attr("class", "iconfont icon-pause fl");
	});
	//点击播放暂停事件
	var $musicPlay=$("#musicPlay");
	var musicPlay=$VateAudio.get(0);
	$musicPlay.click(function(){
			var className=$musicPlay.attr("class");
			 //如果这个值里面有play状态
      		 if(className.indexOf("play")!=-1){
            //播放音乐
            musicPlay.play();
            //把按钮按钮状态置换成暂停状态
            $musicPlay.attr("class", "iconfont icon-pause fl");
        }else{
            //否则，暂停
            musicPlay.pause();
           //把按钮按钮状态置换成播放状态
             $musicPlay.attr("class", "iconfont icon-iconfontplay2 fl");
        }
	});
	var $progressBar=$(".progressBar");
	var alltime;
	var nowtime;
	setInterval(function(){
		//当前音乐总时长、
		alltime=parseInt(musicPlay.duration);
		//当前音乐时长
		nowtime=parseInt(musicPlay.currentTime);
		//设置进度条
		$progressBar.css("width",(nowtime/alltime)*500+"px");
		//假如nowtime=alltime
		if(nowtime==alltime){
			nextMusic();
		}
	},200);
	//点击上一首下一首事件
	//上一首
	var $firstMusic=$("#firstMusic");
	$firstMusic.click(function(){
		$musicPlay.attr("class", "iconfont icon-pause fl");
		$(".LibrettoBox").eq(url_index).hide();
		url_index--;
		if(url_index==-1){
			url_index=len-1;
		}
		$VateAudio.attr("src","music/"+(music.musicUrl[url_index]));
		$(".LibrettoBox").eq(url_index).show();
		$(".musicTitle").eq(url_index).addClass("selected").siblings().removeClass("selected");
	});
	//下一首
	var $lastMusic=$("#lastMusic");
	$lastMusic.click(nextMusic);
	function nextMusic(){
		$musicPlay.attr("class", "iconfont icon-pause fl");
		$(".LibrettoBox").eq(url_index).hide();
		url_index++;
		if(url_index==len){
			url_index=0;
		}
		$VateAudio.attr("src","music/"+(music.musicUrl[url_index]));
		$(".LibrettoBox").eq(url_index).show();
		$(".musicTitle").eq(url_index).addClass("selected").siblings().removeClass("selected");
	}
})()
//			var dom=function(obj){
//				return document.getElementById(obj);
//			}
//			//加载音乐列表
//			for (var i=0;i<music.musicUrl.length;i++) {
//				//<li class="musicTitle"><span class="num fl">01:</span><span class="musicInfo fl ellipsis">小小的太阳</span></li>
//				var musicTitle=document.createElement("li");
//				var snum=document.createElement("span");
//				var smusicInfo=document.createElement("span");
//				musicTitle.setAttribute("class","musicTitle");
//				musicTitle.setAttribute("title",music.musicName[i]);
//				musicTitle.setAttribute("onclick","VateMusic.musicPlay(this)");
//				smusicInfo.setAttribute("class","musicInfo fl ellipsis");
//				smusicInfo.innerHTML=music.musicName[i];
//				snum.setAttribute("class","num fl");
//				snum.innerHTML=i+1+":";
//				if(i==0){musicTitle.setAttribute("class","musicTitle selected");};
//				musicTitle.appendChild(snum);
//				musicTitle.appendChild(smusicInfo);
//				dom("musicTitle").appendChild(musicTitle);
//			}
//			var VateMusic= {
//				musicPlay:function(obj){
//					var cname="selected";
//					//获取目标父节点 和父节点的所有子节点
//					var par=obj.parentNode;   //得到obj的父节点
//					var chils= par.childNodes;  //得到par的全部子节点  
//					for (var i=1;i<chils.length;i++) {//下标竟然是从1开始的 下标0竟然没有
//						//改变class=selected的元素
//						chils[i].className="musicTitle";
//					}
//					dom("VateAudio").setAttribute("src","music/"+obj.childNodes[1].innerHTML+".mp3");
//					obj.className+=" selected";
//				}
//			}