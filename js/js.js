window.onload=function(){
	//旋转木马
	var flagx = true;
    //config是配置单，规定了每张图片的大小位置层级透明度
    var configx = [
        {
            "width": 100,
            "top": 30,
            "left": 5,
            "opacity": 0.3,
            "zIndex": 2
        },//0
        {
            "width": 150,
            "top": 60,
            "left": 25,
            "opacity": 0.8,
            "zIndex": 3
        },//1
        {
            "width": 200,
            "top": 100,
            "left": 82,
            "opacity": 1,
            "zIndex": 4
        },//2
        {
            width: 150,
            top: 60,
            left: 200,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            "width": 100,
            "top": 30,
            "left": 270,
            "opacity": 0.3,
            "zIndex": 2
        }//4
    ];

//旋转木马获取元素
    var slide = document.getElementById("slide");
    var ulx = slide.children[0];
    var xuanzhuan = document.querySelector(".xuanzhuan");
    var lisx = ulx.children;
    var arrowx= document.querySelector(".arrow");
    var arrLeftx = document.querySelector("#arrLeft1");
    var arrRightx = document.querySelector("#arrRight1");
    
	xuanzhuan.onmouseover= function () {
        animatex(arrowx, {"opacity": 1});
    };
    xuanzhuan.onmouseout = function () {
        animatex(arrowx, {"opacity": 0});
    };
    function animatex(objx,jsonx,fnx){
			clearInterval(objx.timerx);
			objx.timerx=setInterval(function(){
				var flagx=true;
				for(var kx in jsonx){
					if(kx==="opacity"){
						var leaderx=getStylex(objx,kx)*100;
						var targetx=jsonx[kx]*100;
						var stepx=(targetx-leaderx)/10;
						stepx=stepx>0?Math.ceil(stepx):Math.floor(stepx);
						leaderx=leaderx+stepx;
						objx.style[kx]=leaderx/100;
					}else if(kx==="zIndex"){
						objx.style.zIndex=jsonx[kx];
					}else{
						var leaderx=parseInt(getStylex(objx,kx))||0;
						var targetx=jsonx[kx];
						var stepx=(targetx-leaderx)/10;
						stepx=stepx>0?Math.ceil(stepx):Math.floor(stepx);
						leaderx=leaderx+stepx;
						objx.style[kx]=leaderx+"px";
					}
					if(leaderx!=targetx){
						flagx=false;
					}
				}
				if(flagx){
					clearInterval(objx.timerx);
					if(fnx){
						fnx();
					}
				}
			},15);
		}
		//兼容
		function getStylex(objx,attrx){
			if(window.getComputedStyle){
				return window.getComputedStyle(objx,null)[attrx];
			}else{
				return objx.currentStyle[attrx];
			}
		}
    
    
    function assignx() {
        for (var i = 0; i < lisx.length; i++) {
            animatex(lisx[i], configx[i], function () {
                flagx = true;
            });
        }
    }
    assignx();

    arrLeftx.onclick = function () {
        if (flagx) {
            flagx = false;
            configx.push(configx.shift());
            assignx();
        }
    };
    arrRightx.onclick = function () {
        if (flagx) {
            flagx = false;
            configx.unshift(configx.pop());
            assignx();
        }
    };

	//手风琴效果
	var box1=document.getElementById("box111");
	var ul=box1.children[0];
	var Lis=ul.children;
		
		//兼容
		function getStyles(objo,attra){
			if(window.getComputedStyle){
				return window.getComputedStyle(objo,null)[attra];
			}else{
				return objo.currentStyle[attra];
			}
		}
		
		function animatea(objo,jsonj){
			clearInterval(objo.timert);
			objo.timert=setInterval(function(){
				for(var keyk in jsonj){
					var leaderl=parseInt(getStyles(objo,keyk))||0;
					var targett=jsonj[keyk];
					var steps=(targett-leaderl)/10;
					steps=steps>0?Math.ceil(steps):Math.floor(steps);
					leaderl=leaderl+steps;
					objo.style[keyk]=leaderl+"px";
					if(leaderl===targett){
						clearInterval(objo.timert);
					}
				}
			},15);
		}
		function shoufengq(lis,boxb){
			for(var i=0;i<lis.length;i++){
				lis[i].onmouseover=function(){
					for(var j=0;j<lis.length;j++){
						animatea(lis[j],{"width":17});
					}
					animatea(this,{"width":320});
				};
			}
			boxb.onmouseout=function(){
				for(var i=0;i<lis.length;i++){
					animatea(lis[i],{"width":60});
				}
			};
		}
		shoufengq(Lis,box1)

    //轮播
    var timer = null;
    var box = document.querySelector(".all");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ulLis = ul.getElementsByTagName("li");
    var ol = screen.children[1];
    
    var arr = document.getElementById("arr");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    
    var imgWidth = screen.offsetWidth;
    
    
    function animate(obj,step,target){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var leader=obj.offsetLeft;
			step=Math.abs(step);
			step=leader<target?step:-step;
			//Math.abs(target-leader)  当前位置到目标的位置
			if(Math.abs(target-leader)>=Math.abs(step)){
				leader+=step;
				obj.style.left=leader+"px";
			}else{
				obj.style.left=target+"px";
				clearInterval(obj.timer);
			}
		},30);
	}
    //1、动态生成结构
    //1.1 根据ul中的li，动态生成ol中的li
    for (var i = 0; i < ulLis.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        ol.appendChild(li);
    }
    var olLis = ol.children;
    olLis[0].className = "current";
    //1.2 根据第一张图，动态克隆一张图，并追加到ul的最后
    var firstImg = ulLis[0].cloneNode(true);
    ul.appendChild(firstImg);
    var target = 0;
    //2、鼠标经过按钮
    //鼠标经过按钮，按钮排他，然后根据当前按钮的索引移动ul到指定位置
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].index = i;
        olLis[i].onmouseover = function () {
        	//干掉所有人
        	for (var j = 0; j < olLis.length; j++) {
            	olLis[j].className = "";
        	}
        	//留下我自己
        	this.className = "current";

        	//最后让ul移动到指定位置
        	target = -this.index * imgWidth;
        	animate(ul, 30, target);

        	//把记录当前亮起的按钮的索引的square变为当前按钮的索引
        	//把记录当前显示的图片的索引的pic变为当前按钮的索引
        	pic = square = this.index;
        };
    }
    //3、鼠标点击箭头
    //3.1鼠标经过box，显示arr
    box.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timer);
    };
    //3.2鼠标离开box，隐藏arr
    box.onmouseout = function () {
        arr.style.display = "none";
        timer = setInterval(playNext, 1000);
    };

    var pic = 0;//记录当前显示的图片的索引
    var square = 0;//记录当前亮起的按钮的索引

    //3.3点击右箭头，把ul移动到指定位置
    right.onclick = function () {
//        alert(ulLis.length)
        //如果到最后一张图片（假的第一张），就瞬间跳到第一张图片
        //然后做从第一张到第二张的动画
        if (pic === ulLis.length - 1) {//最后一张图片的索引
            ul.style.left = 0;//瞬间移动到开头
            pic = 0;//索引归0，后续的代码会让ul渐渐地从第一张图片移动到第二张图片
        }
        pic++;//计算出接下来应该显示的图片的索引
        //target和pic以及图片的宽度有关，而且是负数
        target = -pic * imgWidth;
        animate(ul, 15, target);

        //下面的按钮跟着动
        if (square < olLis.length - 1) {//还没到最后
            square++;//计算出下一个应该亮起的按钮的索引
        } else {
            square = 0;
        }
        //干掉所有人
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //留下对应的
        olLis[square].className = "current";
    };
    //3.4点击左箭头，把ul移动到指定位置
    left.onclick = function () {
        //如果到第一张图片，就瞬间跳到最后
        //然后做从最后一张（假的第一张）到倒数第二张的动画
        if (pic === 0) {//第一张图
            ul.style.left = -(ulLis.length - 1) * imgWidth + "px";//瞬间移动到最后
            pic = ulLis.length - 1;
        }
        pic--;//计算出接下来应该显示的图片的索引
        //target和pic以及图片的宽度有关，而且是正数
        target = -pic * imgWidth;
        animate(ul, 30, target);

        //下面的按钮跟着动
        if (square > 0) {//还没到最前
            square--;//计算出下一个应该亮起的按钮的索引
        } else {
            square = olLis.length - 1;
        }
        //干掉所有人
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //留下对应的
      	olLis[square].className = "current";
    };
    //添加自动滚动
    timer = setInterval(playNext, 1000);//每隔一秒钟播放下一张
    function playNext() {
        right.onclick();
    }
    
	//兼容
	function getStyle(obj,name){ 
		if(obj.currentStyle){   //currentStyle兼容IE9以下浏览器
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj,false)[name];  //currentStyle兼容C/FF
		}
	}
	
	var owuul=document.querySelector(".box ul");
	var owuulli=document.querySelectorAll(".box ul li");
	
	var ocosul=document.querySelector(".cos ul");
	var ocosulli=document.querySelectorAll(".cos ul li");
	
	function wufeng(u,l){
		var oLe=l.length;
		var num=parseInt(getStyle(l[0],"width"));
		var timer;
		show();
		function show(){
			timer=setInterval(function(){
				if(u.offsetLeft>= -oLe/2*num){
					u.style.left=u.offsetLeft-1+"px";
				}else{
					u.style.left=0+"px";
				}
			},12)
		}
		u.onmouseover=function(){
			clearInterval(timer);
		}
		u.onmouseout=function(){
			show();
		}
	}
	wufeng(owuul,owuulli)
//	wufeng(ocosul,ocosulli)
	
	var oghdiv=document.querySelectorAll(".gh div");
	var oimgdiv=document.querySelectorAll(".img>div");
	//点击替换
	function dj(d,e){
		for(var i=0;i<d.length;i++){
			d[i].index=i;
			d[i].onclick=function(){
				for(var j=0;j<e.length;j++){
					e[j].style.display="none";
					d[j].classList.remove('now');
				}
				e[this.index].style.display="block";
				d[this.index].classList.add('now');
			}
		}
	}
	dj(oghdiv,oimgdiv)
	
	//选项卡点击显示
	var ocontent_5nrh1=document.querySelectorAll(".content_5nr h1");
	var ocontent_5nrdiv=document.querySelectorAll(".content_5nr>div");
	
	var orenzuh2=document.querySelectorAll(".renzu h2");
	var orenzudiv=document.querySelectorAll(".renzu>div");
	//选项卡点击显示封装函数
	function dianji(di,ji){
		for(var i=0;i<di.length;i++){
			di[i].index=i;
			di[i].onclick=function(){
				var ojianxk=document.querySelector(".jianxk");
				var ojianxk1=document.querySelector(".jianxk1");
				var ojianxk2=document.querySelector(".jianxk2");
				ojianxk.style.display="block";
				ojianxk1.style.display="block";
				ojianxk2.style.display="block";
				for(var j=0;j<ji.length;j++){
					ji[j].style.display="none";
					di[j].classList.remove('now1');
				}
				ji[this.index].style.display="block";
				di[this.index].classList.add('now1');
			}
		}
	}
	dianji(ocontent_5nrh1,ocontent_5nrdiv)
	
	//选项卡鼠标移动显示
	
	var ocontent_1rtlli=document.querySelectorAll(".content_1rtl li");
	var ocontent_1rbdiv=document.querySelectorAll(".content_1rb>div");
	
	var ochengzhangli=document.querySelectorAll(".chengzhang li");
	var ocontent_middle2bul=document.querySelectorAll(".content_middle2b ul");
	
	var obanli=document.querySelectorAll(".ban li");
	var obanimg=document.querySelectorAll(".ban img");
	var ohzli=document.querySelectorAll(".hz li");
	var ohzimg=document.querySelectorAll(".hz img");
	
	var orenzuh2=document.querySelectorAll(".renzu h2");
	var orenzudiv=document.querySelectorAll(".renzu>div");
	
	var ocodeli=document.querySelectorAll(".code li");
	var ocodebotdiv=document.querySelectorAll(".codebot div");
	
	//选项卡鼠标移动显示封装函数
	function yidong(yi,don){
		for(var i=0;i<yi.length;i++){
			yi[i].index=i;
			yi[i].onmouseover=function(){
				for(var j=0;j<don.length;j++){
					don[j].style.display="none";
					yi[j].classList.remove('now');
				}
				don[this.index].style.display="block";
				yi[this.index].classList.add('now');
			}
		}
	}
	yidong(ocontent_1rtlli,ocontent_1rbdiv)
	yidong(ochengzhangli,ocontent_middle2bul)
	
	yidong(obanli,obanimg)
	yidong(ohzli,ohzimg)
	
	yidong(orenzuh2,orenzudiv)
	
	yidong(ocodeli,ocodebotdiv)
	//鼠标右击
	var oUl=document.getElementById("ul1");
	document.oncontextmenu=function(ev){
		var oEvent=ev||event;
		oUl.style.display="block";
		oUl.style.left=oEvent.clientX+"px";
		oUl.style.top=oEvent.clientY+"px";
		return false;
	};
	document.onclick=function(){
		oUl.style.display="none";
	}
	
	//获取返回顶部元素
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
