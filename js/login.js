window.onload=function(){
	//正则表达式
	var inp=document.querySelectorAll(".contentbot>input");
	var h1=document.querySelectorAll(".contentbot>h1");
	
	inp[0].addEventListener("blur",function(){
        if(this.value===""){
            return;
        }
        var reg=/[A-Za-z0-9_]([A-Za-z1-9_]{9})/;
        if(reg.test(inp[0].value)){
            h1[0].innerHTML="输入正确";
        }else{
            h1[0].innerHTML="对不起，输入格式不正确！";
        }
    });
    inp[1].addEventListener("blur",function(){
        if(this.value===""){
            return;
        }
        var reg=/[A-Za-z0-9_]{7}/;
        if(reg.test(inp[1].value)){
            h1[1].innerHTML="输入正确";
        }else{
            h1[1].innerHTML="对不起，输入格式不正确，请输入至少8位数密码！";
        }
    });
}
