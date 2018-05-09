window.onload=function(){
	var oScreenBanner = document.getElementsByClassName("screen-banner")[0];
    var oAllScreen = oScreenBanner.children[0];
    var arrScreen = oAllScreen.children;
    var screenW, screenH;
    var page = 0;
    function resize(){
        // 获取屏幕宽高
        screenW = document.documentElement.clientWidth;
        screenH = document.documentElement.clientHeight;
        // 设置宽高    总轮播图    大盒子    每一屏
        oAllScreen.style.width = oScreenBanner.style.width = screenW + "px";
        oScreenBanner.style.height = screenH + "px";
        oAllScreen.style.height = screenH * arrScreen.length + "px";
        for (var i = 0; i < arrScreen.length; i++) {
            arrScreen[i].style.width = screenW + "px";
            arrScreen[i].style.height = screenH + "px";
        }
		oAllScreen.style.top = -page * screenH + "px";
    }
    resize();
    window.onresize = resize;
//  节流阀 阀门关闭
    var isRunning = false; // 儅isRunning 為true  鼠標滾軸不管事
    // 儅isRunning 為false  鼠標滾軸管事
    function scrollUp() {
        if(!isRunning){
            isRunning = true;
            // 設置定時器  儅1秒之後  滾軸繼續可以使用
            setTimeout(function(){
                isRunning = false;
            },1000);
            if (page > 0) {
                page--;
                oAllScreen.style.top = -page * screenH + "px";
            }
        }
    }
	function scrollDown() {
        if(!isRunning) {
            isRunning = true;
            setTimeout(function(){
                isRunning = false;
			},1000);
            if (page < arrScreen.length - 1) {
                page++;
                oAllScreen.style.top = -page * screenH + "px";
            }
        }
    }
	// chrome   ie
    addEvent(window, "mousewheel", mouseWheel);
	// ff
    addEvent(window, "DOMMouseScroll", mouseWheel);
	// 滚轴事件函数
    function mouseWheel(ev) {
        var oEvent = window.event || ev;
        if (oEvent.detail) {
            if (oEvent.detail > 0) {  // 下滚动
                scrollDown()
            } else {   //   向上
                scrollUp()
            }
        } else if (oEvent.wheelDelta) {// chrome ie
            if (oEvent.wheelDelta > 0) {  // 上滚动
                scrollUp()
            } else {   //   向下
                scrollDown()
            }
        }
    }
    function addEvent(ele, type, listener) {
        if (ele.addEventListener) {   //  click
            ele.addEventListener(type, listener);
        } else {               //  onclick
            ele.attachEvent("on" + type, listener);
        }
    } 
	//ajax1
	var xhr=new XMLHttpRequest();
	xhr.open('get','01.json');
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			console.log(xhr.responseText);
			var jsonObject=JSON.parse(xhr.responseText);
			console.log(jsonObject);
			var html="";
			for(var i=0;i<jsonObject.length;i++){
			var item=jsonObject[i];
			html +='<li>'+
					'<h2>'+item.news+'</h2>'+
					'<span>'+item.time+'</span>'+
					'<li>'
			}
			document.querySelector('.neirong1 .morem').innerHTML=html;
		}
	}
	//ajax2
    var xhr1=new XMLHttpRequest();
	xhr1.open('get','02.json');
	xhr1.send();
	xhr1.onreadystatechange=function(){
		if(xhr1.readyState==4&&xhr1.status==200){
			console.log(xhr1.responseText);
			var jsonObject1=JSON.parse(xhr1.responseText);
			console.log(jsonObject1);
			var html1="";
			for(var i=0;i<jsonObject1.length;i++){
			var item1=jsonObject1[i];
			html1 +='<li>'+
					'<h2>'+item1.news+'</h2>'+
					'<span>'+item1.time+'</span>'+
					'<li>'
			}
			document.querySelector('.neirong2 .morem1').innerHTML=html1;
		}
	}

	//ajax3
	var obtn=document.getElementById("more");
	obtn.onclick = function(){
		var xhr=new XMLHttpRequest();
		xhr.open('get','03.json');
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send('name=xzz');
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				console.log(xhr.responseText);
				var jsonObject=JSON.parse(xhr.responseText);
				console.log(jsonObject);
				var html="";
				for(var i=0;i<jsonObject.length;i++){
					var item=jsonObject[i];
					html +='<tr>'+
							'<td>'+item.level+'</td>'+
							'<td>'+item.imgUrl+'</td>'+
							'<td>'+item.nowPrice+'</td>'+
							'<td>'+item.oldPrice+'</td>'+
							'<td>'+item.time+'</td>'+
							'<tr>'
				}
				document.querySelector('tbody').innerHTML=html;
			}
		}
	}
}
