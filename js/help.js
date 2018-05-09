window.onload=function(){
	//元素获取
	var olLiArr = document.querySelectorAll(".navs li");
    var ulLiArr = document.querySelectorAll(".content li");
	//楼层跳跃
    function tiaoyue(olLi,ulLi){
    	var leader = 0;var target = 0;var timer = null;
    	for(var i=0;i<olLiArr.length;i++){
        	olLiArr[i].index = i;
        	olLiArr[i].onclick = function () {
           		target = ulLiArr[this.index].offsetTop;
            	clearInterval(timer);
            	timer = setInterval(function () {
               	 	var step = (target-leader)/10;
                	step = step>0?Math.ceil(step):Math.floor(step);
                	leader = leader + step;
                	window.scrollTo(0,leader); //leader实时获取
                	if(leader == target){  //targe目标
                    	clearInterval(timer);
                	}
            	},30);
        	}
    	}
    }
    tiaoyue(olLiArr,ulLiArr)
    
    //吸顶盒
    var topPart=document.querySelector(".headert");
    var navBar=document.querySelector(".header");
    var mainPart=document.querySelector(".content");
    
    window.onscroll=function(){
        if(scroll().top>topPart.offsetHeight){
            navBar.className="nav fixed";
            mainPart.style.paddingTop=navBar.offsetHeight+"px";
        }else{
            navBar.className="nav";
            mainPart.style.paddingTop=0;
        }
    };
    function scroll(){
        return{
            top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,
            left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0
        }

    }
    
	//返回顶部
	oBtn=document.getElementById('backTop');
	
	var onMove=false;
	oBtn.onclick=function(){
		onMove=true;
		var timer=setInterval(function(){
			window.scrollBy(0,-10);
			var top=document.documentElement.scrollTop||document.body.scrollTop;
			if(top<=0){
				clearInterval(timer);
				onMove=false;
			}
		},1);
	}
}
